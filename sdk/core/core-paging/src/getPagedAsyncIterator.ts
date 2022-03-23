// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PageSettings, PagedAsyncIterableIterator, PagedResult } from "./models";

/**
 * returns an async iterator that iterates over results. It also has a `byPage`
 * method that returns pages of items at once.
 *
 * @param pagedResult - an object that specifies how to get pages.
 * @returns a paged async iterator that iterates over results.
 */
export function getPagedAsyncIterator<
  TElement,
  TPage = TElement[],
  TPageSettings = PageSettings,
  TLink = string
>(
  pagedResult: PagedResult<TPage, TPageSettings, TLink>
): PagedAsyncIterableIterator<TElement, TPage, TPageSettings> {
  const iter = getItemAsyncIterator<TElement, TPage, TLink, TPageSettings>(pagedResult);
  return {
    next() {
      return iter.next();
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    byPage:
      pagedResult?.byPage ??
      ((settings?: PageSettings) => {
        return getPageAsyncIterator(
          pagedResult as PagedResult<TPage, PageSettings, TLink>,
          settings?.maxPageSize
        );
      }),
  };
}

async function* getItemAsyncIterator<TElement, TPage, TLink, TPageSettings>(
  pagedResult: PagedResult<TPage, TPageSettings, TLink>,
  maxPageSize?: number
): AsyncIterableIterator<TElement> {
  const pages = getPageAsyncIterator(pagedResult, maxPageSize);
  const firstVal = await pages.next();
  // if the result does not have an array shape, i.e. TPage = TElement, then we return it as is
  if (!Array.isArray(firstVal.value)) {
    yield firstVal.value;
    // `pages` is of type `AsyncIterableIterator<TPage>` but TPage = TElement in this case
    yield* pages as unknown as AsyncIterableIterator<TElement>;
  } else {
    yield* firstVal.value;
    for await (const page of pages) {
      // pages is of type `AsyncIterableIterator<TPage>` so `page` is of type `TPage`. In this branch,
      // it must be the case that `TPage = TElement[]`
      yield* page as unknown as TElement[];
    }
  }
}

async function* getPageAsyncIterator<TPage, TLink, TPageSettings>(
  pagedResult: PagedResult<TPage, TPageSettings, TLink>,
  maxPageSize?: number
): AsyncIterableIterator<TPage> {
  let response = await pagedResult.getPage(pagedResult.firstPageLink, maxPageSize);
  yield response.page;
  while (response.nextPageLink) {
    response = await pagedResult.getPage(response.nextPageLink, maxPageSize);
    yield response.page;
  }
}
