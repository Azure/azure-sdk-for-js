// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PageSettings, PagedAsyncIterableIterator, PagedResult } from "./models.js";

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
      (((settings?: PageSettings) => {
        const { continuationToken, maxPageSize } = settings ?? {};
        return getPageAsyncIterator(pagedResult, {
          pageLink: continuationToken as unknown as TLink | undefined,
          maxPageSize,
        });
      }) as unknown as (settings?: TPageSettings) => AsyncIterableIterator<TPage>),
  };
}

async function* getItemAsyncIterator<TElement, TPage, TLink, TPageSettings>(
  pagedResult: PagedResult<TPage, TPageSettings, TLink>
): AsyncIterableIterator<TElement> {
  const pages = getPageAsyncIterator(pagedResult);
  const firstVal = await pages.next();
  // if the result does not have an array shape, i.e. TPage = TElement, then we return it as is
  if (!Array.isArray(firstVal.value)) {
    // can extract elements from this page
    const { toElements } = pagedResult;
    if (toElements) {
      yield* toElements(firstVal.value) as TElement[];
      for await (const page of pages) {
        yield* toElements(page) as TElement[];
      }
    } else {
      yield firstVal.value;
      // `pages` is of type `AsyncIterableIterator<TPage>` but TPage = TElement in this case
      yield* pages as unknown as AsyncIterableIterator<TElement>;
    }
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
  options: {
    maxPageSize?: number;
    pageLink?: TLink;
  } = {}
): AsyncIterableIterator<TPage> {
  const { pageLink, maxPageSize } = options;
  let response = await pagedResult.getPage(pageLink ?? pagedResult.firstPageLink, maxPageSize);
  if (!response) {
    return;
  }
  yield response.page;
  while (response.nextPageLink) {
    response = await pagedResult.getPage(response.nextPageLink, maxPageSize);
    if (!response) {
      return;
    }
    yield response.page;
  }
}
