// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";

/**
 * an interface that describes how to communicate with the service and how to build a page of items.
 */
export interface PagedResult<
  TOptions extends Record<string, any>,
  TElement,
  TResponse,
  TPage extends Array<TElement>
> {
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
  TPage extends Array<TElement>
>(
  pagedResult: PagedResult<TOptions, TElement, TResponse, TPage>,
  path: string,
  options: TOptions
): PagedAsyncIterableIterator<TElement> {
  const iter = getItems(pagedResult, path, options);
  return {
    next() {
      return iter.next();
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    byPage: (settings?: PageSettings) => {
      const pageOptions = { ...options, top: settings?.maxPageSize };
      return retrievePages(pagedResult, path, pageOptions);
    }
  };
}

async function* getItems<
  TOptions extends Record<string, unknown>,
  TResponse,
  TElement,
  TPage extends Array<TElement>
>(
  pagedResult: PagedResult<TOptions, TElement, TResponse, TPage>,
  path: string,
  options: TOptions
): AsyncIterableIterator<TElement> {
  for await (const page of retrievePages(pagedResult, path, options)) {
    yield* page;
  }
}

async function* retrievePages<
  TOptions extends Record<string, unknown>,
  TResponse,
  TElement,
  TPage extends Array<TElement>
>(
  pagedResult: PagedResult<TOptions, TElement, TResponse, TPage>,
  path: string,
  options: TOptions
): AsyncIterableIterator<TPage> {
  let response = await retrievePage(pagedResult, path, options);
  yield response.result;
  while (response.nextLink) {
    response = await retrievePage(pagedResult, response.nextLink, options);
    yield response.result;
  }
}

const DEFAULT_CONTINUATION_LINKs_NAMES: Set<string> = new Set(["continuationToken", "nextLink"]);

function getDefaultNextLink<TResponse>(response: TResponse): string | undefined {
  for (const name of DEFAULT_CONTINUATION_LINKs_NAMES) {
    const nextLink = (response as any)[name] as string | undefined;
    if (nextLink) return nextLink;
  }
  return undefined;
}

interface ResultWithPaging<TElement, TPage extends Array<TElement>> {
  result: TPage;
  nextLink?: string;
}

async function retrievePage<
  TOptions extends Record<string, unknown>,
  TResponse,
  TElement,
  TPage extends Array<TElement>
>(
  pagedResult: PagedResult<TOptions, TElement, TResponse, TPage>,
  path: string,
  options: TOptions
): Promise<ResultWithPaging<TElement, TPage>> {
  const response = await pagedResult.sendGetRequest(path, options);
  const result = pagedResult.buildPage?.(response) ?? (response as any).results;
  const getNextLink = pagedResult.getNextLink ?? getDefaultNextLink;
  return {
    result,
    nextLink: getNextLink(response)
  };
}
