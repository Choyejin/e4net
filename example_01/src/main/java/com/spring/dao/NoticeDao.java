package com.spring.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.dto.NoticeDto;

@Repository
public class NoticeDao {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	private static final Logger logger = LoggerFactory.getLogger(NoticeDao.class);
	
	public List <NoticeDto> sel(){
		System.out.println("---------------------NoticeDao");
		return sqlSession.selectList("sql.sel");
	}
	  
	public NoticeDto noticeDetailDao(String writer, String title){
		      System.out.println("----------------------------noticeDetailDao");
		      
		      Map<String, Object> paramMap = new HashMap<String, Object>(); 
		      paramMap.put("writer", writer); 
		      paramMap.put("title", title);

		      System.out.println("<<< writer"+writer);
		      System.out.println("<<< title"+title);
		      
		      return sqlSession.selectOne("sql.selpop",paramMap);
	}

	public String noticeUpdateDao(String contents, String title, Integer nos) {
		      System.out.println("----------------------------noticeUpdateDao");

		      Map<String, Object> paramMap = new HashMap<String, Object>(); 
		      paramMap.put("contents", contents); 
		      paramMap.put("title", title);
		      paramMap.put("nos", nos);

		      System.out.println("<<< contents"+contents);
		      System.out.println("<<< title"+title);
		      System.out.println("<<< nos"+nos);
		      
		      return sqlSession.selectOne("sql.selNoticeUpdate",paramMap);
	}
	
}

