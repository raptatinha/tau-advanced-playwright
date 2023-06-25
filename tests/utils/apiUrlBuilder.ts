import apiPath from './apiPaths';
import baseAPIUrl from './environmentBaseUrl';
import endpoints from './apiEndpoints';

function bindUrl(endpoint: string, env: string, userId?: string, isbn?: string) {
  const parts = endpoint.replace(/\/.+$/, '').split('.');
  
  const endpointParts = parts.map((part) => {
    switch (part) {
      case 'api':
        return baseAPIUrl[env].api;
      default:
          return apiPath[part] ?? '/';
    }
  });
        
  if (endpoint === endpoints.account.get) {
    endpointParts.push(userId);
  }
  if (endpoint === endpoints.books.put) {
    endpointParts.push(isbn);
  }

  return endpointParts.join('/');
}

function searchParamsForUrl(page: string, userId?: string) {
  let queryParams;

  switch (page) {
    case endpoints.books.delete:
      queryParams = { UserId: userId };;
      break;
    default:
      queryParams = {};
  }

  return new URLSearchParams(queryParams).toString();
}

export function buildUrl(endpoint: string, userId?: string, isbn?: string) {
  const env = process.env.ENV!;
  const url = [
    bindUrl(endpoint, env, userId, isbn),
    searchParamsForUrl(endpoint, userId),
  ]
  .filter(Boolean)
  .join('?');
  
  return url;
}

/**
  * endpoint  api.books/delete
  * parts  [ 'api', 'books' ]
  * endpointParts  [ 'https://demoqa.com', 'BookStore/v1/Books' ]
  * endpointParts join  https://demoqa.com/BookStore/v1/Books
  * queryParams { UserId: '1117e3d4-9f6e-45a7-a8a9-db3ecf7b9603' }
  * url  https://demoqa.com/BookStore/v1/Books?UserId=1117e3d4-9f6e-45a7-a8a9-db3ecf7b9603
 */
