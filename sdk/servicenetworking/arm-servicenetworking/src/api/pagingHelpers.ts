// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Client,
  createRestError,
  PathUncheckedResponse,
} from "@azure-rest/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import {
  BuildPagedAsyncIteratorOptions,
  ContinuablePage,
  PageSettings,
  PagedAsyncIterableIterator,
  PagedResult,
} from "../models/pagingTypes.js";
import { isUnexpected } from "../rest/index.js";

/**
 * Helper to paginate results in a generic way and return a PagedAsyncIterableIterator
 */
export function buildPagedAsyncIterator<
  TElement,
  TPage = TElement[],
  TPageSettings extends PageSettings = PageSettings,
  TResponse extends PathUncheckedResponse = PathUncheckedResponse,
>(
  client: Client,
  getInitialResponse: () => PromiseLike<TResponse>,
  processResponseBody: (result: TResponse) => PromiseLike<unknown>,
  options: BuildPagedAsyncIteratorOptions = {},
): PagedAsyncIterableIterator<TElement, TPage, TPageSettings> {
  const itemName = options.itemName ?? "value";
  const nextLinkName = options.nextLinkName ?? "nextLink";
  const pagedResult: PagedResult<TElement, TPage, TPageSettings> = {
    getPage: async (pageLink?: string) => {
      const result =
        pageLink === undefined
          ? await getInitialResponse()
          : await client.pathUnchecked(pageLink).get();
      checkPagingRequest(result);
      const results = await processResponseBody(result as TResponse);
      const nextLink = getNextLink(results, nextLinkName);
      const values = getElements<TElement>(results, itemName) as TPage;
      return {
        page: values,
        nextPageLink: nextLink,
      };
    },
    byPage: (settings?: TPageSettings) => {
      const { continuationToken } = settings ?? {};
      return getPageAsyncIterator(pagedResult, {
        pageLink: continuationToken,
      });
    },
  };
  return getPagedAsyncIterator(pagedResult);
}

/**
 * returns an async iterator that iterates over results. It also has a `byPage`
 * method that returns pages of items at once.
 *
 * @param pagedResult - an object that specifies how to get pages.
 * @returns a paged async iterator that iterates over results.
 */

function getPagedAsyncIterator<
  TElement,
  TPage = TElement[],
  TPageSettings extends PageSettings = PageSettings,
>(
  pagedResult: PagedResult<TElement, TPage, TPageSettings>,
): PagedAsyncIterableIterator<TElement, TPage, TPageSettings> {
  const iter = getItemAsyncIterator<TElement, TPage, TPageSettings>(
    pagedResult,
  );
  return {
    next() {
      return iter.next();
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    byPage:
      pagedResult?.byPage ??
      ((settings?: TPageSettings) => {
        const { continuationToken } = settings ?? {};
        return getPageAsyncIterator(pagedResult, {
          pageLink: continuationToken,
        });
      }),
  };
}

async function* getItemAsyncIterator<
  TElement,
  TPage,
  TPageSettings extends PageSettings,
>(
  pagedResult: PagedResult<TElement, TPage, TPageSettings>,
): AsyncIterableIterator<TElement> {
  const pages = getPageAsyncIterator(pagedResult);
  for await (const page of pages) {
    yield* page as unknown as TElement[];
  }
}

async function* getPageAsyncIterator<
  TElement,
  TPage,
  TPageSettings extends PageSettings,
>(
  pagedResult: PagedResult<TElement, TPage, TPageSettings>,
  options: {
    pageLink?: string;
  } = {},
): AsyncIterableIterator<ContinuablePage<TElement, TPage>> {
  const { pageLink } = options;
  let response = await pagedResult.getPage(
    pageLink ?? pagedResult.firstPageLink,
  );
  if (!response) {
    return;
  }
  let result = response.page as ContinuablePage<TElement, TPage>;
  result.continuationToken = response.nextPageLink;
  yield result;
  while (response.nextPageLink) {
    response = await pagedResult.getPage(response.nextPageLink);
    if (!response) {
      return;
    }
    result = response.page as ContinuablePage<TElement, TPage>;
    result.continuationToken = response.nextPageLink;
    yield result;
  }
}

/**
 * Gets for the value of nextLink in the body
 */
function getNextLink(body: unknown, nextLinkName?: string): string | undefined {
  if (!nextLinkName) {
    return undefined;
  }

  const nextLink = (body as Record<string, unknown>)[nextLinkName];

  if (
    typeof nextLink !== "string" &&
    typeof nextLink !== "undefined" &&
    nextLink !== null
  ) {
    throw new RestError(
      `Body Property ${nextLinkName} should be a string or undefined or null but got ${typeof nextLink}`,
    );
  }

  if (nextLink === null) {
    return undefined;
  }

  return nextLink;
}

/**
 * Gets the elements of the current request in the body.
 */
function getElements<T = unknown>(body: unknown, itemName: string): T[] {
  const value = (body as Record<string, unknown>)[itemName] as T[];
  if (!Array.isArray(value)) {
    throw new RestError(
      `Couldn't paginate response\n Body doesn't contain an array property with name: ${itemName}`,
    );
  }

  return value ?? [];
}

/**
 * Checks if a request failed
 */
function checkPagingRequest(response: PathUncheckedResponse): void {
  if (isUnexpected(response)) {
    throw createRestError(
      `Pagination failed with unexpected statusCode ${response.status}`,
      response,
    );
  }
}
