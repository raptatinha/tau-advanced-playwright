import { APIRequestContext } from '@playwright/test';
import { buildUrl } from '../../utils/apiUrlBuilder';
import { executeRequest } from '../../utils/apiRequestUtils';
import endpoints from '../../utils/apiEndpoints';
import methods from '../../utils/apiMethods';

async function addBookToCollection(apiContext: APIRequestContext, userId: string, isbn: string) {
  const method = methods.post;
  const requestOptions = { data: { userId: userId, collectionOfIsbns: [ {isbn: isbn} ] }};
  const requestUrl = buildUrl(endpoints.books.post, userId, isbn);
  const response = await executeRequest(apiContext, requestUrl, method, requestOptions);
}

export default { addBookToCollection };
