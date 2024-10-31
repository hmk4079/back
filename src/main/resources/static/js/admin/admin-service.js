document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".Filter_searchInput");
    const inquiryContainer = document.querySelector(".inquiryTable_container");
    const paginationContainer = document.querySelector(".pagination-list.inquiry-page");
    const inquiryFilters = document.querySelectorAll(".sort-filter-option.inquiry-list");

    // 문의 내역 렌더링
    const renderInquiries = (inquiries) => {
        let content = '';

        inquiries.forEach((inquiry) => {
            content += `
            <div class="inquiryTable_row data_row">
                <div class="inquiryTable_cell"><input type="checkbox" class="inquiryCheckbox" /></div>
                <div class="inquiryTable_cell inquiry_type">${inquiry.inquiryType}</div>
                <div class="inquiryTable_cell inquiry_date">${inquiry.createdDate}</div>
                <div class="inquiryTable_cell">${inquiry.postTitle}</div>
                <div class="inquiryTable_cell">${inquiry.postContent}</div>
                <div class="inquiryTable_cell">${inquiry.memberNickName}</div>
                <div class="inquiryTable_cell">${inquiry.inquiryEmail}</div>
                <div class="inquiryTable_cell">${inquiry.inquiryStatus}</div>
                <div class="inquiryTable_cell"><button class="editBtn">답변하기</button></div>
            </div>`;
        });

        inquiryContainer.innerHTML = content;
    };

    // 검색어 입력 시 엔터키로 검색
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();  // 폼 제출 방지
            const keyword = searchInput.value.trim();  // 검색어 가져오기
            fetchFilteredInquiries(1, keyword);  // 검색어로 데이터 불러오기
        }
    });

    // 필터 버튼 클릭 시 필터에 맞는 데이터 불러오기
    inquiryFilters.forEach((option) => {
        option.addEventListener("click", () => {
            inquiryFilters.forEach((opt) => opt.classList.remove("selected")); // 모든 필터 초기화
            option.classList.add("selected"); // 선택된 필터만 활성화

            const filterType = option.textContent.trim();
            fetchFilteredInquiries(1, "", filterType); // 필터 조건으로 데이터 불러오기
        });
    });

    // 문의 데이터를 가져오는 함수
    const fetchFilteredInquiries = async (page = 1, keyword = '', filterType = '') => {
        try {
            const response = await fetch(`/admin/inquiry-page?page=${page}&query=${keyword}&filter=${filterType}`);
            const data = await response.json();
            renderInquiries(data.inquiries);
            renderPagination(data.pagination);
        } catch (error) {
            console.error("문의 내역 불러오기 오류:", error);
        }
    };

    // 페이지네이션을 렌더링하는 함수
    const renderPagination = (pagination, keyword, filterType) => {
        let paginationHTML = '';

        // 처음 페이지로 이동
        paginationHTML += `<li class="pagination-first">
            <a href="#" data-page="1" class="pagination-first-link">«</a></li>`;

        // 이전 페이지로 이동
        if (pagination.prev) {
            paginationHTML += `<li class="pagination-prev">
                <a href="#" data-page="${pagination.startPage - 1}" class="pagination-prev-link">‹</a></li>`;
        }

        // 페이지 번호
        for (let i = pagination.startPage; i <= pagination.endPage; i++) {
            paginationHTML += `<li class="pagination-page ${pagination.page === i ? 'active' : ''}">
                <a href="#" data-page="${i}" class="pagination-page-link">${i}</a></li>`;
        }

        // 다음 페이지로 이동
        if (pagination.next) {
            paginationHTML += `<li class="pagination-next">
                <a href="#" data-page="${pagination.endPage + 1}" class="pagination-next-link">›</a></li>`;
        }

        // 마지막 페이지로 이동
        paginationHTML += `<li class="pagination-last">
            <a href="#" data-page="${pagination.realEnd}" class="pagination-last-link">»</a></li>`;

        paginationContainer.innerHTML = paginationHTML;

        // 페이지 버튼 클릭 이벤트 설정
        document.querySelectorAll(".pagination-page-link, .pagination-prev-link, .pagination-next-link, .pagination-first-link, .pagination-last-link").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const page = e.target.getAttribute("data-page");
                fetchFilteredInquiries(page, keyword, filterType);
            });
        });
    };

    // 초기 데이터 로드
    fetchFilteredInquiries(); // 첫 페이지의 데이터를 로드합니다.
});
