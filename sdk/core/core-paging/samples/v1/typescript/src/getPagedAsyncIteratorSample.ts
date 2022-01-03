// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample builds a simple paging operation using getPagedAsyncIterator
 *
 * @summary builds a simple paging operation using getPagedAsyncIterator
 */

import { getPagedAsyncIterator, PagedResult, PageSettings } from "@azure/core-paging";

type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false

function isFalse(_x: false): void { }
function isTrue(_x: true): void { }

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

  // iterating over pages with for-await
  for await (const page of iterator.byPage({ maxPageSize: 5 })) {
    for (const element of page) {
      const elementHasTypeAny: IsAny<typeof element> = false;
      isFalse(elementHasTypeAny);
      console.log(`Received element: ${element}`);
    }
  }

  // iterating over elements with for-await
  for await (const element of iterator) {
    const elementHasTypeAny: IsAny<typeof element> = false;
    isFalse(elementHasTypeAny);
    console.log(`Received element: ${element}`);
  }

  // iterating over pages with calling next and checking done
  const pageIterator = iterator.byPage({ maxPageSize: 5 });
  let page = await pageIterator.next();
  while (!page.done) {
    for (const element of page.value) {
      const pageHasTypeAny: IsAny<typeof page.value> = false;
      isFalse(pageHasTypeAny);
      console.log(`Received element: ${element}`);
    }
    page = await pageIterator.next();
  }
  if (page.value !== undefined) {
    throw new Error(`next() should not return a value but it returned ${page.value}`);
  }

  // iterating over elements with calling next and checking done
  let element = await iterator.next();
  while (!element.done) {
    const elementHasTypeAny: IsAny<typeof element.value> = false;
    isFalse(elementHasTypeAny);
    console.log(`Received element: ${element.value}`);
    element = await iterator.next();
  }
  if (element.value !== undefined) {
    throw new Error(`next() should not return a value but it returned ${element.value}`);
  }

  // iterating over elements with calling next and not checking done
  element = await iterator.next();
  while (element.value !== undefined) {
    // without checking the `done` field, the type of the `value` field will be `any`.
    // The reason being that the typechecker does not know whether `value` was yielded (T)
    // or returned (any).
    // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-6.html#stricter-generators
    const elementHasTypeAny: IsAny<typeof element.value> = true;
    isTrue(elementHasTypeAny);
    console.log(`Received element: ${element.value}`);
    element = await iterator.next();
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
