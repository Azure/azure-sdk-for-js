// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getPagedAsyncIterator, PagedAsyncIterableIterator, PagedResult } from "@azure/core-paging";
import { Client, createRestError, PathUncheckedResponse } from "@azure-rest/core-client";

/**
 * Helper type to extract the type of an array
 */
export type GetArrayType<T> = T extends Array<infer TData> ? TData : never;

/**
 * The type of a custom function that defines how to get a page and a link to the next one if any.
 */
export type GetPage<TPage> = (
  pageLink: string,
  maxPageSize?: number
) => Promise<{
  page: TPage;
  nextPageLink?: string;
}>;

/**
 * Options for the paging helper
 */
export interface PagingOptions<TResponse> {
  /**
   * Custom function to extract pagination details for crating the PagedAsyncIterableIterator
   */
  customGetPage?: GetPage<PaginateReturn<TResponse>[]>;
}

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
 * Helper to paginate results from an initial response that follows the specification of Autorest `x-ms-pageable` extension
 * @param client - Client to use for sending the next page requests
 * @param initialResponse - Initial response containing the nextLink and current page of elements
 * @param customGetPage - Optional - Function to define how to extract the page and next link to be used to paginate the results
 * @returns - PagedAsyncIterableIterator to iterate the elements
 */
export function paginate<TResponse extends PathUncheckedResponse>(
  client: Client,
  initialResponse: TResponse,
  options: PagingOptions<TResponse> = {}
): PagedAsyncIterableIterator<PaginateReturn<TResponse>> {
  // Extract element type from initial response
  type TElement = PaginateReturn<TResponse>;
  let firstRun = true;
  const itemName = "value";
  const nextLinkName = "nextLink";
  const { customGetPage } = options;
  const pagedResult: PagedResult<TElement[]> = {
    firstPageLink: "",
    getPage:
      typeof customGetPage === "function"
        ? customGetPage
        : async (pageLink: string) => {
            const result = firstRun ? initialResponse : await client.pathUnchecked(pageLink).get();
            firstRun = false;
            checkPagingRequest(result);
            const nextLink = getNextLink(result.body, nextLinkName);
            const values = getElements<TElement>(result.body, itemName);
            return {
              page: values,
              nextPageLink: nextLink,
            };
          },
  };

  return getPagedAsyncIterator(pagedResult);
}

/**
 * Gets for the value of nextLink in the body
 */
function getNextLink(body: unknown, nextLinkName?: string): string | undefined {
  if (!nextLinkName) {
    return undefined;
  }

  const nextLink = (body as Record<string, unknown>)[nextLinkName];

  if (typeof nextLink !== "string" && typeof nextLink !== "undefined") {
    throw new Error(`Body Property ${nextLinkName} should be a string or undefined`);
  }

  return nextLink;
}

/**
 * Gets the elements of the current request in the body.
 */
function getElements<T = unknown>(body: unknown, itemName: string): T[] {
  const value = (body as Record<string, unknown>)[itemName] as T[];

  // value has to be an array according to the x-ms-pageable extension.
  // The fact that this must be an array is used above to calculate the
  // type of elements in the page in PaginateReturn
  if (!Array.isArray(value)) {
    throw new Error(
      `Couldn't paginate response\n Body doesn't contain an array property with name: ${itemName}`
    );
  }

  return value ?? [];
}

/**
 * Checks if a request failed
 */
function checkPagingRequest(response: PathUncheckedResponse): void {
  const Http2xxStatusCodes = ["200", "201", "202", "203", "204", "205", "206", "207", "208", "226"];
  if (!Http2xxStatusCodes.includes(response.status)) {
    throw createRestError(
      `Pagination failed with unexpected statusCode ${response.status}`,
      response
    );
  }
}
