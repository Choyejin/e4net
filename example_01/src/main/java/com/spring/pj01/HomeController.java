package com.spring.pj01;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.dao.NoticeDao;
import com.spring.dto.NoticeDto;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	@Autowired
	NoticeDao noticeDao;
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
	

	@RequestMapping(value = "/api/notice", method = RequestMethod.GET)
	@ResponseBody
	public List<NoticeDto> notice() {
		logger.info("Welcome home! The client locale is {}.");
		
		List<NoticeDto> list = noticeDao.sel();
		System.out.println("<<<list"+list);
		
		for(int i=0; i<list.size(); i++) { 
			logger.info(list.get(i).getContents());
			logger.info(list.get(i).getTitle()); 
			logger.info(list.get(i).getWriter());
			System.out.println("<<<list"+list.get(i).getTitle());
//			model.addAttribute("ID", list.get(0).getId());
		  
		  
		  }
				

		return list;
	}

	
	
	@RequestMapping(value = "/api/noticeDetail", method = RequestMethod.POST)
	 @ResponseBody
	   public NoticeDto noticeDetail(@RequestBody Map<String,Object> paramMap){
	      logger.info("noticeDetail>>>"+paramMap);
	      
	      System.out.println("writer : " + paramMap.get("writer"));
	        System.out.println("title : " + paramMap.get("title"));
	        System.out.println("date : " + paramMap.get("date"));
	        
	        String writer = (String)paramMap.get("writer");
	        String title = (String)paramMap.get("title");
	
	      NoticeDto noticeDetail = noticeDao.noticeDetailDao(writer, title);
	      System.out.println("<<< noticeDetail"+noticeDetail);
	      
	      return noticeDetail;
	   }
	
	   @RequestMapping(value = "/api/noticeUpdate", method = RequestMethod.POST)
	   @ResponseBody
	   public String noticeUpdate(@RequestBody Map<String,Object> paramMap){
	      logger.info("noticeDetail>>>"+paramMap);
	      
	      System.out.println("contents : " + paramMap.get("contents"));
	        System.out.println("title : " + paramMap.get("title"));
	        System.out.println("nos : " + paramMap.get("no"));
	        
	        String contents = (String)paramMap.get("contents");
	        String title = (String)paramMap.get("title");
	        int nos = (Integer)paramMap.get("no");

	      String noticeUpdate = noticeDao.noticeUpdateDao(contents, title, nos);
	      System.out.println("<<< noticeUpdate"+noticeUpdate);
	      
	      return noticeUpdate;
	   }
	
	
}
	
	