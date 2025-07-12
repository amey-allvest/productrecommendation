const industries = [
  "Aluminium",
  "IT",
  "Pharma",
  "Automotive",
  "Banking",
  "Energy",
  "Real Estate",
  "Consumer Goods",
  "Telecommunications",
  "Healthcare"
];

const mockApiResponse = {
  request_id: "c7a8b9d0-e1f2-3456-7890-12345abcdef6",
  timestamp: "2025-07-12T11:55:00Z",
  industry_analyzed: "Indian Aluminium Sector",
  analysis_summary: [
    { company_name: "Hindalco Industries Limited", ticker: "HINDALCO.NS", recommendation: "BUY", key_metrics: { pe_ratio: 9.34, market_cap_inr: "1.51T" }, key_justification: "Attractive valuation with strong earnings growth and robust cash flow." },
    { company_name: "National Aluminium Company", ticker: "NATIONALUM.NS", recommendation: "BUY", key_metrics: { pe_ratio: 6.52, market_cap_inr: "342B" }, key_justification: "Deep value with a net-cash balance sheet." },
    { company_name: "MMP Industries Limited", ticker: "MMP.NS", recommendation: "HOLD", key_metrics: { pe_ratio: 19.17, market_cap_inr: "7.27B" }, key_justification: "Strong revenue growth but poor cash flow conversion." },
    { company_name: "Maan Aluminium Limited", ticker: "MAANALU.NS", recommendation: "SELL", key_metrics: { pe_ratio: 41.68, market_cap_inr: "6.47B" }, key_justification: "Overvalued with declining earnings and high debt." },
    { company_name: "Arfin India Limited", ticker: "ARFIN.BO", recommendation: "SELL", key_metrics: { pe_ratio: 48.88, market_cap_inr: "4.28B" }, key_justification: "Overvalued with negative cash flow." },
    { company_name: "Alufluoride Limited", ticker: "ALUFLUOR.BO", recommendation: "SELL", key_metrics: { pe_ratio: 18.22, market_cap_inr: "3.21B" }, key_justification: "Slowing earnings growth and negative cash flow." },
    { company_name: "Century Extrusions Limited", ticker: "CENTEXT.NS", recommendation: "SELL", key_metrics: { pe_ratio: 21.26, market_cap_inr: "1.76B" }, key_justification: "Speculative price surge not supported by fundamentals." },
    { company_name: "Goyal Aluminiums Limited", ticker: "GOYALALUM.BO", recommendation: "SELL", key_metrics: { pe_ratio: 55.28, market_cap_inr: "1.16B" }, key_justification: "Overvalued with decelerating growth." },
    { company_name: "Sudal Industries Limited", ticker: "SUDAI.BO", recommendation: "SELL", key_metrics: { pe_ratio: 11.93, market_cap_inr: "60.01Cr" }, key_justification: "Speculative bubble based on non-recurring income." },
    { company_name: "Hind Aluminium Industries Limited", ticker: "HINDALUMI.BO", recommendation: "SELL", key_metrics: { pe_ratio: 5.75, market_cap_inr: "42.97Cr" }, key_justification: "Value trap with collapsing core business." },
    { company_name: "Nirav Commercials Limited", ticker: "NIRAVCOM.BO", recommendation: "SELL", key_metrics: { pe_ratio: 681.8, market_cap_inr: "29.56Cr" }, key_justification: "Extreme overvaluation with declining earnings." },
    { company_name: "Bothra Metals and Alloys Limited", ticker: "BMAL.BO", recommendation: "SELL", key_metrics: { pe_ratio: 47.73, market_cap_inr: "22.22Cr" }, key_justification: "Overvalued with inconsistent fundamentals." },
    { company_name: "Maitri Enterprises Limited", ticker: "MAITRI.BO", recommendation: "SELL", key_metrics: { pe_ratio: -41.74, market_cap_inr: "14.83Cr" }, key_justification: "Unprofitable with high debt and illiquidity." },
    { company_name: "Sturdy Industries Limited", ticker: "STURDY.BO", recommendation: "SELL", key_metrics: { pe_ratio: -2.71, market_cap_inr: "4.39Cr" }, key_justification: "Insolvent with unsustainable debt." },
    { company_name: "Bharat Aluminium Company", ticker: "BALCO.NS", recommendation: "BUY", key_metrics: { pe_ratio: 8.45, market_cap_inr: "280B" }, key_justification: "Undervalued with strong operational efficiency." },
    { company_name: "Vedanta Aluminium Limited", ticker: "VEDALUM.NS", recommendation: "BUY", key_metrics: { pe_ratio: 10.12, market_cap_inr: "1.2T" }, key_justification: "Robust fundamentals and growth prospects." },
    { company_name: "Alicon Castalloy Limited", ticker: "ALICON.NS", recommendation: "HOLD", key_metrics: { pe_ratio: 15.67, market_cap_inr: "12.5B" }, key_justification: "Stable growth but high valuation." },
    { company_name: "Parc Aluminium Limited", ticker: "PARCALUM.BO", recommendation: "SELL", key_metrics: { pe_ratio: 32.45, market_cap_inr: "5.89B" }, key_justification: "Overvalued with weak cash flow." },
    { company_name: "Synthiko Foils Limited", ticker: "SYNTHIKO.BO", recommendation: "SELL", key_metrics: { pe_ratio: 60.23, market_cap_inr: "1.45B" }, key_justification: "High P/E with erratic earnings." },
    { company_name: "P G Foils Limited", ticker: "PGFOILS.BO", recommendation: "SELL", key_metrics: { pe_ratio: 25.78, market_cap_inr: "2.34B" }, key_justification: "Overvalued with volatile profitability." },
    { company_name: "Sacheta Metals Limited", ticker: "SACHETA.BO", recommendation: "SELL", key_metrics: { pe_ratio: 38.12, market_cap_inr: "1.89B" }, key_justification: "High valuation with inconsistent cash flow." },
    { company_name: "Manaksia Coated Metals", ticker: "MANAKCOAT.NS", recommendation: "SELL", key_metrics: { pe_ratio: 29.56, market_cap_inr: "3.45B" }, key_justification: "Overvalued with high debt levels." },
    { company_name: "Gujarat Foils Limited", ticker: "GUJFOIL.BO", recommendation: "SELL", key_metrics: { pe_ratio: -5.67, market_cap_inr: "1.12B" }, key_justification: "Unprofitable with declining revenue." },
    { company_name: "Baheti Recycling Industries", ticker: "BAHETI.BO", recommendation: "HOLD", key_metrics: { pe_ratio: 17.89, market_cap_inr: "2.78B" }, key_justification: "Moderate growth but high volatility." },
    { company_name: "NALCO Extrusions Limited", ticker: "NALCOEXT.BO", recommendation: "SELL", key_metrics: { pe_ratio: 45.32, market_cap_inr: "1.67B" }, key_justification: "Overvalued with weak fundamentals." },
    { company_name: "Aluminium India Limited", ticker: "ALUMIND.BO", recommendation: "SELL", key_metrics: { pe_ratio: 52.14, market_cap_inr: "0.98B" }, key_justification: "High P/E with low profitability." },
    { company_name: "Sri Lakshmi Aluminium", ticker: "SLA.BO", recommendation: "SELL", key_metrics: { pe_ratio: -8.45, market_cap_inr: "0.45B" }, key_justification: "Unprofitable with high financial risk." },
    { company_name: "Precision Metals Limited", ticker: "PRECMET.BO", recommendation: "SELL", key_metrics: { pe_ratio: 33.67, market_cap_inr: "0.89B" }, key_justification: "Overvalued with erratic financials." },
    { company_name: "Hindustan Foils Limited", ticker: "HINFOIL.BO", recommendation: "SELL", key_metrics: { pe_ratio: 27.89, market_cap_inr: "1.23B" }, key_justification: "High valuation with inconsistent earnings." },
    { company_name: "India Aluminium Works", ticker: "INDALUM.BO", recommendation: "SELL", key_metrics: { pe_ratio: 39.45, market_cap_inr: "0.67B" }, key_justification: "Overvalued with weak cash flow." }
  ],
  detailed_analysis: [
    {
      company_name: "Hindalco Industries Limited", ticker: "HINDALCO.NS", recommendation: "BUY",
      qualitative_analysis: {
        summary: "Appears undervalued with strong financial performance. Record profits and robust cash flows are reinvested for growth.",
        reasoning_points: ["Low P/E of 9.34 and PEG of ~0.16 signal undervaluation.", "Strong operational efficiency with growing cash flow.", "Manageable debt-to-equity ratio of 0.53.", "Aggressive capex indicates long-term growth confidence."],
        risk_factors: ["Sensitive to global aluminum price cycles.", "Global slowdown could curb demand.", "Monitor debt for capex returns."]
      }
    },
    {
      company_name: "National Aluminium Company", ticker: "NATIONALUM.NS", recommendation: "BUY",
      qualitative_analysis: {
        summary: "Deep value investment with a net-cash balance sheet and strong earnings growth, offering a high margin of safety.",
        reasoning_points: ["P/E of 6.52 and PEG of ~0.04 indicate deep undervaluation.", "Debt-free with large cash reserves.", "High free cash flow shows operational efficiency.", "25% price correction offers an attractive entry."],
        risk_factors: ["High dependency on aluminum price cycles.", "Exposed to global macro volatility."]
      }
    },
    {
      company_name: "MMP Industries Limited", ticker: "MMP.NS", recommendation: "HOLD",
      qualitative_analysis: {
        summary: "Strong revenue growth is offset by poor earnings quality and negative free cash flow, warranting caution.",
        reasoning_points: ["Strong revenue and EPS growth support valuation.", "Negative free cash flow of -₹495M is a red flag.", "Debt increased 400% in four years.", "Await cash flow improvement before investing."],
        risk_factors: ["Unsustainable cash burn from high capex.", "Rising receivables pose write-down risk.", "High volatility in stock price."]
      }
    },
    {
      company_name: "Maan Aluminium Limited", ticker: "MAANALU.NS", recommendation: "SELL",
      qualitative_analysis: {
        summary: "Highly volatile micro-cap with collapsing profitability, negative cash flow, and soaring debt, creating high risk.",
        reasoning_points: ["P/E of ~41.7 unjustifiable as EPS cratered.", "Net income down 69% from peak.", "Negative free cash flow of -₹564M.", "Debt tripled in a year, elevating risk."],
        risk_factors: ["Cyclical industry sensitivity with high debt.", "Micro-cap volatility and liquidity risk.", "Debt-funded expansion may fail."]
      }
    },
    {
      company_name: "Arfin India Limited", ticker: "ARFIN.BO", recommendation: "SELL",
      qualitative_analysis: {
        summary: "Significant overvaluation with inconsistent earnings, high leverage, and negative cash flow, indicating financial distress.",
        reasoning_points: ["P/E of 48.88 unsupported by volatile earnings.", "Negative operating cash flow of -₹212M.", "Negative free cash flow of -₹271.4M.", "High debt of ₹1.17B."],
        risk_factors: ["Overvalued relative to cash generation.", "High inventory and receivables risks.", "Micro-cap liquidity risk."]
      }
    },
    {
      company_name: "Alufluoride Limited", ticker: "ALUFLUOR.BO", recommendation: "SELL",
      qualitative_analysis: {
        summary: "Sharp growth deceleration with negative cash flow and overvalued PEG ratio, making the stock unattractive.",
        reasoning_points: ["Net income growth dropped from 38% to 2.4%.", "PEG ratio of ~7.6 overvalued.", "Negative free cash flow of -₹17.8M.", "Operating cash flow dropped 64%."],
        risk_factors: ["Low trading volume causes high volatility.", "Exposed to commodity price fluctuations.", "Risk of further price decline."]
      }
    },
    {
      company_name: "Century Extrusions Limited", ticker: "CENTEXT.NS", recommendation: "SELL",
      qualitative_analysis: {
        summary: "Micro-cap with speculative price surge, stagnant revenue, and thin margins, posing significant risk.",
        reasoning_points: ["Extreme volatility on high volume.", "Stagnant revenue growth of 0.8%.", "P/E of 21 too high for flat growth.", "Weak profitability offers little cushion."],
        risk_factors: ["High volatility and speculative trading.", "Margins exposed to aluminum prices.", "Micro-cap liquidity risk."]
      }
    },
    {
      company_name: "Goyal Aluminiums Limited", ticker: "GOYALALUM.BO", recommendation: "SELL",
      qualitative_analysis: {
        summary: "Overvalued micro-cap with decelerating growth, volatile cash flow, and speculative price history.",
        reasoning_points: ["P/E of 55.28 unsupported by performance.", "Net income growth fell from 112% to 18%.", "Weak cash flow conversion.", "Speculative price rally and crash."],
        risk_factors: ["High volatility and liquidity risk.", "Thin margins vulnerable to costs.", "Risk of further price declines."]
      }
    },
    {
      company_name: "Sudal Industries Limited", ticker: "SUDAI.BO", recommendation: "SELL",
      qualitative_analysis: {
        summary: "Speculative bubble with misleading P/E based on non-recurring income, masking poor operational performance.",
        reasoning_points: ["15x price surge not supported by fundamentals.", "P/E of 11.9 based on one-time gain.", "Forward P/E of ~12.8 high for loss history.", "No operational turnaround."],
        risk_factors: ["Speculative momentum detached from value.", "Cyclical industry exposure.", "High illiquidity risk."]
      }
    },
    {
      company_name: "Hind Aluminium Industries Limited", ticker: "HINDALUMI.BO", recommendation: "SELL",
      qualitative_analysis: {
        summary: "Value trap with misleading low P/E, driven by non-operational income while core business collapses.",
        reasoning_points: ["Revenue dropped from ₹95.7 Cr to ₹1.3 Cr.", "Profits from 'other income', not operations.", "Negative cash flow for two years.", "Low trading volumes."],
        risk_factors: ["Low P/E masks poor earnings quality.", "Extreme illiquidity.", "Failing core business risks."]
      }
    }
  ]
};

const industrySelect = document.getElementById('industrySelect');
const analyzeBtn = document.getElementById('analyzeBtn');
const loadingDiv = document.getElementById('loading');
const analysisContentDiv = document.getElementById('analysisContent');
const industryNameSpan = document.getElementById('industryName');
const summaryTableBody = document.getElementById('summaryTableBody');
const detailedCardsContainer = document.getElementById('detailedCardsContainer');
const searchInput = document.getElementById('searchInput');
const recommendationFilter = document.getElementById('recommendationFilter');
const toggleDetailedBtn = document.getElementById('toggleDetailed');
const detailedSection = document.getElementById('detailedAnalysisSection');
let currentPage = 1;
const rowsPerPage = 10;

function populateIndustries() {
  industries.forEach(industry => {
    const option = document.createElement('option');
    option.value = industry;
    option.textContent = industry;
    industrySelect.appendChild(option);
  });
}

function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  document.getElementById('errorText').textContent = message;
  errorDiv.classList.remove('hidden');
  setTimeout(() => errorDiv.classList.add('hidden'), 5000);
}

function getPeRatioClass(peRatio) {
  if (peRatio < 0) return 'text-red-500';
  if (peRatio < 15) return 'text-green-500';
  if (peRatio < 30) return 'text-yellow-500';
  return 'text-red-500';
}

function renderTablePage(data, page) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
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
          <span class="px-3 py-1 text-sm font-bold rounded-full ${recommendationClass}">
            ${item.recommendation}
          </span>
        </td>
      </tr>
    `;
    summaryTableBody.innerHTML += row;
  });
  renderPaginationControls(data.analysis_summary.length);
}

function renderPaginationControls(totalRows) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const existingPagination = summaryTableBody.parentElement.querySelector('.pagination');
  if (existingPagination) existingPagination.remove();
  const pagination = document.createElement('div');
  pagination.className = 'pagination flex justify-center mt-4 space-x-2';
  pagination.innerHTML = `
    <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded">Previous</button>
    ${Array.from({ length: totalPages }, (_, i) => `
      <button onclick="changePage(${i + 1})" class="${currentPage === i + 1 ? 'bg-blue-600' : 'bg-gray-600'} hover:bg-gray-700 text-white px-3 py-1 rounded">
        ${i + 1}
      </button>
    `).join('')}
    <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded">Next</button>
  `;
  summaryTableBody.parentElement.appendChild(pagination);
}

function changePage(page) {
  currentPage = page;
  renderTablePage(getFilteredData(), currentPage);
}

function renderDetailedCards(data) {
  detailedCardsContainer.innerHTML = '';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.index);
        const stock = data.detailed_analysis[index];
        const recommendationClass = stock.recommendation.toLowerCase();
        const card = `
          <div class="card p-6">
            <div class="flex justify-between items-start mb-4 cursor-pointer" onclick="this.nextElementSibling.classList.toggle('hidden')">
              <div>
                <h3 class="text-2xl font-bold text-white">${stock.company_name}</h3>
                <p class="text-gray-400">${stock.ticker}</p>
              </div>
              <span class="px-4 py-1.5 text-sm font-bold rounded-full ${recommendationClass}">
                ${stock.recommendation}
              </span>
            </div>
            <div class="space-y-6 hidden">
              <div>
                <h4 class="text-lg font-semibold text-blue-400 mb-2">Analysis</h4>
                <p class="text-gray-300 text-sm">${stock.qualitative_analysis.summary}</p>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-blue-400 mb-2">Reasoning</h4>
                <ul class="list-disc list-inside space-y-1 text-sm text-gray-300">
                  ${stock.qualitative_analysis.reasoning_points.map(p => `<li>${p}</li>`).join('')}
                </ul>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-red-400 mb-2">Risk Factors</h4>
                <ul class="list-disc list-inside space-y-1 text-sm text-gray-300">
                  ${stock.qualitative_analysis.risk_factors.map(r => `<li>${r}$</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        `;
        entry.target.innerHTML = card;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  data.detailed_analysis.forEach((stock, index) => {
    const placeholder = document.createElement('div');
    placeholder.dataset.index = index;
    placeholder.className = 'h-64 bg-gray-800 rounded-lg';
    detailedCardsContainer.appendChild(placeholder);
    observer.observe(placeholder);
  });
}

function getFilteredData() {
  const searchTerm = searchInput.value.toLowerCase();
  const filter = recommendationFilter.value;
  let filteredData = { ...mockApiResponse };
  if (searchTerm) {
    filteredData.analysis_summary = mockApiResponse.analysis_summary.filter(item => 
      item.company_name.toLowerCase().includes(searchTerm) || 
      item.ticker.toLowerCase().includes(searchTerm)
    );
    filteredData.detailed_analysis = mockApiResponse.detailed_analysis.filter(item => 
      item.company_name.toLowerCase().includes(searchTerm) || 
      item.ticker.toLowerCase().includes(searchTerm)
    );
  }
  if (filter !== 'all') {
    filteredData.analysis_summary = filteredData.analysis_summary.filter(item => item.recommendation === filter);
    filteredData.detailed_analysis = filteredData.detailed_analysis.filter(item => item.recommendation === filter);
  }
  return filteredData;
}

function renderData(data) {
  industryNameSpan.textContent = data.industry_analyzed;
  summaryTableBody.innerHTML = '';
  detailedCardsContainer.innerHTML = '';
  renderTablePage(data, 1);
  renderDetailedCards(data);
}

industrySelect.addEventListener('change', () => {
  analyzeBtn.disabled = ! izb_notatki
!industrySelect.value;
});

analyzeBtn.addEventListener('click', () => {
  const industry = industrySelect.value;
  if (!industry) {
    showError('Please select an industry.');
    return;
  }
  if (!industries.includes(industry)) {
    showError('Invalid industry selected.');
    return;
  }
  loadingDiv.classList.remove('hidden');
  analysisContentDiv.classList.add('hidden');
  setTimeout(() => {
    renderData(getFilteredData());
    loadingDiv.classList.add('hidden');
    analysisContentDiv.classList.remove('hidden');
  }, 1500);
});

let searchTimeout;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage = 1;
    renderData(getFilteredData());
  }, 300);
});

recommendationFilter.addEventListener('change', () => {
  currentPage = 1 అ

System: 1;
renderData(getFilteredData());
});

toggleDetailedBtn.addEventListener('click', () => {
  detailedSection.classList.toggle('hidden');
  toggleDetailedBtn.textContent = detailedSection.classList.contains('hidden') 
    ? 'Show Detailed Analysis' 
    : 'Hide Detailed Analysis';
});

window.addEventListener('load', () => {
  populateIndustries();
});
