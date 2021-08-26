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
  nextLinkNames?: string[] | null;
  /**
   * Indicates the name of the property in which the set of values is found. Default: `value`
   */
  itemNames?: string[];
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
  const { itemName, nextLinkName } = getPaginationProperties(initialResponse, options);
  const pagedResult: PagedResult<TElement[]> = {
    firstPageLink: "",
    async getPage(pageLink: string) {
      const result = firstRun ? initialResponse : await client.pathUnchecked(pageLink).get();
      firstRun = false;
      checkPagingRequest(result);
      const nextLink = getNextLink(result.body, nextLinkName);
      const values = getElements<TElement>(result.body, itemName);
      return {
        page: values,
        // According to x-ms-pageable is the nextLinkNames is set to null we should only
        // return the first page and skip any additional queries even if the initial response
        // contains a nextLink.
        nextPageLink: options.nextLinkNames === null ? undefined : nextLink,
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
 * Extracts the itemName and nextLinkName from the initial response to use them for pagination
 */
function getPaginationProperties(initialResponse: HttpResponse, options: PaginateOptions = {}) {
  // Build a set with the passed custom nextLinkNames
  const nextLinkNames = new Set(options.nextLinkNames ?? DEFAULT_NEXTLINK);
  // Add the default nextLinkName if it doesn't exist yet
  nextLinkNames.add(DEFAULT_NEXTLINK);

  // Build a set with the passed custom set of itemNames
  const itemNames = new Set(options.itemNames ?? DEFAULT_VALUES);
  // Add the default itemName if it doesn't exist yet
  itemNames.add(DEFAULT_VALUES);

  let nextLinkName: string | undefined;
  let itemName: string | undefined;

  for (const name of nextLinkNames) {
    const nextLink = (initialResponse.body as Record<string, unknown>)[name] as string;
    if (nextLink) {
      nextLinkName = name;
      break;
    }
  }

  for (const name of itemNames) {
    const item = (initialResponse.body as Record<string, unknown>)[name] as string;
    if (item) {
      itemName = name;
      break;
    }
  }

  if (!itemName) {
    throw new Error(
      `Couldn't paginate response\n Body doesn't contain an array property with name: ${[
        ...itemNames,
      ].join(" OR ")}`
    );
  }

  return { itemName, nextLinkName };
}

/**
 * Gets for the value of nextLink in the body. If a custom nextLinkNames was provided, it will be used instead of default
 */
function getNextLink(body: unknown, nextLinkName?: string): string | undefined {
  // It is possible to get an undefined for nextLinkName, in the scenario where the initial response contains the last page.
  const nextLink =
    nextLinkName === undefined
      ? undefined
      : ((body as Record<string, unknown>)[nextLinkName] as string);

  return nextLink;
}

/**
 * Gets the elements of the current request in the body. By default it will look in the `value` property unless
 * a different value for itemNames has been provided as part of the options.
 */
function getElements<T = unknown>(body: unknown, itemName: string): T[] {
  const value = (body as Record<string, unknown>)[itemName];

  if (!Array.isArray(value)) {
    throw new Error(
      `Couldn't paginate response\n Body doesn't contain an array property with name: ${itemName}`
    );
  }

  return (value as T[]) ?? [];
}
