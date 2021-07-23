import React from 'react';
import {TableRow, TableCell, Card, Table, TableBody } from '@material-ui/core';
import loadingImg from '../assets/loading.gif';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { pdf } from '@react-pdf/renderer';


/**
 * 문자열이 null,undefined 또는 Empty 인지 확인하는 함수.
 * @param   str     원본 문자열
 * @return  null or Empty or undefined = true
 */
export function isNullOrBlank(str: string | null | undefined): boolean {
  if (str === undefined || str === null || str.trim().length === 0) {
    return true;
  }
  return false;
}

export const exportToCSV = (fileNm: String, rowData: any[]) => {       
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'; 
  const fileExtension = '.xlsx';                                              // 확장자 지정
  const fileName = fileNm + '_' + format(new Date(), 'yyyyMMddHHmmss');       // 생성될 파일의 파일명 지정
  const ws = XLSX.utils.json_to_sheet(rowData);      
  const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };                // excel 파일의 sheet 지정
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });    // array 형식으로 excel에 데이터 작성
  const data = new Blob([excelBuffer], {type: fileType});
  FileSaver.saveAs(data, fileName + fileExtension);       // 생성된 excel 파일을 파일로써 저장
}

export const exportToPDF = async (fileNm: String, doc: any) => {        
  const fileExtension = '.pdf';                                              // 확장자 지정
  const fileName = fileNm + '_' + format(new Date(), 'yyyyMMddHHmmss');      // 생성될 파일의 파일명 지정
  const asPdf = pdf(doc);
  // asPdf.updateContainer(doc);
  const blob = await asPdf.toBlob();
  FileSaver.saveAs(blob, fileName + fileExtension);       // 생성된 pdf 파일을 파일로써 저장
}

/**
 * 로딩 바
 */
export const Loading = () => {
  return (
    <Card>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} align="center">
              <img src={loadingImg} alt="loading" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}

