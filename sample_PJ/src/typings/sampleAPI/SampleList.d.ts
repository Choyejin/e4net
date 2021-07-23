type SampleSearchInfo = {
  searchType                :string;  // 검색조건
  searchValue               :string;  // 검색값
  startDt                   :string;  // 시작일자
}

type SampleListInfo = {
  test1                     :string;
  test2                     :string;
  test3                     :string;
  test4                     :string;
  test5                     :string;
}

type SampleSearchInfo2 = {
  searchType                :string;  // 검색조건
  searchValue               :string;  // 검색값
}

type Paging = {
  page: number,
  rowsPerPage: number
}