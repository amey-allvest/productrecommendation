// --- Configuration and Constants ---
const API_BASE_URL = 'https://smart-recommendation-dev.allvestfinance.in/api/analysis/getCompanyAnalysisByIndustry';

const industries = [
  "Aluminium",
  "Information Technology Services",
  "Copper",
  "Broadcasting",
  "Semiconductors",
  "Financial - Capital Markets",
  "Media & Entertainment",
  "Consumer Electronics",
  "Software - Application",
  "Computer Hardware",
  "Financial - Data & Stock Exchanges",
  "Airlines, Airports & Air Services"
];

/**
 * Fetches industry analysis data from the live API using Axios.
 * @param {string} industry The industry selected by the user.
 * @returns {Promise<Object>} A promise that resolves with the analysis data.
 */
async function fetchIndustryData(industry) {
  const encodedIndustry = encodeURIComponent(industry);
  const fullUrl = `${API_BASE_URL}?industry=${encodedIndustry}`;
  console.log(`Fetching analysis from: ${fullUrl}`);

  try {
    const response = await axios.get(fullUrl);
    console.log("API Response Data:", response.data);

    // --- FIX APPLIED HERE ---
    // Check for a successful API response based on your custom 'code' field.
    if (response.data && response.data.code === 2000 && response.data.data) {
      // Return the nested 'data' object which contains the arrays we need.
      return response.data.data;
    } else {
      // If the API returns a 200 OK but has an error message inside.
      throw new Error(response.data.msg || "API returned an unexpected data structure.");
    }

  } catch (error) {
    console.error('API request failed:', error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status}. The server could not process the request for this industry.`);
    } else if (error.request) {
      throw new Error('Network Error: Could not connect to the server. Please check your connection.');
    } else {
      throw new Error(error.message); // Use the error message from the try block
    }
  }
}

// --- DOM Element References ---
const industrySelect = document.getElementById('industrySelect');
const analyzeBtn = document.getElementById('analyzeBtn');
const loadingDiv = document.getElementById('loading');
const analysisContentDiv = document.getElementById('analysisContent');
const industryNameSpan = document.getElementById('industryName');
const searchInput = document.getElementById('searchInput');
const recommendationFilter = document.getElementById('recommendationFilter');
const toggleDetailedBtn = document.getElementById('toggleDetailed');
const detailedSection = document.getElementById('detailedAnalysisSection');
const summaryTableBody = document.getElementById('summaryTableBody');
const tablePaginationContainer = document.getElementById('tablePaginationContainer');
const detailedCardsContainer = document.getElementById('detailedCardsContainer');
const detailedPaginationContainer = document.getElementById('detailedPaginationContainer');
const errorDiv = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

// --- State Variables ---
let currentAnalysisData = null;
let tableCurrentPage = 1;
const tableRowsPerPage = 10;
let detailedCurrentPage = 1;
const detailedCardsPerPage = 4;

// --- UI Functions (Rendering, Pagination, etc.) ---
function showError(message) { errorText.textContent = message; errorDiv.classList.remove('hidden'); }
function getPeRatioClass(peRatio){if(peRatio<0||!peRatio)return'text-red-500';if(peRatio<15)return'text-green-500';if(peRatio<30)return'text-yellow-500';return'text-red-500'}

function renderTablePage(data){
  // Ensure analysis_summary is an array before slicing
  const summaryData = Array.isArray(data.analysis_summary) ? data.analysis_summary : [];
  const start=(tableCurrentPage-1)*tableRowsPerPage;
  const end=start+tableRowsPerPage;
  const paginatedData=summaryData.slice(start,end);
  summaryTableBody.innerHTML='';
  if(paginatedData.length===0){
    summaryTableBody.innerHTML=`<tr><td colspan="5" class="text-center py-8 text-gray-400">No summary data found for this selection.</td></tr>`;
    renderTablePaginationControls(0);
    return;
  }
  paginatedData.forEach(item=>{
    const recommendationClass=(item.recommendation||'HOLD').toLowerCase();
    const peRatio=item.key_metrics?.pe_ratio??'N/A';
    const marketCap=item.key_metrics?.market_cap_inr??'N/A';
    const row=`<tr class="border-b border-gray-700 hover:bg-gray-700/50"><td class="py-3 px-4 font-medium text-white">${item.company_name}</td><td class="py-3 px-4 text-gray-400">${item.ticker}</td><td class="py-3 px-4 text-center ${getPeRatioClass(peRatio)}">${peRatio}</td><td class="py-3 px-4 text-center text-gray-300">${marketCap}</td><td class="py-3 px-4 text-center"><span class="px-3 py-1 text-sm font-bold rounded-full ${recommendationClass}">${item.recommendation}</span></td></tr>`;
    summaryTableBody.innerHTML+=row;
  });
  renderTablePaginationControls(summaryData.length);
}

function renderDetailedCards(data){
  // Ensure detailed_analysis is an array before slicing
  const detailedData = Array.isArray(data.detailed_analysis) ? data.detailed_analysis : [];
  const start=(detailedCurrentPage-1)*detailedCardsPerPage;
  const end=start+detailedCardsPerPage;
  const paginatedData=detailedData.slice(start,end);
  detailedCardsContainer.innerHTML='';
  if(paginatedData.length===0){
    detailedCardsContainer.innerHTML=`<div class="col-span-1 lg:col-span-2 text-center py-8 text-gray-400">No detailed analysis found for this selection.</div>`;
    renderDetailedPaginationControls(0);
    return;
  }
  paginatedData.forEach(stock=>{
    const recommendationClass=(stock.recommendation||'HOLD').toLowerCase();
    // --- FIX: COMPLETED THE DETAILED CARD TEMPLATE ---
    const card=`
      <div class="card p-6 flex flex-col h-full">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-2xl font-bold text-white">${stock.company_name || 'N/A'}</h3>
            <p class="text-gray-400">${stock.ticker || 'N/A'}</p>
          </div>
          <span class="px-4 py-1.5 text-sm font-bold rounded-full ${recommendationClass} flex-shrink-0">
            ${stock.recommendation || 'HOLD'}
          </span>
        </div>
        <div class="space-y-4">
          <div>
            <h4 class="text-lg font-semibold text-blue-400 mb-2">Analysis</h4>
            <p class="text-gray-300 text-sm">${stock.qualitative_analysis?.summary || 'No summary available.'}</p>
          </div>
          <div>
            <h4 class="text-lg font-semibold text-blue-400 mb-2">Reasoning</h4>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-300">
              ${(stock.qualitative_analysis?.reasoning_points || []).map(p => `<li>${p}</li>`).join('') || '<li>No reasoning points available.</li>'}
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold text-red-400 mb-2">Risk Factors</h4>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-300">
              ${(stock.qualitative_analysis?.risk_factors || []).map(r => `<li>${r}</li>`).join('') || '<li>No risk factors available.</li>'}
            </ul>
          </div>
        </div>
      </div>`;
    detailedCardsContainer.innerHTML+=card;
  });
  renderDetailedPaginationControls(detailedData.length);
}

function getFilteredData(){
  if(!currentAnalysisData) return { analysis_summary: [], detailed_analysis: [] };
  
  // Ensure the properties are arrays before trying to spread them.
  const summary = Array.isArray(currentAnalysisData.analysis_summary) ? currentAnalysisData.analysis_summary : [];
  const detailed = Array.isArray(currentAnalysisData.detailed_analysis) ? currentAnalysisData.detailed_analysis : [];
  
  const searchTerm = searchInput.value.toLowerCase();
  const filter = recommendationFilter.value;
  
  let filteredSummary = [...summary];
  let filteredDetailed = [...detailed];
  
  if(searchTerm){
    filteredSummary = filteredSummary.filter(item => (item.company_name || '').toLowerCase().includes(searchTerm) || (item.ticker || '').toLowerCase().includes(searchTerm));
    filteredDetailed = filteredDetailed.filter(item => (item.company_name || '').toLowerCase().includes(searchTerm) || (item.ticker || '').toLowerCase().includes(searchTerm));
  }
  
  if(filter !== 'all'){
    filteredSummary = filteredSummary.filter(item => item.recommendation === filter);
    filteredDetailed = filteredDetailed.filter(item => item.recommendation === filter);
  }
  
  return { ...currentAnalysisData, analysis_summary: filteredSummary, detailed_analysis: filteredDetailed };
}

// (The rest of the file remains the same)
function renderTablePaginationControls(totalRows){tablePaginationContainer.innerHTML='';const totalPages=Math.ceil(totalRows/tableRowsPerPage);if(totalPages<=1)return;const pagination=document.createElement('div');pagination.className='pagination flex justify-end mt-4 space-x-2';let paginationHTML=`<button onclick="changeTablePage(${tableCurrentPage-1})" ${tableCurrentPage===1?'disabled':''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>`;for(let i=1;i<=totalPages;i++){paginationHTML+=`<button onclick="changeTablePage(${i})" class="${tableCurrentPage===i?'bg-blue-600':'bg-gray-600'} hover:bg-gray-700 text-white px-3 py-1 rounded">${i}</button>`}paginationHTML+=`<button onclick="changeTablePage(${tableCurrentPage+1})" ${tableCurrentPage===totalPages?'disabled':''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed">Next</button>`;pagination.innerHTML=paginationHTML;tablePaginationContainer.appendChild(pagination)}
function changeTablePage(page){const filteredData=getFilteredData();const totalPages=Math.ceil(filteredData.analysis_summary.length/tableRowsPerPage);if(page<1||page>totalPages)return;tableCurrentPage=page;renderTablePage(filteredData)}
function renderDetailedPaginationControls(totalCards){detailedPaginationContainer.innerHTML='';const totalPages=Math.ceil(totalCards/detailedCardsPerPage);if(totalPages<=1)return;const pagination=document.createElement('div');pagination.className='pagination flex justify-end mt-4 space-x-2';let paginationHTML=`<button onclick="changeDetailedPage(${detailedCurrentPage-1})" ${detailedCurrentPage===1?'disabled':''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>`;for(let i=1;i<=totalPages;i++){paginationHTML+=`<button onclick="changeDetailedPage(${i})" class="${detailedCurrentPage===i?'bg-blue-600':'bg-gray-600'} hover:bg-gray-700 text-white px-3 py-1 rounded">${i}</button>`}paginationHTML+=`<button onclick="changeDetailedPage(${detailedCurrentPage+1})" ${detailedCurrentPage===totalPages?'disabled':''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed">Next</button>`;pagination.innerHTML=paginationHTML;detailedPaginationContainer.appendChild(pagination)}
function changeDetailedPage(page){const filteredData=getFilteredData();const totalPages=Math.ceil(filteredData.detailed_analysis.length/detailedCardsPerPage);if(page<1||page>totalPages)return;detailedCurrentPage=page;renderDetailedCards(filteredData)}
function populateIndustries(){industries.forEach(industry=>{const option=document.createElement('option');option.value=industry;option.textContent=industry;industrySelect.appendChild(option)})}
function renderAllData(){const data=getFilteredData();if(!data)return;industryNameSpan.textContent=currentAnalysisData.industry_analyzed||industrySelect.value;renderTablePage(data);renderDetailedCards(data)}
analyzeBtn.addEventListener('click', async () => {errorDiv.classList.add('hidden');loadingDiv.classList.remove('hidden');analysisContentDiv.classList.add('hidden');analyzeBtn.disabled = true;try {const selectedIndustry = industrySelect.value;currentAnalysisData = await fetchIndustryData(selectedIndustry);tableCurrentPage = 1;detailedCurrentPage = 1;searchInput.value = '';recommendationFilter.value = 'all';renderAllData();analysisContentDiv.classList.remove('hidden');detailedSection.classList.add('hidden');toggleDetailedBtn.textContent = 'Show Detailed Analysis';} catch (error) {console.error("Handler caught an error:", error);showError(error.message);} finally {loadingDiv.classList.add('hidden');analyzeBtn.disabled = false;}});
industrySelect.addEventListener('change', () => { analyzeBtn.disabled = !industrySelect.value; });
toggleDetailedBtn.addEventListener('click', () => { detailedSection.classList.toggle('hidden'); toggleDetailedBtn.textContent = detailedSection.classList.contains('hidden') ? 'Show Detailed Analysis' : 'Hide Detailed Analysis'; });
let searchTimeout;
searchInput.addEventListener('input', () => { clearTimeout(searchTimeout); searchTimeout = setTimeout(() => { tableCurrentPage = 1; detailedCurrentPage = 1; renderAllData(); }, 300); });
recommendationFilter.addEventListener('change', () => { tableCurrentPage = 1; detailedCurrentPage = 1; renderAllData(); });
window.addEventListener('load', populateIndustries);
