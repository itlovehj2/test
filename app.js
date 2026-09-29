/**
 * 공공 안내서비스 포털 메인 스크립트
 */

// 1. 기본 내장 데이터 (CSV 원본 완벽 동기화)
const SERVICES_DATA = [
  { id: "A001", name: "주민등록 발급 안내", field: "민원", agency: "국토교통부", online: "가능", call: "1374", category: "민원", contactAgency: "국토교통부" },
  { id: "A002", name: "전입신고 안내", field: "민원", agency: "보건복지부", online: "가능", call: "1352", category: "민원", contactAgency: "보건복지부" },
  { id: "A003", name: "인감증명 안내", field: "민원", agency: "국토교통부", online: "가능", call: "1313", category: "민원", contactAgency: "국토교통부" },
  { id: "A004", name: "민원접수 안내", field: "민원", agency: "교육부", online: "가능", call: "1341", category: "민원", contactAgency: "교육부" },
  { id: "A005", name: "정부24 이용 안내", field: "민원", agency: "국토교통부", online: "가능", call: "1356", category: "민원", contactAgency: "국토교통부" },
  { id: "A006", name: "기초연금 안내", field: "복지", agency: "보건복지부", online: "불가", call: "1386", category: "복지", contactAgency: "보건복지부" },
  { id: "A007", name: "복지급여 안내", field: "복지", agency: "고용노동부", online: "가능", call: "1319", category: "복지", contactAgency: "고용노동부" },
  { id: "A008", name: "장애인지원 안내", field: "복지", agency: "보건복지부", online: "가능", call: "1337", category: "복지", contactAgency: "보건복지부" },
  { id: "A009", name: "아동수당 안내", field: "복지", agency: "지자체", online: "가능", call: "1326", category: "복지", contactAgency: "지자체" },
  { id: "A010", name: "지방세 납부 안내", field: "세금", agency: "보건복지부", online: "가능", call: "1357", category: "세금", contactAgency: "보건복지부" },
  { id: "A011", name: "취득세 안내", field: "세금", agency: "지자체", online: "가능", call: "1341", category: "세금", contactAgency: "지자체" },
  { id: "A012", name: "재산세 안내", field: "세금", agency: "지자체", online: "가능", call: "1317", category: "세금", contactAgency: "지자체" },
  { id: "A013", name: "자동차등록 안내", field: "교통", agency: "국토교통부", online: "가능", call: "1399", category: "교통", contactAgency: "국토교통부" },
  { id: "A014", name: "운전면허 안내", field: "교통", agency: "보건복지부", online: "불가", call: "1357", category: "교통", contactAgency: "보건복지부" },
  { id: "A015", name: "주정차단속 안내", field: "교통", agency: "국토교통부", online: "가능", call: "1367", category: "교통", contactAgency: "국토교통부" },
  { id: "A016", name: "재난지원금 안내", field: "재난", agency: "행정안전부", online: "불가", call: "1356", category: "재난", contactAgency: "행정안전부" },
  { id: "A017", name: "대피소 안내", field: "재난", agency: "국세청", online: "가능", call: "1359", category: "재난", contactAgency: "국세청" },
  { id: "A018", name: "안전신고 안내", field: "재난", agency: "국세청", online: "가능", call: "1357", category: "재난", contactAgency: "국세청" },
  { id: "A019", name: "국민취업지원 안내", field: "일자리", agency: "지자체", online: "가능", call: "1386", category: "일자리", contactAgency: "지자체" },
  { id: "A020", name: "구직급여 안내", field: "일자리", agency: "국토교통부", online: "불가", call: "1350", category: "일자리", contactAgency: "국토교통부" },
  { id: "A021", name: "청년일자리 안내", field: "일자리", agency: "지자체", online: "가능", call: "1392", category: "일자리", contactAgency: "지자체" },
  { id: "A022", name: "평생교육 안내", field: "교육", agency: "지자체", online: "가능", call: "1379", category: "교육", contactAgency: "지자체" },
  { id: "A023", name: "학자금 안내", field: "교육", agency: "지자체", online: "가능", call: "1324", category: "교육", contactAgency: "지자체" },
  { id: "A024", name: "교육비지원 안내", field: "교육", agency: "행정안전부", online: "가능", call: "1368", category: "교육", contactAgency: "행정안전부" }
];

// 카테고리별 테마 메타 정보 (아이콘, 색상 등)
const CATEGORY_META = {
  "민원": { icon: "fa-id-card", color: "#2563eb", bg: "#eff6ff" },
  "복지": { icon: "fa-hand-holding-heart", color: "#ec4899", bg: "#fdf2f8" },
  "세금": { icon: "fa-receipt", color: "#d97706", bg: "#fffbeb" },
  "교통": { icon: "fa-car-side", color: "#059669", bg: "#ecfdf5" },
  "재난": { icon: "fa-shield-halved", color: "#dc2626", bg: "#fef2f2" },
  "일자리": { icon: "fa-briefcase", color: "#8b5cf6", bg: "#f5f3ff" },
  "교육": { icon: "fa-graduation-cap", color: "#0ea5e9", bg: "#f0f9ff" }
};

// 현재 필터 상태 객체
const state = {
  category: "ALL",
  agency: "ALL",
  search: "",
  online: "ALL"
};

// DOM 요소 참조
const categoryFilter = document.getElementById("categoryFilter");
const agencyFilter = document.getElementById("agencyFilter");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const onlineFilter = document.getElementById("onlineFilter");
const quickCategoryChips = document.getElementById("quickCategoryChips");
const resultCountBadge = document.getElementById("resultCountBadge");
const resultCount = document.getElementById("resultCount");
const tableResultCount = document.getElementById("tableResultCount");
const categoryCardsContainer = document.getElementById("categoryCardsContainer");
const servicesTableBody = document.getElementById("servicesTableBody");
const emptyState = document.getElementById("emptyState");
const themeToggle = document.getElementById("themeToggle");
const btnResetFilter = document.getElementById("btnResetFilter");

// 2. 카테고리별 데이터 및 대표 문의기관 집계 계산 함수
function calculateCategoryStats(dataList) {
  const categories = [...new Set(SERVICES_DATA.map(item => item.category))];
  
  return categories.map(cat => {
    // 해당 카테고리의 모든 서비스 항목
    const catItems = SERVICES_DATA.filter(item => item.category === cat);
    const totalCount = catItems.length;

    // 대표 문의기관 계산 (해당 카테고리 내에서 최빈출 문의기관 산출)
    const agencyFrequency = {};
    catItems.forEach(item => {
      const agency = item.contactAgency || item.agency;
      agencyFrequency[agency] = (agencyFrequency[agency] || 0) + 1;
    });

    // 최다 빈도 기관 선정
    let repAgency = "";
    let maxCount = -1;
    for (const [agency, count] of Object.entries(agencyFrequency)) {
      if (count > maxCount) {
        maxCount = count;
        repAgency = agency;
      }
    }

    // 현재 필터링된 데이터에서 남아있는 건수
    const currentFilteredCount = dataList.filter(item => item.category === cat).length;

    return {
      category: cat,
      count: totalCount,
      currentCount: currentFilteredCount,
      repAgency: repAgency,
      repCount: maxCount,
      meta: CATEGORY_META[cat] || { icon: "fa-folder", color: "#64748b", bg: "#f8fafc" }
    };
  });
}

// 3. 카테고리 카드 렌더링 (필수: 카테고리명, 건수, 대표 문의기관)
function renderCategoryCards(dataList) {
  const stats = calculateCategoryStats(dataList);
  categoryCardsContainer.innerHTML = "";

  stats.forEach(stat => {
    const isSelected = state.category === stat.category;
    const card = document.createElement("div");
    card.className = `cat-card ${isSelected ? "selected" : ""}`;
    card.style.setProperty("--card-color", stat.meta.color);
    card.style.setProperty("--cat-bg", stat.meta.bg);

    card.innerHTML = `
      <div class="cat-card-header">
        <div class="cat-info-wrap">
          <div class="cat-icon-circle">
            <i class="fa-solid ${stat.meta.icon}"></i>
          </div>
          <div>
            <!-- 필수 1: 카테고리명 -->
            <h3 class="cat-title">${stat.category}</h3>
            <span style="font-size: 0.78rem; color: var(--text-secondary);">안내서비스</span>
          </div>
        </div>
        <!-- 필수 2: 건수 -->
        <span class="cat-count-badge" title="총 ${stat.count}건">
          ${stat.count}건
        </span>
      </div>

      <!-- 필수 3: 대표 문의기관 -->
      <div class="cat-rep-agency-box">
        <div class="rep-label">
          <i class="fa-solid fa-building-circle-check"></i> 대표 문의기관
        </div>
        <div class="rep-val">
          <span>${stat.repAgency}</span>
          <span class="rep-share">주관 ${stat.repCount}건</span>
        </div>
      </div>

      <div class="cat-card-footer">
        <span>현재 필터: <strong>${stat.currentCount}건</strong></span>
        <span class="cat-card-action">
          ${isSelected ? '선택 해제 <i class="fa-solid fa-xmark"></i>' : '서비스 조회 <i class="fa-solid fa-chevron-right"></i>'}
        </span>
      </div>
    `;

    // 카드 클릭 시 카테고리 필터 적용 토글
    card.addEventListener("click", () => {
      if (state.category === stat.category) {
        state.category = "ALL";
      } else {
        state.category = stat.category;
      }
      categoryFilter.value = state.category;
      applyFilters();
    });

    categoryCardsContainer.appendChild(card);
  });
}

// 4. 필터 드롭다운 옵션 초기화
function initFilterOptions() {
  // 카테고리 목록
  const categories = [...new Set(SERVICES_DATA.map(item => item.category))];
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = `${cat} (${SERVICES_DATA.filter(i => i.category === cat).length}건)`;
    categoryFilter.appendChild(opt);
  });

  // 문의기관 목록
  const agencies = [...new Set(SERVICES_DATA.map(item => item.contactAgency || item.agency))];
  agencies.sort().forEach(agency => {
    const count = SERVICES_DATA.filter(i => (i.contactAgency || i.agency) === agency).length;
    const opt = document.createElement("option");
    opt.value = agency;
    opt.textContent = `${agency} (${count}건)`;
    agencyFilter.appendChild(opt);
  });

  // 빠른 선택 카테고리 칩 생성
  quickCategoryChips.innerHTML = `
    <button class="chip-btn ${state.category === 'ALL' ? 'active' : ''}" data-cat="ALL">전체 (24)</button>
  `;
  categories.forEach(cat => {
    const chip = document.createElement("button");
    chip.className = `chip-btn ${state.category === cat ? 'active' : ''}`;
    chip.dataset.cat = cat;
    chip.textContent = cat;
    chip.addEventListener("click", () => {
      state.category = cat;
      categoryFilter.value = cat;
      applyFilters();
    });
    quickCategoryChips.appendChild(chip);
  });

  // 전체 칩 클릭 이벤트
  quickCategoryChips.querySelector('[data-cat="ALL"]').addEventListener("click", () => {
    state.category = "ALL";
    categoryFilter.value = "ALL";
    applyFilters();
  });
}

// 5. 필터링 로직 및 렌더링
function applyFilters() {
  const filtered = SERVICES_DATA.filter(item => {
    // 1. 카테고리 필터
    if (state.category !== "ALL" && item.category !== state.category) {
      return false;
    }

    // 2. 문의기관 필터
    const itemAgency = item.contactAgency || item.agency;
    if (state.agency !== "ALL" && itemAgency !== state.agency) {
      return false;
    }

    // 3. 온라인 안내 필터
    if (state.online !== "ALL" && item.online !== state.online) {
      return false;
    }

    // 4. 검색어 필터 (서비스명, 콜센터, 문의기관 등)
    if (state.search.trim() !== "") {
      const q = state.search.trim().toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchCall = item.call.toLowerCase().includes(q);
      const matchAgency = itemAgency.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchField = item.field.toLowerCase().includes(q);
      if (!matchName && !matchCall && !matchAgency && !matchCat && !matchField) {
        return false;
      }
    }

    return true;
  });

  // 필수 요구조건: '결과N건' 표시 업데이트
  const count = filtered.length;
  resultCount.textContent = count;
  tableResultCount.textContent = count;

  // 빠른 선택 칩 액티브 상태 업데이트
  document.querySelectorAll(".chip-btn").forEach(chip => {
    if (chip.dataset.cat === state.category) {
      chip.classList.add("active");
    } else {
      chip.classList.remove("active");
    }
  });

  // 카테고리 카드 갱신
  renderCategoryCards(filtered);

  // 상세 테이블 렌더링
  renderTable(filtered);
}

// 6. 상세 테이블 렌더링 함수
function renderTable(dataList) {
  servicesTableBody.innerHTML = "";

  if (dataList.length === 0) {
    emptyState.style.display = "block";
    document.querySelector(".table-responsive").style.display = "none";
    return;
  }

  emptyState.style.display = "none";
  document.querySelector(".table-responsive").style.display = "block";

  dataList.forEach(item => {
    const tr = document.createElement("tr");
    const meta = CATEGORY_META[item.category] || { color: "#2563eb", bg: "#eff6ff" };

    tr.innerHTML = `
      <td><span class="service-id-badge">${item.id}</span></td>
      <td>
        <div class="service-name-cell">
          <span>${item.name}</span>
        </div>
      </td>
      <td>
        <span class="tag-badge" style="background: ${meta.bg}; color: ${meta.color}; border: 1px solid ${meta.color}33;">
          ${item.category}
        </span>
      </td>
      <td>${item.agency}</td>
      <td><strong>${item.contactAgency || item.agency}</strong></td>
      <td>
        <a href="tel:${item.call}" class="call-badge" title="${item.call} 전화 연결">
          <i class="fa-solid fa-phone"></i> ${item.call}
        </a>
      </td>
      <td>
        <span class="status-tag ${item.online === '가능' ? 'available' : 'unavailable'}">
          <i class="fa-solid ${item.online === '가능' ? 'fa-check' : 'fa-xmark'}"></i> ${item.online}
        </span>
      </td>
      <td>
        <a href="tel:${item.call}" class="call-btn-action" title="${item.name} 바로 문의하기">
          <i class="fa-solid fa-headset"></i> 문의
        </a>
      </td>
    `;
    servicesTableBody.appendChild(tr);
  });
}

// 7. 필터 전체 초기화
function resetAllFilters() {
  state.category = "ALL";
  state.agency = "ALL";
  state.search = "";
  state.online = "ALL";

  categoryFilter.value = "ALL";
  agencyFilter.value = "ALL";
  onlineFilter.value = "ALL";
  searchInput.value = "";
  clearSearchBtn.classList.remove("visible");

  applyFilters();
}

// 8. 모달 제어 함수
function openImageModal(imgSrc, title) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");

  modalImg.src = imgSrc;
  modalTitle.textContent = title || "카드뉴스 확대보기";
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeImageModal(e) {
  if (e && e.target !== document.getElementById("imageModal") && !e.target.closest(".close-modal")) {
    return;
  }
  const modal = document.getElementById("imageModal");
  modal.classList.remove("open");
  document.body.style.overflow = "auto";
}

// ESC 키로 모달 닫기
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeImageModal();
  }
});

// 9. 테마 토글 (다크모드 / 라이트모드)
function initTheme() {
  const savedTheme = localStorage.getItem("app_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("app_theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

// 10. 이벤트 리스너 등록
function initEventListeners() {
  // 카테고리 필터
  categoryFilter.addEventListener("change", (e) => {
    state.category = e.target.value;
    applyFilters();
  });

  // 문의기관 필터
  agencyFilter.addEventListener("change", (e) => {
    state.agency = e.target.value;
    applyFilters();
  });

  // 온라인 안내 필터
  onlineFilter.addEventListener("change", (e) => {
    state.online = e.target.value;
    applyFilters();
  });

  // 검색 인풋
  searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    if (state.search.length > 0) {
      clearSearchBtn.classList.add("visible");
    } else {
      clearSearchBtn.classList.remove("visible");
    }
    applyFilters();
  });

  // 검색 지우기 버튼
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    state.search = "";
    clearSearchBtn.classList.remove("visible");
    applyFilters();
    searchInput.focus();
  });

  // 리셋 버튼
  btnResetFilter.addEventListener("click", resetAllFilters);

  // 뷰 모드 토글 (카드 vs 리스트 포커스)
  const btnViewCards = document.getElementById("btnViewCards");
  const btnViewList = document.getElementById("btnViewList");
  const categorySection = document.querySelector(".category-cards-section");
  const listSection = document.getElementById("servicesListSection");

  btnViewCards.addEventListener("click", () => {
    btnViewCards.classList.add("active");
    btnViewList.classList.remove("active");
    categorySection.scrollIntoView({ behavior: "smooth" });
  });

  btnViewList.addEventListener("click", () => {
    btnViewList.classList.add("active");
    btnViewCards.classList.remove("active");
    listSection.scrollIntoView({ behavior: "smooth" });
  });
}

// 초기 실행
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initFilterOptions();
  applyFilters();
  initEventListeners();
});
