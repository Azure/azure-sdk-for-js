// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { Client, HttpResponse, PathUncheckedResponse } from "./";
import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

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
   */
  nextLinkName?: string;
  /**
   * Indicates the name of the property in which the set of values is found. Default: `value`
   */
  itemName?: string;
}

/**
 *
 * @param client - Client to use for sending the request to get additional pages
 * @param initialResponse - The initial response
 * @param options - Options to use custom property names for pagination
 * @returns - return a PagedAsyncIterableIterator that can be used to iterate the elements
 */
export function paginateResponse<TReturn>(
  client: Client,
  initialResponse: HttpResponse,
  options: PaginateOptions = {}
): PagedAsyncIterableIterator<TReturn, TReturn[]> {
  const iter = listAll<TReturn>(client, initialResponse, options);
  return {
    next() {
      return iter.next();
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    byPage: () => {
      return listPage<TReturn>(client, initialResponse, options);
    },
  };
}

async function* listAll<T>(
  client: Client,
  initialResponse: PathUncheckedResponse,
  paginateOptions: PaginateOptions
): AsyncIterableIterator<T> {
  for await (const page of listPage<T>(client, initialResponse, paginateOptions)) {
    yield* page;
  }
}

async function* listPage<T = Record<string, unknown>[]>(
  client: Client,
  initialResponse: PathUncheckedResponse,
  options: PaginateOptions
): AsyncIterableIterator<T[]> {
  let result = initialResponse;
  checkPagingRequest(result);
  let nextLink = getNextLink(result.body, options);
  let values = getElements<T>(result.body, options);

  yield values;

  while (nextLink) {
    result = await client.pathUnchecked(nextLink).get();
    checkPagingRequest(result);
    nextLink = getNextLink(result.body, options);
    values = getElements<T>(result.body, options);
    yield values;
  }
}

/**
 * Checks if a request failed
 */
function checkPagingRequest(response: PathUncheckedResponse) {
  if (!Http2xxStatusCodes.includes(response.status)) {
    throw (
      response.body?.error ?? {
        message: `Pagination failed`,
        request: response.request,
        response: response,
        status: response.status,
      }
    );
  }
}

/**
 * Gets for the value of nextLink in the body. If a custom nextLinkName was provided, it will be used instead of default
 */
function getNextLink(body: Record<string, unknown>, paginateOptions: PaginateOptions = {}) {
  const nextLinkName = paginateOptions.nextLinkName ?? DEFAULT_NEXTLINK;
  return (body[nextLinkName] as string) ?? undefined;
}

/**
 * Gets the elements of the current request in the body. By default it will look in the `value` property unless
 * a different value for itemName has been provided as part of the options.
 */
function getElements<T = unknown>(
  body: Record<string, unknown>,
  paginateOptions: PaginateOptions = {}
): T[] {
  const valueName = paginateOptions?.itemName ?? DEFAULT_VALUES;
  return (body[valueName] as T[]) ?? [];
}
