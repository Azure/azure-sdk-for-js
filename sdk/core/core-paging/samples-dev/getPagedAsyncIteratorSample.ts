// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample builds a simple paging operation using getPagedAsyncIterator
 *
 * @summary builds a simple paging operation using getPagedAsyncIterator
 * @azsdk-weight 40
 */

import { getPagedAsyncIterator, PagedResult, PageSettings } from "@azure/core-paging";

export async function main() {
  const totalElementsCount = 100;
  const collection = Array.from(Array(totalElementsCount), (_, i) => i + 1);
  const pagedResult: PagedResult<number[], PageSettings, number> = {
    firstPageLink: 0,
    async getPage(pageLink, maxPageSize) {
      const top = maxPageSize || 5;
      if (pageLink < collection.length) {
        return Promise.resolve({
          page: collection.slice(pageLink, Math.min(pageLink + top, collection.length)),
          nextPageLink: top < collection.length - pageLink ? pageLink + top : undefined,
        });
      } else {
        throw new Error("should not get here");
      }
    },
  };
  // instantiate the generic type variables so that TElement does not default to unknown
  const iterator = getPagedAsyncIterator<number, number[], PageSettings, number>(pagedResult);
  for await (const page of iterator.byPage({ maxPageSize: 5 })) {
    for (const element of page) {
      console.log(`Received element: ${element}`);
    }
  }

  // iterating without for-await pattern
  let item = await iterator.next();
  while (!item.done) {
    console.log(`Received element: ${item.value}`);
    item = await iterator.next();
  }
  if (item.done && item.value !== undefined) {
    throw new Error(`next() should not return a value but it returned ${item.value}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
