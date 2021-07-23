import {format as formatDate} from 'date-fns';
import * as crypto from 'crypto';

/******************************************************************************************
 * 데이터 포맷팅
 * 포맷팅 대상 : 카드번호, 날짜, 금액, 사업자번호
 ******************************************************************************************/

/**
 * isNull Check
 * @param {value} value 
 * @return boolean
 */
const checkValueNull = (value) => {
  if(value === 'undefined' || value == null || value === ''){
    return true;
  }else{
    return false;
  }
}

/**
 * 날짜 기본 포맷팅 (yyyy-MM-dd)
 * @param {value} value 
 * @return yyyy-MM-dd
 */
const dateFormatDefault = (value) => {
  if(checkValueNull(value)) return value;
  return dateFormat(value, 'yyyy-MM-dd');
};

/**
 * 날짜 포맷팅
 * @param {value} value (typeof Date || String(yyyyMMdd || yyyy-MM-dd))
 * @param {format} format 
 * @example dateFormat(new Date(), 'yyyy/MM/dd') || dateFormat('2020-01-01', 'yyyy.MM.dd') || dateFormat('20200101', 'yyyy-MM-dd')
 * @return input Format
 */
const dateFormat = (value, format) => { 

  if(checkValueNull(value)) return value;

  var dateVal = new Date();
  
  if(value instanceof String || (typeof value) == 'string'){
    var matchValue = value.match(/(\d{4})-(\d{2})-(\d{2})/gi);
    if(checkValueNull(matchValue)){
      var customDate = value.replace(/(\d{4})(\d{2})(\d)/, '$1-$2-$3');
      dateVal = new Date(customDate);
    }else{
      dateVal = new Date(value);
    }
  }else if(value instanceof Date || (typeof value) == 'object'){
    dateVal = value;
  }

  if(checkValueNull(format)){
    format = 'yyyy-MM-dd';
  }

  return formatDate(dateVal, format);
};

/**
 * 시분초 포맷팅
 * @param {value} value type of String
 * @return hh:mm:ss
 */
const dateTimeFormat = (value) => {
  if(checkValueNull(value)) return value;

  if(value.toString().length !== 6){
    return value;
  }
  var formatData = value.toString().replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
  return formatData;
};

/**
 * 카드번호 포맷팅
 * @param {value} value type of String
 * @return ####-####-####-####
 */
const cardNoFormat = (value) => {
  
  if(checkValueNull(value)) return value;

  if(value.length !== 16){
    return value;
  }
  var formatData = value.replace(/(\d{4})(\d{4})(\d{4})(\d)/, '$1-$2-$3-$4');
  return formatData;
}

/**
 * 전화번호(휴대폰번호) 포맷팅
 * @param {value} value type of String
 * @return 010-1234-5678
 */
const hpFormat = (value) => {

  if(checkValueNull(value)) return value;

  var regexp = '';
  if(value.length === 11){
    regexp = /(\d{3})(\d{4})(\d{4})/;
  }else if(value.length === 10){
    regexp = /(\d{2})(\d{4})(\d{4})/;
  }else{
    return value;
  }
  var formatData = value.replace(regexp, '$1-$2-$3');
  return formatData;
}

/**
 * 금액 포맷팅
 * @param {value} value type of number
 * @return 1,234
 */
const moneyFormat = (value) => {
  if(checkValueNull(value)) return value;
  var formatData = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formatData;
};

/**
 * 사업자번호 포맷팅
 * @param {value} value type of String
 * @return 123-45-67890
 */
const bizNoFormat = (value) => {
  if(checkValueNull(value)) return value;
  if(value.length !== 10){
    return value;
  }
  var formatData = value.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
  return formatData;
};

/******************************************************************************************
 * 데이터 마스킹
 * 포맷팅 대상 : 카드번호, 계좌번호, 전화번호(휴대폰번호포함), 주소, 주민번호
 ******************************************************************************************/ 

/**
 * 카드번호 마스킹타입 포맷팅
 * ==> 16자리 중 7~12자리 마스킹 처리
 * 
 * @param {value} value type of String 
 * @example cardNoMaskFormat('1111222233334444') || cardNoMaskFormat('1111-2222-3333-4444')
 * @return 1111-22**-****-4444
 */
const cardNoMaskFormat = (value) => {
  if(checkValueNull(value)) return value;
  var matchValue = value.match(/(\d{4})-(\d{2})(\d{2})-(\d{4})-(\d{4})/gi);
  if(checkValueNull(matchValue)) {
    if(value.length !== 16){
      return value;
    }
    value = cardNoFormat(value);  
  }

  var formatData = value.toString().replace(value, value.toString().replace(/(\d{4})-(\d{2})(\d{2})-(\d{4})-(\d{4})/gi,'$1-$2**-****-$5'));
  return formatData;
};

/**
 * 전화번호(휴대폰번호) 마스킹타입 포맷팅
 * ==> 중간번호 마스킹 처리
 * 
 * @param {value} value type of String 
 * @example hpMaskFormat('01012345678') || hpMaskFormat('010-1234-5678') || hpMaskFormat('0212345678') || hpMaskFormat('02-1234-5678')
 * @return 010-****-5678
 */
const hpMaskFormat = (value) => {
  if(checkValueNull(value)) return value;
  var regexp = '';
  if(value.replace(/(-)/gi, '').length === 11){
    regexp = /(\d{3})-(\d{4})-(\d{4})/gi;
  }else if(value.replace(/(-)/gi, '').length === 10){
    regexp = /(\d{2})-(\d{4})-(\d{4})/gi;
  }else{
    return value;
  }

  var matchValue = value.match(regexp);
  if(checkValueNull(matchValue)) {
    value = hpFormat(value);  
  }

  var formatData = value.toString().replace(value, value.toString().replace(regexp,'$1-****-$3'));
  return formatData;
};

/**
 * 주민번호 마스킹타입 포맷팅
 * ==> 뒤 첫번째 자리를 제외한 나머지 마스킹 처리 
 * 
 * @param {value} value type of String 
 * @example rnoMaskFormat('870429-2111111')
 * @return 870429-2******
 */
const rnoMaskFormat = (value) => {
  if(checkValueNull(value)) return value;

  var matchValue = value.match(/(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4]{1}[0-9]{6}\b/gi);
  if(checkValueNull(matchValue)) {
    return value;
  }else{
    var maskedData = value.toString().replace(matchValue, matchValue.toString().replace(/(-?)([1-4]{1})([0-9]{6})\b/gi,'$1-$2******'));
    return maskedData;
  }
}

/**
 * 계좌번호 마스킹타입 포맷팅
 * ==> 뒤 4자리 외 마스킹 처리
 * 
 * @param {value} value 
 * @example accountMaskFormat('1002-135-4561548')
 * @return ********1548
 */
const accountMaskFormat = (value) => {
  if(checkValueNull(value)) return value;
  var formatData = '********'.concat(value.substring(value.length-4, value.length));
  return formatData;
}

/**
 * 주소 마스킹타입 포맷팅
 * ==> 시, 구 외 마스킹 처리
 * 
 * @param {value} value 
 * @example addrMaskFormat('서울시 성동구 성수이로20길 16')
 * @return 서울시 성동구 *********
 */
const addrMaskFormat = (value) => {
  
  if(checkValueNull(value)) return value;

  // 필요할경우 작성
  
  return value;
}


/**
 * 암호화 모듈 (aes-256-cbc 방식)
 */
const encrypt = (inputString) => {
  
  if(checkValueNull(inputString)) return inputString;

  let result = '';

  try {
    const cipher = crypto.createCipheriv('aes-256-cbc', 'l7d65ce8aada674fafa4b82fa437948130');
    result = cipher.update(inputString, 'utf8', 'base64'); // 'HbMtmFdroLU0arLpMflQ'
    result += cipher.final('base64'); // 'HbMtmFdroLU0arLpMflQYtt8xEf4lrPn5tX5k+a8Nzw='
  } catch (error) {
    result = inputString;
  }

  return result;  
}


/**
 * 복호화 모듈 (aes-256-cbc 방식)
 */
const decrypt  = (inputString) => {

  if(checkValueNull(inputString)) return inputString;

  let result = '';

  try {
    const decipher = crypto.createDecipheriv('aes-256-cbc', 'l7d65ce8aada674fafa4b82fa437948130');
    result = decipher.update(inputString, 'base64', 'utf8'); // 암호화할문 (base64, utf8이 위의 cipher과 반대 순서입니다.)
    result += decipher.final('utf8'); // 암호화할문장 (여기도 base64대신 utf8)
  } catch (error) {
    result = inputString;
  }

  return result;  
}

/**
 * 요일 구하기
 * YYYYMMDD string 타입
 */
const getDayOfTheWeek = (baseDate) => {
  const week = new Array('일', '월', '화', '수', '목', '금', '토');
  
  const today = new Date(dateFormatDefault(baseDate)).getDay();
  var todayLabel = week[today];
  
  return todayLabel;
}

/**
 * nvl
 * value가 null or empty or undefined일 경우 '' 리턴
 */
const nvlDefault = (value) => {
  if(checkValueNull(value)) {
    return '';
  }else {
    return value;
  }
}

/**
 * 년월 기본 포맷팅 (yyyy-MM)
 * @param {value} value 
 * @return yyyy-MM-dd
 */
const yyyyMMFormatDefault = (value) => {
  if(checkValueNull(value)) return value;
  return yyyyMMFormat(value, 'yyyy-MM');
};

/**
 * 년월 포맷팅
 * @param {value} value (typeof Date || String(yyyyMMdd || yyyy-MM))
 * @param {format} format 
 * @example dateFormat(new Date(), 'yyyy/MM) || dateFormat('2020.01', 'yyyy.MM') || dateFormat('202001', 'yyyy-MM')
 * @return input Format
 */
const yyyyMMFormat = (value, format) => { 

  if(checkValueNull(value)) return value;

  var dateVal = new Date();
  
  if(value instanceof String || (typeof value) == 'string'){
    var matchValue = value.match(/(\d{4})-(\d{2})/gi);
    if(checkValueNull(matchValue)){
      var customDate = value.replace(/(\d{4})(\d{2})/, '$1-$2');
      dateVal = new Date(customDate);
    }else{
      dateVal = new Date(value);
    }
  }else if(value instanceof Date || (typeof value) == 'object'){
    dateVal = value;
  }

  if(checkValueNull(format)){
    format = 'yyyy-MM';
  }

  return formatDate(dateVal, format);
};

export default {
  checkValueNull,
  dateFormatDefault,
  dateFormat,
  dateTimeFormat,
  cardNoFormat,
  hpFormat,
  moneyFormat,
  bizNoFormat,
  cardNoMaskFormat,
  hpMaskFormat,
  rnoMaskFormat,
  accountMaskFormat,
  addrMaskFormat,
  encrypt,
  decrypt,
  getDayOfTheWeek,
  nvlDefault,
  yyyyMMFormatDefault  
};
