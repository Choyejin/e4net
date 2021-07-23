import React, { FC, useState } from 'react';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import * as utils from '../../common/utils';
import {
  Button, ButtonGroup
} from '@material-ui/core';
 
type Props = {
  setData: React.Dispatch<React.SetStateAction<any[]>>
}
export const ExcelReader: FC<Props> = ({
  setData
}) => {
  const [file, setFile] = useState({} as any);
  const [cols, setCols] = useState([] as any[]);
  
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      await setFile(files[0]);
      await document.getElementById('jsonSettingButton')!.click();
    }
    console.log('files: ', files);
  };

  const handleFile = () => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target!.result;
      const wb = XLSX.read(bstr, { type: 'binary',
      cellDates: true,
      cellNF: false,
      cellText: false, bookVBA : true });

      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      /* Convert array of arrays */
      const jsonData = XLSX.utils.sheet_to_json(ws);

      /* Update state */
      console.log(JSON.stringify(jsonData, null, 2));
      setCols(make_cols(ws['!ref']));
      setData(jsonData);                              // set [엑셀데이터]
    };
 
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    };
  }
  
  // 파일 업로드 버튼
  const handleFileInputButton = () => {
    document.getElementById('file')!.click();
  }
  return (
    <div>
      <Button
        variant="contained" color="primary" size="medium" 
        onClick={handleFileInputButton}
      >            
        엑셀 업로드
      </Button>


      <input type="file" id="file" accept={SheetJSFT} onChange={handleChange} style={{display:'none'}}/>
      <Button
        id="jsonSettingButton" 
        variant="outlined" color="primary" size="medium" 
        onClick={handleFile}
        style={{display:'none'}}
      >            
        버튼
      </Button>
    </div>
    
  );
}
 
export default ExcelReader;