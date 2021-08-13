// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  Client,
  createRestError,
  HttpResponse,
  PathUncheckedResponse,
} from "@azure-rest/core-client";
import { getPagedAsyncIterator, PagedAsyncIterableIterator, PagedResult } from "@azure/core-paging";

const Http2xxStatusCodes = ["200", "201", "202", "203", "204", "205", "206", "207", "208", "226"];

const DEFAULT_NEXTLINK = "nextLink";
const DEFAULT_VALUES = "value";

/**
 * Options to indicate custom values for where to look for nextLink and values
 * when paginating a response
 */
export interface PaginateOptions {
  /**
   * Property name in the body where the nextLink is located
   * The default value is `nextLink`.
   * nextLink is an opaque URL for the client, in which the next set of results is located.
   * Note: if nextLinkName is set to `null` only the first page is returned, no additional
   * requests are made.
   */
  nextLinkName?: string | null;
  /**
   * Indicates the name of the property in which the set of values is found. Default: `value`
   */
  itemName?: string;
}

/**
 * Helper to iterate pageable responses
 * @param client - Client to use for sending the request to get additional pages
 * @param initialResponse - The initial response
 * @param options - Options to use custom property names for pagination
 * @returns - return a PagedAsyncIterableIterator that can be used to iterate the elements
 */
export function paginateResponse<TElement>(
  client: Client,
  initialResponse: HttpResponse,
  options: PaginateOptions = {}
): PagedAsyncIterableIterator<TElement> {
  let firstRun = true;
  const pagedResult: PagedResult<TElement[]> = {
    firstPageLink: "",
    async getPage(pageLink: string) {
      const result = firstRun ? initialResponse : await client.pathUnchecked(pageLink).get();
      firstRun = false;
      checkPagingRequest(result);
      const nextLink = getNextLink(result.body, options);
      const values = getElements<TElement>(result.body, options);
      return {
        page: values,
        // According to x-ms-pageable is the nextLinkName is set to null we should only
        // return the first page and skip any additional queries even if the initial response
        // contains a nextLink.
        nextPageLink: options.nextLinkName === null ? undefined : nextLink,
      };
    },
  };
  return getPagedAsyncIterator(pagedResult);
}

/**
 * Checks if a request failed
 */
function checkPagingRequest(response: PathUncheckedResponse): void {
  if (!Http2xxStatusCodes.includes(response.status)) {
    throw createRestError(
      `Pagination failed with unexpected statusCode ${response.status}`,
      response
    );
  }
}

/**
 * Gets for the value of nextLink in the body. If a custom nextLinkName was provided, it will be used instead of default
 */
function getNextLink(body: unknown, paginateOptions: PaginateOptions = {}): string | undefined {
  const nextLinkName = paginateOptions.nextLinkName ?? DEFAULT_NEXTLINK;
  const nextLink = (body as Record<string, unknown>)[nextLinkName];

  if (typeof nextLink !== "string" && typeof nextLink !== "undefined") {
    throw new Error(`Body Property ${nextLinkName} should be a string or undefined`);
  }

  return nextLink;
}

/**
 * Gets the elements of the current request in the body. By default it will look in the `value` property unless
 * a different value for itemName has been provided as part of the options.
 */
function getElements<T = unknown>(body: unknown, paginateOptions: PaginateOptions = {}): T[] {
  const valueName = paginateOptions?.itemName ?? DEFAULT_VALUES;
  const value = (body as Record<string, unknown>)[valueName];

  if (!Array.isArray(value)) {
    throw new Error(`Body Property ${valueName} is not an array`);
  }

  return (value as T[]) ?? [];
}
