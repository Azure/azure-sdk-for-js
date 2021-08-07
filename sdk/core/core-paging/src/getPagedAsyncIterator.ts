// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PagedAsyncIterableIterator,
  PageSettings,
  PagedResult,
  PagedAsyncIteratorOptions
} from "./models";

/**
 * returns an async iterator that will retrieve items from the server. It also has a `byPage`
 * method that can return pages of items at once.
 *
 * @param pagedResult - an object that describes how to communicate with the service and how to build a page of items.
 * @param path - the path to the resource to retrieve
 * @param getRequestOptions - the options to pass to the service
 * @returns a paged async iterator that will retrieve items from the server.
 */
export function getPagedAsyncIterator<
  TFetchPageOptions,
  TResponse,
  TElement,
  TPage = TElement[],
  TPageSettings = PageSettings
>(
  pagedResult: PagedResult<TFetchPageOptions, TResponse>,
  path: string,
  getRequestOptions: TFetchPageOptions,
  options?: PagedAsyncIteratorOptions<TResponse, TPage, TPageSettings>
): PagedAsyncIterableIterator<TElement, TPage, TPageSettings> {
  const iter = getItemAsyncIterator<TFetchPageOptions, TResponse, TElement, TPage, TPageSettings>(
    pagedResult,
    path,
    getRequestOptions,
    options
  );
  return {
    next() {
      return iter.next();
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    byPage:
      options?.byPage ??
      ((settings?: PageSettings) => {
        const pageOptions = { ...getRequestOptions };
        (pageOptions as Record<string, unknown>)[options?.maxPageSizeParam ?? "top"] =
          settings?.maxPageSize;
        return getPageAsyncIterator(
          pagedResult,
          settings?.continuationToken ?? path,
          pageOptions,
          options
        );
      })
  };
}

async function* getItemAsyncIterator<TFetchPageOptions, TResponse, TElement, TPage, TPageSettings>(
  pagedResult: PagedResult<TFetchPageOptions, TResponse>,
  path: string,
  getRequestOptions: TFetchPageOptions,
  options?: PagedAsyncIteratorOptions<TResponse, TPage, TPageSettings>
): AsyncIterableIterator<TElement> {
  const metaInfo = { isArray: false };
  const pages = getPageAsyncIterator<TFetchPageOptions, TResponse, TPage, TPageSettings>(
    pagedResult,
    path,
    getRequestOptions,
    options,
    metaInfo
  );
  const firstVal = await pages.next();
  // if the result does not have an array shape, i.e. TPage = TElement, then we return it as is
  if (!metaInfo.isArray) {
    yield firstVal.value;
    // `pages` is of type `AsyncIterableIterator<TPage>` but TPage = TElement in this case
    yield* (pages as unknown) as AsyncIterableIterator<TElement>;
  } else {
    yield* firstVal.value;
    for await (const page of pages) {
      // pages is of type `AsyncIterableIterator<TPage>` so `page` is of type `TPage`. In this branch,
      // it must be the case that `TPage = TElement[]`
      yield* (page as unknown) as TElement[];
    }
  }
}

async function* getPageAsyncIterator<TFetchPageOptions, TResponse, TPage, TPageSettings>(
  pagedResult: PagedResult<TFetchPageOptions, TResponse>,
  path: string,
  getRequestOptions: TFetchPageOptions,
  options?: PagedAsyncIteratorOptions<TResponse, TPage, TPageSettings>,
  metaInfo: { isArray: boolean } = { isArray: true }
): AsyncIterableIterator<TPage> {
  let response = await retrievePage<TFetchPageOptions, TResponse, TPage, TPageSettings>(
    pagedResult,
    path,
    getRequestOptions,
    options
  );
  metaInfo.isArray = Array.isArray(response.result);
  yield response.result;
  while (response.nextLink) {
    response = await retrievePage(pagedResult, response.nextLink, getRequestOptions, options);
    yield response.result;
  }
}

function getDefaultNextLink(response: any): string | undefined {
  return response.nextLink;
}

interface ResultWithPaging<TPage> {
  result: TPage;
  nextLink?: string;
}

async function retrievePage<TFetchPageOptions, TResponse, TPage, TPageSettings>(
  pagedResult: PagedResult<TFetchPageOptions, TResponse>,
  path: string,
  getRequestOptions: TFetchPageOptions,
  options?: PagedAsyncIteratorOptions<TResponse, TPage, TPageSettings>
): Promise<ResultWithPaging<TPage>> {
  const response = await pagedResult.fetchPage(path, getRequestOptions);
  const result: TPage = options?.processPage?.(response) ?? (response as any).results;
  const getNextLink = options?.getNextLink ?? getDefaultNextLink;
  return {
    result,
    nextLink: getNextLink(response)
  };
}
