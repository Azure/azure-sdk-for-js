// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PagedAsyncIterableIterator,
  PageSettings,
  PagedResult,
  GetPagedAsyncIteratorOptions
} from "./models";

/**
 * returns an async iterator that will retrieve items from the server. It also has a `byPage`
 * method that can return pages of items at once.
 *
 * @param pagedResult - an object that has one method, `getPage`, which returns one page of results along with a link to the next one.
 * @param link - the link to a page of results, typically the first one.
 * @param options - the options of the `getPagedAsyncIterator` function.
 * @returns a paged async iterator that will retrieve items from the server.
 */
export function getPagedAsyncIterator<TElement, TPage = TElement[], TPageSettings = PageSettings>(
  pagedResult: PagedResult<TPage>,
  link: string,
  options?: GetPagedAsyncIteratorOptions<TPage, TPageSettings>
): PagedAsyncIterableIterator<TElement, TPage, TPageSettings> {
  const iter = getItemAsyncIterator<TElement, TPage>(pagedResult, link);
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
        return getPageAsyncIterator(pagedResult, link, settings?.maxPageSize);
      })
  };
}

async function* getItemAsyncIterator<TElement, TPage>(
  pagedResult: PagedResult<TPage>,
  link: string,
  maxPageSize?: number
): AsyncIterableIterator<TElement> {
  const metaInfo = { isArray: false };
  const pages = getPageAsyncIterator<TPage>(pagedResult, link, maxPageSize, metaInfo);
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

async function* getPageAsyncIterator<TPage>(
  pagedResult: PagedResult<TPage>,
  link: string,
  maxPageSize?: number,
  metaInfo: { isArray: boolean } = { isArray: true }
): AsyncIterableIterator<TPage> {
  let response = await pagedResult.getPage(link, maxPageSize);
  metaInfo.isArray = Array.isArray(response.page);
  yield response.page;
  while (response.nextLink) {
    response = await pagedResult.getPage(response.nextLink, maxPageSize);
    yield response.page;
  }
}
