import client from '../CommonApi/client';

export async function selectMember (input: SampleSearchInfo) {
  
  return client.post(`/admin/member/detail`, input).then(res => { 
    return res.data;
  }).catch(e => {
    return e.response.body;
  });
}

export async function selectMemberList (input: SampleMemberListInfo,pageVO: Paging) {

  return client.get(`/admin/member/list`, {
    params : {
      searchType: input.searchType,
      searchValue: input.searchValue,
      page: pageVO.page + 1,
      rowsPerPage : pageVO.rowsPerPage
    }
  }).then(res => { 
    if (res.data.code == "0000") {
      return res.data;
    } else if (res.data.code == "LOGN9999") {
      alert(res.data.message);
      window.sessionStorage.removeItem("token");
      window.location.replace("/");
    }
    return res.data;
  }).catch(e => {
    console.log(e);
  });
}
