// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample builds a simple paging operation using getPagedAsyncIterator
 *
 * @summary builds a simple paging operation using getPagedAsyncIterator
 */

const { getPagedAsyncIterator } = require("@azure/core-paging");

async function main() {
  const totalElementsCount = 100;
  const collection = Array.from(Array(totalElementsCount), (_, i) => i + 1);
  const pagedResult = {
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

  const iterator = getPagedAsyncIterator(pagedResult);

  for await (const page of iterator.byPage({ maxPageSize: 5 })) {
    for (const element of page) {
      console.log(`Received element: ${element}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
