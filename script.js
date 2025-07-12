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

// --- MOCK API RESPONSE WITH EXPANDED DATA ---
const mockApiResponse = {
  request_id: "c7a8b9d0-e1f2-3456-7890-12345abcdef6",
  timestamp: "2025-07-12T11:55:00Z",
  industry_analyzed: "Indian Aluminium Sector",
  analysis_summary: [
    { company_name: "Hindalco Industries Limited", ticker: "HINDALCO.NS", recommendation: "BUY", key_metrics: { pe_ratio: 9.34, market_cap_inr: "1.51T" } },
    { company_name: "National Aluminium Company", ticker: "NATIONALUM.NS", recommendation: "BUY", key_metrics: { pe_ratio: 6.52, market_cap_inr: "342B" } },
    { company_name: "MMP Industries Limited", ticker: "MMP.NS", recommendation: "HOLD", key_metrics: { pe_ratio: 19.17, market_cap_inr: "7.27B" } },
    { company_name: "Maan Aluminium Limited", ticker: "MAANALU.NS", recommendation: "SELL", key_metrics: { pe_ratio: 41.68, market_cap_inr: "6.47B" } },
    { company_name: "Arfin India Limited", ticker: "ARFIN.BO", recommendation: "SELL", key_metrics: { pe_ratio: 48.88, market_cap_inr: "4.28B" } },
    { company_name: "Alufluoride Limited", ticker: "ALUFLUOR.BO", recommendation: "SELL", key_metrics: { pe_ratio: 18.22, market_cap_inr: "3.21B" } },
    { company_name: "Century Extrusions Limited", ticker: "CENTEXT.NS", recommendation: "SELL", key_metrics: { pe_ratio: 21.26, market_cap_inr: "1.76B" } },
    { company_name: "Goyal Aluminiums Limited", ticker: "GOYALALUM.BO", recommendation: "SELL", key_metrics: { pe_ratio: 55.28, market_cap_inr: "1.16B" } },
    { company_name: "Sudal Industries Limited", ticker: "SUDAI.BO", recommendation: "SELL", key_metrics: { pe_ratio: 11.93, market_cap_inr: "60.01Cr" } },
    { company_name: "Hind Aluminium Industries Limited", ticker: "HINDALUMI.BO", recommendation: "SELL", key_metrics: { pe_ratio: 5.75, market_cap_inr: "42.97Cr" } },
    { company_name: "Nirav Commercials Limited", ticker: "NIRAVCOM.BO", recommendation: "SELL", key_metrics: { pe_ratio: 681.8, market_cap_inr: "29.56Cr" } },
    { company_name: "Bothra Metals and Alloys Limited", ticker: "BMAL.BO", recommendation: "SELL", key_metrics: { pe_ratio: 47.73, market_cap_inr: "22.22Cr" } },
    { company_name: "Maitri Enterprises Limited", ticker: "MAITRI.BO", recommendation: "SELL", key_metrics: { pe_ratio: -41.74, market_cap_inr: "14.83Cr" } },
    { company_name: "Sturdy Industries Limited", ticker: "STURDY.BO", recommendation: "SELL", key_metrics: { pe_ratio: -2.71, market_cap_inr: "4.39Cr" } },
    { company_name: "Bharat Aluminium Company", ticker: "BALCO.NS", recommendation: "BUY", key_metrics: { pe_ratio: 8.45, market_cap_inr: "280B" } },
    { company_name: "Vedanta Aluminium Limited", ticker: "VEDALUM.NS", recommendation: "BUY", key_metrics: { pe_ratio: 10.12, market_cap_inr: "1.2T" } },
    { company_name: "Alicon Castalloy Limited", ticker: "ALICON.NS", recommendation: "HOLD", key_metrics: { pe_ratio: 15.67, market_cap_inr: "12.5B" } },
    { company_name: "Parc Aluminium Limited", ticker: "PARCALUM.BO", recommendation: "SELL", key_metrics: { pe_ratio: 32.45, market_cap_inr: "5.89B" } },
    { company_name: "Synthiko Foils Limited", ticker: "SYNTHIKO.BO", recommendation: "SELL", key_metrics: { pe_ratio: 60.23, market_cap_inr: "1.45B" } },
    { company_name: "P G Foils Limited", ticker: "PGFOILS.BO", recommendation: "SELL", key_metrics: { pe_ratio: 25.78, market_cap_inr: "2.34B" } },
    { company_name: "Sacheta Metals Limited", ticker: "SACHETA.BO", recommendation: "SELL", key_metrics: { pe_ratio: 38.12, market_cap_inr: "1.89B" } },
    { company_name: "Manaksia Coated Metals", ticker: "MANAKCOAT.NS", recommendation: "HOLD", key_metrics: { pe_ratio: 29.56, market_cap_inr: "3.45B" } },
    { company_name: "Gujarat Foils Limited", ticker: "GUJFOIL.BO", recommendation: "SELL", key_metrics: { pe_ratio: -5.67, market_cap_inr: "1.12B" } },
    { company_name: "Baheti Recycling Industries", ticker: "BAHETI.BO", recommendation: "HOLD", key_metrics: { pe_ratio: 17.89, market_cap_inr: "2.78B" } },
    { company_name: "NALCO Extrusions Limited", ticker: "NALCOEXT.BO", recommendation: "SELL", key_metrics: { pe_ratio: 45.32, market_cap_inr: "1.67B" } },
  ],
  detailed_analysis: [
    {
      company_name: "Hindalco Industries Limited", ticker: "HINDALCO.NS", recommendation: "BUY",
      qualitative_analysis: { summary: "Appears undervalued with strong financial performance. Record profits and robust cash flows are reinvested for growth.", reasoning_points: ["Low P/E of 9.34 and PEG of ~0.16 signal undervaluation.", "Strong operational efficiency with growing cash flow.", "Manageable debt-to-equity ratio of 0.53.", "Aggressive capex indicates long-term growth confidence."], risk_factors: ["Sensitive to global aluminum price cycles.", "Global slowdown could curb demand.", "Monitor debt for capex returns."] }
    },
    {
      company_name: "National Aluminium Company", ticker: "NATIONALUM.NS", recommendation: "BUY",
      qualitative_analysis: { summary: "Deep value investment with a net-cash balance sheet and strong earnings growth, offering a high margin of safety.", reasoning_points: ["P/E of 6.52 and PEG of ~0.04 indicate deep undervaluation.", "Debt-free with large cash reserves.", "High free cash flow shows operational efficiency.", "25% price correction offers an attractive entry."], risk_factors: ["High dependency on aluminum price cycles.", "Exposed to global macro volatility."] }
    },
    {
      company_name: "MMP Industries Limited", ticker: "MMP.NS", recommendation: "HOLD",
      qualitative_analysis: { summary: "Strong revenue growth is offset by poor earnings quality and negative free cash flow, warranting caution.", reasoning_points: ["Strong revenue and EPS growth support valuation.", "Negative free cash flow of -₹495M is a red flag.", "Debt increased 400% in four years.", "Await cash flow improvement before investing."], risk_factors: ["Unsustainable cash burn from high capex.", "Rising receivables pose write-down risk.", "High volatility in stock price."] }
    },
    {
      company_name: "Maan Aluminium Limited", ticker: "MAANALU.NS", recommendation: "SELL",
      qualitative_analysis: { summary: "Highly volatile micro-cap with collapsing profitability, negative cash flow, and soaring debt, creating high risk.", reasoning_points: ["P/E of ~41.7 unjustifiable as EPS cratered.", "Net income down 69% from peak.", "Negative free cash flow of -₹564M.", "Debt tripled in a year, elevating risk."], risk_factors: ["Cyclical industry sensitivity with high debt.", "Micro-cap volatility and liquidity risk.", "Debt-funded expansion may fail."] }
    },
    {
      company_name: "Arfin India Limited", ticker: "ARFIN.BO", recommendation: "SELL",
      qualitative_analysis: { summary: "Significant overvaluation with inconsistent earnings, high leverage, and negative cash flow, indicating financial distress.", reasoning_points: ["P/E of 48.88 unsupported by volatile earnings.", "Negative operating cash flow of -₹212M.", "Negative free cash flow of -₹271.4M.", "High debt of ₹1.17B."], risk_factors: ["Overvalued relative to cash generation.", "High inventory and receivables risks.", "Micro-cap liquidity risk."] }
    },
    {
      company_name: "Alufluoride Limited", ticker: "ALUFLUOR.BO", recommendation: "SELL",
      qualitative_analysis: { summary: "Sharp growth deceleration with negative cash flow and overvalued PEG ratio, making the stock unattractive.", reasoning_points: ["Net income growth dropped from 38% to 2.4%.", "PEG ratio of ~7.6 overvalued.", "Negative free cash flow of -₹17.8M.", "Operating cash flow dropped 64%."], risk_factors: ["Low trading volume causes high volatility.", "Exposed to commodity price fluctuations.", "Risk of further price decline."] }
    },
    {
      company_name: "Century Extrusions Limited", ticker: "CENTEXT.NS", recommendation: "SELL",
      qualitative_analysis: { summary: "Micro-cap with speculative price surge, stagnant revenue, and thin margins, posing significant risk.", reasoning_points: ["Extreme volatility on high volume.", "Stagnant revenue growth of 0.8%.", "P/E of 21 too high for flat growth.", "Weak profitability offers little cushion."], risk_factors: ["High volatility and speculative trading.", "Margins exposed to aluminum prices.", "Micro-cap liquidity risk."] }
    },
    {
      company_name: "Goyal Aluminiums Limited", ticker: "GOYALALUM.BO", recommendation: "SELL",
      qualitative_analysis: { summary: "Overvalued micro-cap with decelerating growth, volatile cash flow, and speculative price history.", reasoning_points: ["P/E of 55.28 unsupported by performance.", "Net income growth fell from 112% to 18%.", "Weak cash flow conversion.", "Speculative price rally and crash."], risk_factors: ["High volatility and liquidity risk.", "Thin margins vulnerable to costs.", "Risk of further price declines."] }
    },
    {
      company_name: "Sudal Industries Limited", ticker: "SUDAI.BO", recommendation: "SELL",
      qualitative_analysis: { summary: "Speculative bubble with misleading P/E based on non-recurring income, masking poor operational performance.", reasoning_points: ["15x price surge not supported by fundamentals.", "P/E of 11.9 based on one-time gain.", "Forward P/E of ~12.8 high for loss history.", "No operational turnaround."], risk_factors: ["Speculative momentum detached from value.", "Cyclical industry exposure.", "High illiquidity risk."] }
    },
    {
      company_name: "Hind Aluminium Industries Limited", ticker: "HINDALUMI.BO", recommendation: "SELL",
      qualitative_analysis: { summary: "Value trap with misleading low P/E, driven by non-operational income while core business collapses.", reasoning_points: ["Revenue dropped from ₹95.7 Cr to ₹1.3 Cr.", "Profits from 'other income', not operations.", "Negative cash flow for two years.", "Low trading volumes."], risk_factors: ["Low P/E masks poor earnings quality.", "Extreme illiquidity.", "Failing core business risks."] }
    },
    {
      company_name: "Bharat Aluminium Company", ticker: "BALCO.NS", recommendation: "BUY",
      qualitative_analysis: { summary: "Strong operational efficiency and attractive valuation make BALCO a compelling buy. Integration benefits post-privatization are evident.", reasoning_points: ["Low P/E of 8.45 compared to industry leaders.", "Consistent profitability and margin expansion.", "Strong cash flow generation supports dividends and capex.", "Strategic importance in India's industrial sector."], risk_factors: ["Dependency on government policies and regulations.", "Volatility in bauxite (raw material) prices.", "Competition from other major players like Hindalco."] }
    },
    {
      company_name: "Vedanta Aluminium Limited", ticker: "VEDALUM.NS", recommendation: "BUY",
      qualitative_analysis: { summary: "A market leader with robust fundamentals and significant growth prospects. Scale and integration provide a competitive edge.", reasoning_points: ["Reasonable P/E of 10.12 for a market leader.", "Large-scale operations lead to cost advantages.", "Vertically integrated business model from bauxite to finished products.", "Strong parent company backing (Vedanta Resources)."], risk_factors: ["Complex corporate structure can be opaque.", "High debt levels across the parent group are a concern.", "Environmental, Social, and Governance (ESG) related controversies."] }
    },
    {
      company_name: "Alicon Castalloy Limited", ticker: "ALICON.NS", recommendation: "HOLD",
      qualitative_analysis: { summary: "Fairly valued with stable growth tied to the automotive sector. The company shows consistent performance but lacks strong upside catalysts.", reasoning_points: ["P/E of 15.67 is reasonable for its growth profile.", "Strong relationships with major auto OEMs.", "Focus on lightweighting solutions provides a long-term tailwind.", "Stable, albeit not spectacular, financial performance."], risk_factors: ["High dependency on the cyclical automotive industry.", "Rising input costs (aluminum) can squeeze margins.", "Intense competition in the auto ancillary space."] }
    },
    {
      company_name: "Parc Aluminium Limited", ticker: "PARCALUM.BO", recommendation: "SELL",
      qualitative_analysis: { summary: "Overvalued with weak cash flow conversion. The stock price appears to have run ahead of its fundamentals.", reasoning_points: ["High P/E of 32.45 is not justified by growth.", "Inconsistent and often weak cash flow from operations.", "Small scale limits competitive advantages.", "High receivables raise concerns about earnings quality."], risk_factors: ["Micro-cap volatility and liquidity risk.", "Poor cash flow management.", "Vulnerable to economic downturns."] }
    },
    {
      company_name: "Manaksia Coated Metals", ticker: "MANAKCOAT.NS", recommendation: "HOLD",
      qualitative_analysis: { summary: "Valuation appears stretched given the high debt levels and competitive pressures. The company has a niche, but risks are elevated.", reasoning_points: ["P/E of 29.56 is high.", "Diversified product portfolio in coated metals.", "Stable revenue stream from various end-user industries.", "High debt-to-equity ratio is a significant concern."], risk_factors: ["High financial leverage increases financial risk.", "Competition from larger, more integrated players.", "Working capital intensity is high."] }
    },
    {
      company_name: "Baheti Recycling Industries", ticker: "BAHETI.BO", recommendation: "HOLD",
      qualitative_analysis: { summary: "A niche player in the recycling space with moderate growth prospects. Valuation is fair, but the business is subject to high volatility.", reasoning_points: ["Reasonable P/E of 17.89.", "Growing importance of recycling offers long-term potential.", "Business model is environmentally friendly.", "Financials show moderate but volatile growth."], risk_factors: ["High volatility in scrap metal prices.", "Operational challenges in the unorganized recycling sector.", "Micro-cap stock with associated liquidity risks."] }
    },
    {
      company_name: "Gujarat Foils Limited", ticker: "GUJFOIL.BO", recommendation: "SELL",
      qualitative_analysis: { summary: "An unprofitable company with declining revenue and high financial risk. There are no signs of a turnaround.", reasoning_points: ["Negative P/E reflects unprofitability.", "Consistently reporting losses.", "Revenue has been on a declining trend for several years.", "Eroding book value and weak balance sheet."], risk_factors: ["High risk of insolvency.", "Complete lack of profitability.", "Illiquid stock with potential for further capital erosion."] }
    }
  ]
};


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

// Summary Table Elements
const summaryTableBody = document.getElementById('summaryTableBody');
const tablePaginationContainer = document.getElementById('tablePaginationContainer');

// Detailed Cards Elements
const detailedCardsContainer = document.getElementById('detailedCardsContainer');
const detailedPaginationContainer = document.getElementById('detailedPaginationContainer');


// --- State Variables ---
let tableCurrentPage = 1;
const tableRowsPerPage = 10;
let detailedCurrentPage = 1;
const detailedCardsPerPage = 4;


// --- Functions ---

function populateIndustries() {
  industries.forEach(industry => {
    const option = document.createElement('option');
    option.value = industry;
    option.textContent = industry;
    industrySelect.appendChild(option);
  });
}

function getPeRatioClass(peRatio) {
  if (peRatio < 0) return 'text-red-500';
  if (peRatio < 15) return 'text-green-500';
  if (peRatio < 30) return 'text-yellow-500';
  return 'text-red-500';
}

function renderTablePage(data) {
  const start = (tableCurrentPage - 1) * tableRowsPerPage;
  const end = start + tableRowsPerPage;
  const paginatedData = data.analysis_summary.slice(start, end);
  
  summaryTableBody.innerHTML = '';
  paginatedData.forEach(item => {
    const recommendationClass = item.recommendation.toLowerCase();
    const row = `
      <tr class="border-b border-gray-700 hover:bg-gray-700/50">
        <td class="py-3 px-4 font-medium text-white">${item.company_name}</td>
        <td class="py-3 px-4 text-gray-400">${item.ticker}</td>
        <td class="py-3 px-4 text-center ${getPeRatioClass(item.key_metrics.pe_ratio)}">${item.key_metrics.pe_ratio}</td>
        <td class="py-3 px-4 text-center text-gray-300">${item.key_metrics.market_cap_inr}</td>
        <td class="py-3 px-4 text-center">
          <span class="px-3 py-1 text-sm font-bold rounded-full ${recommendationClass}">${item.recommendation}</span>
        </td>
      </tr>
    `;
    summaryTableBody.innerHTML += row;
  });
  renderTablePaginationControls(data.analysis_summary.length);
}

function renderTablePaginationControls(totalRows) {
  tablePaginationContainer.innerHTML = '';
  const totalPages = Math.ceil(totalRows / tableRowsPerPage);
  if (totalPages <= 1) return;

  const pagination = document.createElement('div');
  pagination.className = 'pagination flex justify-end mt-4 space-x-2'; // Aligned to the right

  let paginationHTML = `<button onclick="changeTablePage(${tableCurrentPage - 1})" ${tableCurrentPage === 1 ? 'disabled' : ''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>`;
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button onclick="changeTablePage(${i})" class="${tableCurrentPage === i ? 'bg-blue-600' : 'bg-gray-600'} hover:bg-gray-700 text-white px-3 py-1 rounded">${i}</button>`;
  }
  paginationHTML += `<button onclick="changeTablePage(${tableCurrentPage + 1})" ${tableCurrentPage === totalPages ? 'disabled' : ''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed">Next</button>`;
  
  pagination.innerHTML = paginationHTML;
  tablePaginationContainer.appendChild(pagination);
}

function changeTablePage(page) {
  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.analysis_summary.length / tableRowsPerPage);
  if (page < 1 || page > totalPages) return;
  tableCurrentPage = page;
  renderTablePage(filteredData);
}

function renderDetailedCards(data) {
  const start = (detailedCurrentPage - 1) * detailedCardsPerPage;
  const end = start + detailedCardsPerPage;
  const paginatedData = data.detailed_analysis.slice(start, end);

  detailedCardsContainer.innerHTML = '';
  paginatedData.forEach(stock => {
    const recommendationClass = stock.recommendation.toLowerCase();
    const card = `
      <div class="card p-6 flex flex-col h-full">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-2xl font-bold text-white">${stock.company_name}</h3>
            <p class="text-gray-400">${stock.ticker}</p>
          </div>
          <span class="px-4 py-1.5 text-sm font-bold rounded-full ${recommendationClass} flex-shrink-0">${stock.recommendation}</span>
        </div>
        <div class="space-y-4">
          <div>
            <h4 class="text-lg font-semibold text-blue-400 mb-2">Analysis</h4>
            <p class="text-gray-300 text-sm">${stock.qualitative_analysis.summary}</p>
          </div>
          <div>
            <h4 class="text-lg font-semibold text-blue-400 mb-2">Reasoning</h4>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-300">${stock.qualitative_analysis.reasoning_points.map(p => `<li>${p}</li>`).join('')}</ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold text-red-400 mb-2">Risk Factors</h4>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-300">${stock.qualitative_analysis.risk_factors.map(r => `<li>${r}</li>`).join('')}</ul>
          </div>
        </div>
      </div>`;
    detailedCardsContainer.innerHTML += card;
  });
  renderDetailedPaginationControls(data.detailed_analysis.length);
}

function renderDetailedPaginationControls(totalCards) {
  detailedPaginationContainer.innerHTML = '';
  const totalPages = Math.ceil(totalCards / detailedCardsPerPage);
  if (totalPages <= 1) return;

  const pagination = document.createElement('div');
  pagination.className = 'pagination flex justify-end mt-4 space-x-2'; // Aligned to the right

  let paginationHTML = `<button onclick="changeDetailedPage(${detailedCurrentPage - 1})" ${detailedCurrentPage === 1 ? 'disabled' : ''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>`;
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button onclick="changeDetailedPage(${i})" class="${detailedCurrentPage === i ? 'bg-blue-600' : 'bg-gray-600'} hover:bg-gray-700 text-white px-3 py-1 rounded">${i}</button>`;
  }
  paginationHTML += `<button onclick="changeDetailedPage(${detailedCurrentPage + 1})" ${detailedCurrentPage === totalPages ? 'disabled' : ''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed">Next</button>`;
  
  pagination.innerHTML = paginationHTML;
  detailedPaginationContainer.appendChild(pagination);
}

function changeDetailedPage(page) {
    const filteredData = getFilteredData();
    const totalPages = Math.ceil(filteredData.detailed_analysis.length / detailedCardsPerPage);
    if (page < 1 || page > totalPages) return;
    detailedCurrentPage = page;
    renderDetailedCards(filteredData);
}

function getFilteredData() {
  const searchTerm = searchInput.value.toLowerCase();
  const filter = recommendationFilter.value;
  let filteredData = {
    ...mockApiResponse, 
    analysis_summary: [...mockApiResponse.analysis_summary],
    detailed_analysis: [...mockApiResponse.detailed_analysis]
  };

  if (searchTerm) {
    filteredData.analysis_summary = mockApiResponse.analysis_summary.filter(item => 
      item.company_name.toLowerCase().includes(searchTerm) || item.ticker.toLowerCase().includes(searchTerm)
    );
    filteredData.detailed_analysis = mockApiResponse.detailed_analysis.filter(item => 
      item.company_name.toLowerCase().includes(searchTerm) || item.ticker.toLowerCase().includes(searchTerm)
    );
  }

  if (filter !== 'all') {
    filteredData.analysis_summary = filteredData.analysis_summary.filter(item => item.recommendation === filter);
    filteredData.detailed_analysis = filteredData.detailed_analysis.filter(item => item.recommendation === filter);
  }
  return filteredData;
}

function renderAllData() {
    const data = getFilteredData();
    industryNameSpan.textContent = data.industry_analyzed;
    renderTablePage(data);
    renderDetailedCards(data);
}


// --- Event Listeners ---

industrySelect.addEventListener('change', () => {
  analyzeBtn.disabled = !industrySelect.value;
});

analyzeBtn.addEventListener('click', () => {
  loadingDiv.classList.remove('hidden');
  analysisContentDiv.classList.add('hidden');
  
  // Reset pagination and filters for a new analysis
  tableCurrentPage = 1;
  detailedCurrentPage = 1;
  searchInput.value = '';
  recommendationFilter.value = 'all';

  setTimeout(() => {
    renderAllData();
    loadingDiv.classList.add('hidden');
    analysisContentDiv.classList.remove('hidden');
    detailedSection.classList.add('hidden');
    toggleDetailedBtn.textContent = 'Show Detailed Analysis';
  }, 1500);
});

let searchTimeout;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    tableCurrentPage = 1;
    detailedCurrentPage = 1;
    renderAllData();
  }, 300);
});

recommendationFilter.addEventListener('change', () => {
  tableCurrentPage = 1;
  detailedCurrentPage = 1;
  renderAllData();
});

toggleDetailedBtn.addEventListener('click', () => {
  detailedSection.classList.toggle('hidden');
  toggleDetailedBtn.textContent = detailedSection.classList.contains('hidden') 
    ? 'Show Detailed Analysis' 
    : 'Hide Detailed Analysis';
});

window.addEventListener('load', populateIndustries);
