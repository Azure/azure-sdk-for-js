// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { paginateResponse, PagedAsyncIterableIterator } from "@azure-rest/core-client-paging";
import { Client, PathUncheckedResponse } from "@azure-rest/core-client";

/**
 * Helper type to extract the type of an array
 */
export type GetArrayType<T> = T extends Array<infer TData> ? TData : never;

/**
 * Helper type to infer the Type of the paged elements from the response type
 * This type is generated based on the swagger information for x-ms-pageable
 * specifically on the itemName property which indicates the property of the response
 * where the page items are found. The default value is `value`.
 * This type will allow us to provide strongly typed Iterator based on the response we get as second parameter
 */
export type PaginateReturn<TResult> = TResult extends {
  body: { value?: infer TPage };
}
  ? GetArrayType<TPage>
  : Array<unknown>;

/**
 * This is the wrapper function that would be exposed. It is hiding the Pagination Options because it can be
 * obtained from the swagger
 * @param client - Client to use for sending the next page requests
 * @param initialResponse - Initial response containing the nextLink and current page of elements
 * @returns - PagedAsyncIterableIterator to iterate the elements
 */
export function paginate<TReturn extends PathUncheckedResponse>(
  client: Client,
  initialResponse: TReturn
): PagedAsyncIterableIterator<PaginateReturn<TReturn>, PaginateReturn<TReturn>[]> {
  return paginateResponse<PaginateReturn<TReturn>>(client, initialResponse);
}
