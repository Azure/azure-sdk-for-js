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
  nextLinkName?: string[] | string | null;
  /**
   * Indicates the name of the property in which the set of values is found. Default: `value`
   */
  itemName?: string | string[];
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
  // Build a set with the passed custom nextLinkName or array of names
  let nextLinkNames = new Set(paginateOptions.nextLinkName ?? DEFAULT_NEXTLINK);
  // Add the default nextLinkName if it doesn't exist yet
  nextLinkNames.add(DEFAULT_NEXTLINK);

  let nextLink: string | undefined;

  // Loop through the known nextLink names to find it in the body.
  for (const nextLinkName of nextLinkNames) {
    nextLink = (body as Record<string, unknown>)[nextLinkName] as string;
    if (nextLink) {
      break;
    }
  }

  if (typeof nextLink !== "string" && typeof nextLink !== "undefined") {
    throw new Error(
      `Couldn't paginate response\nBody should contain a property named ${[...nextLinkNames].join(
        " or "
      )} which points to the next page.`
    );
  }

  return nextLink;
}

/**
 * Gets the elements of the current request in the body. By default it will look in the `value` property unless
 * a different value for itemName has been provided as part of the options.
 */
function getElements<T = unknown>(body: unknown, paginateOptions: PaginateOptions = {}): T[] {
  // Build a set with the passed custom itemName or array of names
  let valueNames = new Set(paginateOptions.itemName ?? DEFAULT_VALUES);
  // Add the default itemName if it doesn't exist yet
  valueNames.add(DEFAULT_VALUES);
  let value: unknown;

  // Loop through the known itemNames names to find it in the body.
  for (const valueName of valueNames) {
    const currentValue = (body as Record<string, unknown>)[valueName];
    if (Array.isArray(currentValue)) {
      value = currentValue;
      break;
    }
  }

  if (!value) {
    throw new Error(
      `Couldn't paginate response\n Body doesn't contain an array property with name: ${[
        ...valueNames,
      ].join(" OR ")}`
    );
  }

  return (value as T[]) ?? [];
}
