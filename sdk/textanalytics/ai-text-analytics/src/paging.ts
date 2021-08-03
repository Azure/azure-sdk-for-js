// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";

/**
 * an interface that describes how to communicate with the service and how to build a page of items.
 */
export interface PagedResult<TOptions extends Record<string, any>, TResponse, TPage> {
  /**
   * A method that send a GET request to the service and returns a response.
   */
  sendGetRequest: (path: string, options: TOptions) => Promise<TResponse>;
  /**
   * A method that extracts the link to the next page of results from the response.
   */
  getNextLink?: (response: TResponse) => string | undefined;
  /**
   * A method to build a page of items from the response.
   */
  buildPage?: (response: TResponse) => TPage;
}

/**
 * @internal
 *
 * returns an async iterator that will retrieve items from the server. It also has a `byPage`
 * method that can return pages of items at once.
 *
 * @param pagedResult - an object that describes how to communicate with the service and how to build a page of items.
 * @param path - the path to the resource to retrieve
 * @param options - the options to pass to the service
 * @returns a paged async iterator that will retrieve items from the server.
 */
export function getPagedAsyncIterator<
  TOptions extends Record<string, any>,
  TResponse,
  TElement,
  TPage = TElement[]
>(
  pagedResult: PagedResult<TOptions, TResponse, TPage>,
  path: string,
  options: TOptions
): PagedAsyncIterableIterator<TElement, TPage> {
  const iter = getItemAsyncIterator<TOptions, TResponse, TElement, TPage>(
    pagedResult,
    path,
    options
  );
  return {
    next() {
      return iter.next();
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    byPage: (settings?: PageSettings) => {
      const pageOptions = { ...options, top: settings?.maxPageSize };
      return getPageAsyncIterator(pagedResult, path, pageOptions);
    }
  };
}

async function* getItemAsyncIterator<
  TOptions extends Record<string, unknown>,
  TResponse,
  TElement,
  TPage
>(
  pagedResult: PagedResult<TOptions, TResponse, TPage>,
  path: string,
  options: TOptions
): AsyncIterableIterator<TElement> {
  const metaInfo = { isArray: false };
  const pages = getPageAsyncIterator(pagedResult, path, options, metaInfo);
  const firstVal = await pages.next();
  // if the result does not have an array shape, i.e. TPage = TElement, then we return it as is
  if (!metaInfo.isArray) {
    yield firstVal.value;
    yield* (pages as unknown) as AsyncIterableIterator<TElement>;
  } else {
    yield* firstVal.value;
    for await (const page of pages) {
      yield* page as any;
    }
  }
}

async function* getPageAsyncIterator<TOptions extends Record<string, unknown>, TResponse, TPage>(
  pagedResult: PagedResult<TOptions, TResponse, TPage>,
  path: string,
  options: TOptions,
  metaInfo: { isArray: boolean } = { isArray: true }
): AsyncIterableIterator<TPage> {
  let response = await retrievePage<TOptions, TResponse, TPage>(pagedResult, path, options);
  metaInfo.isArray = Array.isArray(response.result);
  yield response.result;
  while (response.nextLink) {
    response = await retrievePage(pagedResult, response.nextLink, options);
    yield response.result;
  }
}

function getDefaultNextLink<TResponse>(response: TResponse): string | undefined {
  return (response as any).nextLink;
}

interface ResultWithPaging<TPage> {
  result: TPage;
  nextLink?: string;
}

async function retrievePage<TOptions extends Record<string, unknown>, TResponse, TPage>(
  pagedResult: PagedResult<TOptions, TResponse, TPage>,
  path: string,
  options: TOptions
): Promise<ResultWithPaging<TPage>> {
  const response = await pagedResult.sendGetRequest(path, options);
  const result: TPage = pagedResult.buildPage?.(response) ?? (response as any).results;
  const getNextLink = pagedResult.getNextLink ?? getDefaultNextLink;
  return {
    result,
    nextLink: getNextLink(response)
  };
}
