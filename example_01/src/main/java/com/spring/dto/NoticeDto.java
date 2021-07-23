package com.spring.dto;
import java.util.Date;
import org.springframework.stereotype.Repository;

public class NoticeDto {
	private int No;
	private String writer;
	private String title;
	private String contents;
	private Date date;
	private int read;
	private int nos;
	
	public int getNo() {
		return No;
	}
	public void setNo(int no) {
		No	= no;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getRead() {
		return read;
	}
	public void setRead(int read) {
		this.read = read;
	}
	public int getNos() {
		return nos;
	}
	public void setNos(int nos) {
		this.nos = nos;
	}

}
