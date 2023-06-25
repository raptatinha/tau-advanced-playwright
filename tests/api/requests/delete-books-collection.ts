import { APIRequestContext } from '@playwright/test';
import { buildUrl } from '../../utils/apiUrlBuilder';
import { executeRequest } from '../../utils/apiRequestUtils';
import endpoints from '../../utils/apiEndpoints';
import methods from '../../utils/apiMethods';

async function deleteAllBooksByUser(apiContext: APIRequestContext, userId: string) {
  const method = methods.delete;
  const requestOptions = {};
  const requestUrl = buildUrl(endpoints.books.delete, userId);
  const response = await executeRequest(apiContext, requestUrl, method, requestOptions);
}

async function deleteBookAPIByIsbn(apiContext: APIRequestContext, userId: string, isbn: string) {
  const method = methods.delete;
  const requestOptions = { data: { isbn: isbn, userId: userId }};
  const requestUrl = buildUrl(endpoints.books.delete);
  const response = await executeRequest(apiContext, requestUrl, method, requestOptions);
}

export default { deleteAllBooksByUser, deleteBookAPIByIsbn };
