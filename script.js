// --- Configuration and Constants ---
const API_BASE_URL = 'https://smart-recommendation-dev.allvestfinance.in/api/analysis/getCompanyAnalysisByIndustry';

// IMPORTANT: These values should match the exact industry names your API expects.
const industries = [
  "Aluminium",
  "Information Technology Services",
  "Copper",
  "Broadcasting",
  "Semiconductors",
  "Financial - Capital Markets",
  // "Real Estate",
  // "Consumer Goods",
  // "Telecommunications",
  // "Healthcare"
];

/**
 * Fetches industry analysis data from the live API using Axios.
 * @param {string} industry The industry selected by the user.
 * @returns {Promise<Object>} A promise that resolves with the analysis data.
 */
async function fetchIndustryData(industry) {
  // URL-encode the industry name to handle spaces and special characters.
  const encodedIndustry = encodeURIComponent(industry);
  const fullUrl = `${API_BASE_URL}?industry=${encodedIndustry}`;

  console.log(`Fetching analysis from: ${fullUrl}`);

  try {
    const response = await axios.get(fullUrl);

    // CRITICAL: Log the actual response data to the console for debugging.
    // This helps verify that the data structure matches what the app expects.
    console.log("API Response Data:", response.data);

    // IMPORTANT ASSUMPTION: The code assumes your API returns an object
    // directly with `analysis_summary` and `detailed_analysis` keys.
    // If the data is nested, like `response.data.data`, you must change this line to:
    // return response.data.data;
    return response.data;

  } catch (error) {
    console.error('API request failed:', error);
    // Provide more specific error messages to the user.
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx (e.g., 404, 500).
      throw new Error(`Error: ${error.response.status} ${error.response.statusText}. The server could not process the request for this industry.`);
    } else if (error.request) {
      // The request was made but no response was received (e.g., network error).
      throw new Error('Network Error: Could not connect to the server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error.
      throw new Error(`An unexpected error occurred: ${error.message}`);
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
// (These functions are unchanged and work with the fetched data)
function showError(message) { errorText.textContent = message; errorDiv.classList.remove('hidden'); }
function getPeRatioClass(peRatio){if(peRatio<0||!peRatio)return'text-red-500';if(peRatio<15)return'text-green-500';if(peRatio<30)return'text-yellow-500';return'text-red-500'}
function renderTablePage(data){const start=(tableCurrentPage-1)*tableRowsPerPage;const end=start+tableRowsPerPage;const paginatedData=data.analysis_summary.slice(start,end);summaryTableBody.innerHTML='';if(paginatedData.length===0){summaryTableBody.innerHTML=`<tr><td colspan="5" class="text-center py-8 text-gray-400">No summary data found for this selection.</td></tr>`;renderTablePaginationControls(0);return}paginatedData.forEach(item=>{const recommendationClass=(item.recommendation||'').toLowerCase();const peRatio=item.key_metrics?.pe_ratio??'N/A';const marketCap=item.key_metrics?.market_cap_inr??'N/A';const row=`<tr class="border-b border-gray-700 hover:bg-gray-700/50"><td class="py-3 px-4 font-medium text-white">${item.company_name}</td><td class="py-3 px-4 text-gray-400">${item.ticker}</td><td class="py-3 px-4 text-center ${getPeRatioClass(peRatio)}">${peRatio}</td><td class="py-3 px-4 text-center text-gray-300">${marketCap}</td><td class="py-3 px-4 text-center"><span class="px-3 py-1 text-sm font-bold rounded-full ${recommendationClass}">${item.recommendation}</span></td></tr>`;summaryTableBody.innerHTML+=row});renderTablePaginationControls(data.analysis_summary.length)}
function renderTablePaginationControls(totalRows){tablePaginationContainer.innerHTML='';const totalPages=Math.ceil(totalRows/tableRowsPerPage);if(totalPages<=1)return;const pagination=document.createElement('div');pagination.className='pagination flex justify-end mt-4 space-x-2';let paginationHTML=`<button onclick="changeTablePage(${tableCurrentPage-1})" ${tableCurrentPage===1?'disabled':''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>`;for(let i=1;i<=totalPages;i++){paginationHTML+=`<button onclick="changeTablePage(${i})" class="${tableCurrentPage===i?'bg-blue-600':'bg-gray-600'} hover:bg-gray-700 text-white px-3 py-1 rounded">${i}</button>`}paginationHTML+=`<button onclick="changeTablePage(${tableCurrentPage+1})" ${tableCurrentPage===totalPages?'disabled':''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed">Next</button>`;pagination.innerHTML=paginationHTML;tablePaginationContainer.appendChild(pagination)}
function changeTablePage(page){const filteredData=getFilteredData();const totalPages=Math.ceil(filteredData.analysis_summary.length/tableRowsPerPage);if(page<1||page>totalPages)return;tableCurrentPage=page;renderTablePage(filteredData)}
function renderDetailedCards(data){const start=(detailedCurrentPage-1)*detailedCardsPerPage;const end=start+detailedCardsPerPage;const paginatedData=data.detailed_analysis.slice(start,end);detailedCardsContainer.innerHTML='';if(paginatedData.length===0){detailedCardsContainer.innerHTML=`<div class="col-span-1 lg:col-span-2 text-center py-8 text-gray-400">No detailed analysis found for this selection.</div>`;renderDetailedPaginationControls(0);return}paginatedData.forEach(stock=>{const recommendationClass=(stock.recommendation||'').toLowerCase();const card=`<div class="card p-6 flex flex-col h-full">...</div>`;detailedCardsContainer.innerHTML+=card});renderDetailedPaginationControls(data.detailed_analysis.length)}
function renderDetailedPaginationControls(totalCards){detailedPaginationContainer.innerHTML='';const totalPages=Math.ceil(totalCards/detailedCardsPerPage);if(totalPages<=1)return;const pagination=document.createElement('div');pagination.className='pagination flex justify-end mt-4 space-x-2';let paginationHTML=`<button onclick="changeDetailedPage(${detailedCurrentPage-1})" ${detailedCurrentPage===1?'disabled':''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>`;for(let i=1;i<=totalPages;i++){paginationHTML+=`<button onclick="changeDetailedPage(${i})" class="${detailedCurrentPage===i?'bg-blue-600':'bg-gray-600'} hover:bg-gray-700 text-white px-3 py-1 rounded">${i}</button>`}paginationHTML+=`<button onclick="changeDetailedPage(${detailedCurrentPage+1})" ${detailedCurrentPage===totalPages?'disabled':''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed">Next</button>`;pagination.innerHTML=paginationHTML;detailedPaginationContainer.appendChild(pagination)}
function changeDetailedPage(page){const filteredData=getFilteredData();const totalPages=Math.ceil(filteredData.detailed_analysis.length/detailedCardsPerPage);if(page<1||page>totalPages)return;detailedCurrentPage=page;renderDetailedCards(filteredData)}
function populateIndustries(){industries.forEach(industry=>{const option=document.createElement('option');option.value=industry;option.textContent=industry;industrySelect.appendChild(option)})}
function getFilteredData(){if(!currentAnalysisData)return{analysis_summary:[],detailed_analysis:[]};const searchTerm=searchInput.value.toLowerCase();const filter=recommendationFilter.value;let filteredSummary=[...currentAnalysisData.analysis_summary];let filteredDetailed=[...currentAnalysisData.detailed_analysis];if(searchTerm){filteredSummary=filteredSummary.filter(item=>item.company_name.toLowerCase().includes(searchTerm)||item.ticker.toLowerCase().includes(searchTerm));filteredDetailed=filteredDetailed.filter(item=>item.company_name.toLowerCase().includes(searchTerm)||item.ticker.toLowerCase().includes(searchTerm))}if(filter!=='all'){filteredSummary=filteredSummary.filter(item=>item.recommendation===filter);filteredDetailed=filteredDetailed.filter(item=>item.recommendation===filter)}return{...currentAnalysisData,analysis_summary:filteredSummary,detailed_analysis:filteredDetailed}}
function renderAllData(){const data=getFilteredData();if(!data)return;industryNameSpan.textContent=currentAnalysisData.industry_analyzed||industrySelect.value;renderTablePage(data);renderDetailedCards(data)}

// --- Event Listeners ---
analyzeBtn.addEventListener('click', async () => {
  errorDiv.classList.add('hidden');
  loadingDiv.classList.remove('hidden');
  analysisContentDiv.classList.add('hidden');
  analyzeBtn.disabled = true;
  try {
    const selectedIndustry = industrySelect.value;
    currentAnalysisData = await fetchIndustryData(selectedIndustry);
    tableCurrentPage = 1;
    detailedCurrentPage = 1;
    searchInput.value = '';
    recommendationFilter.value = 'all';
    renderAllData();
    analysisContentDiv.classList.remove('hidden');
    detailedSection.classList.add('hidden');
    toggleDetailedBtn.textContent = 'Show Detailed Analysis';
  } catch (error) {
    console.error("Handler caught an error:", error);
    showError(error.message);
  } finally {
    loadingDiv.classList.add('hidden');
    analyzeBtn.disabled = false;
  }
});

industrySelect.addEventListener('change', () => { analyzeBtn.disabled = !industrySelect.value; });
toggleDetailedBtn.addEventListener('click', () => { detailedSection.classList.toggle('hidden'); toggleDetailedBtn.textContent = detailedSection.classList.contains('hidden') ? 'Show Detailed Analysis' : 'Hide Detailed Analysis'; });
let searchTimeout;
searchInput.addEventListener('input', () => { clearTimeout(searchTimeout); searchTimeout = setTimeout(() => { tableCurrentPage = 1; detailedCurrentPage = 1; renderAllData(); }, 300); });
recommendationFilter.addEventListener('change', () => { tableCurrentPage = 1; detailedCurrentPage = 1; renderAllData(); });
window.addEventListener('load', populateIndustries);
