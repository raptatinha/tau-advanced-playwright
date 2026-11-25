import uiPages from '../utils/uiPages';

export function buildUrl(page: string, params?: Record<any, any>) {
  const uiPath = uiPages[page];
    
  const qParams = new URLSearchParams(params);
  
  const url = params
  ? `${uiPath.concat('?')}${qParams.toString()}`
  : uiPath;

  /**
    * page  bookStore
    * uiPath  /books
    * params  { search: '9781449337711' }
    * qParams  URLSearchParams { 'search' => '9781449337711' }
    * url  /books?search=9781449337711
  */

  return url;
}
