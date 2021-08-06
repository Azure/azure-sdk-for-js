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
  TGetRequestOptions,
  TResponse,
  TElement,
  TPage = TElement[],
  TPageSettings = PageSettings
>(
  pagedResult: PagedResult<TGetRequestOptions, TResponse>,
  path: string,
  getRequestOptions: TGetRequestOptions,
  options?: PagedAsyncIteratorOptions<TResponse, TPage, TPageSettings>
): PagedAsyncIterableIterator<TElement, TPage, TPageSettings> {
  const iter = getItemAsyncIterator<TGetRequestOptions, TResponse, TElement, TPage, TPageSettings>(
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

async function* getItemAsyncIterator<TGetRequestOptions, TResponse, TElement, TPage, TPageSettings>(
  pagedResult: PagedResult<TGetRequestOptions, TResponse>,
  path: string,
  getRequestOptions: TGetRequestOptions,
  options?: PagedAsyncIteratorOptions<TResponse, TPage, TPageSettings>
): AsyncIterableIterator<TElement> {
  const metaInfo = { isArray: false };
  const pages = getPageAsyncIterator(pagedResult, path, getRequestOptions, options, metaInfo);
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

async function* getPageAsyncIterator<TGetRequestOptions, TResponse, TPage, TPageSettings>(
  pagedResult: PagedResult<TGetRequestOptions, TResponse>,
  path: string,
  getRequestOptions: TGetRequestOptions,
  options?: PagedAsyncIteratorOptions<TResponse, TPage, TPageSettings>,
  metaInfo: { isArray: boolean } = { isArray: true }
): AsyncIterableIterator<TPage> {
  let response = await retrievePage<TGetRequestOptions, TResponse, TPage, TPageSettings>(
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

async function retrievePage<TGetRequestOptions, TResponse, TPage, TPageSettings>(
  pagedResult: PagedResult<TGetRequestOptions, TResponse>,
  path: string,
  getRequestOptions: TGetRequestOptions,
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
