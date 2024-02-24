// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import {
  getPagedAsyncIterator,
  PagedAsyncIterableIterator,
  PagedResult,
  PageSettings,
} from "../src/index.js";

function buildIterator<T>(input: T): PagedAsyncIterableIterator<unknown, T, PageSettings> {
  return getPagedAsyncIterator({
    firstPageLink: 0,
    getPage: async () => ({ page: input }),
  });
}

describe("getPagedAsyncIterator", function () {
  it("should return an iterator over an empty collection", async function () {
    const iterator = buildIterator([]);
    for await (const val of iterator) {
      assert.fail(`should not get here but got: ${val}`);
    }
  });

  it("should return an iterator over an non-empty collection", async function () {
    const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const iterator = buildIterator(collection);
    const expected = [];
    for await (const val of iterator) {
      expected.push(val);
    }
    assert.deepEqual(expected, collection);
  });

  it("should return an iterator over an non-collection", async function () {
    const iterator = buildIterator({});
    for await (const val of iterator) {
      assert.deepEqual(val, {});
    }
  });

  it("should return an iterator over no pages", async function () {
    const iterator = buildIterator([]);
    for await (const val of iterator.byPage({ maxPageSize: 5 })) {
      assert.deepEqual(val, []);
    }
  });

  it("should return an iterator over multiple pages (collections)", async function () {
    const collection = Array.from(Array(10), (_, i) => i + 1);
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
    const iterator = getPagedAsyncIterator(pagedResult);
    const receivedItems = [];
    for await (const val of iterator) {
      receivedItems.push(val);
    }
    assert.deepEqual(receivedItems, collection);
    let pagesCount = 0;
    const maxPageSize = 5;
    const receivedPages: any[] = [];
    for await (const val of iterator.byPage({ maxPageSize: maxPageSize })) {
      ++pagesCount;
      assert.isAtMost(val.length, maxPageSize);
      receivedPages.push(val);
    }
    assert.equal(pagesCount, Math.ceil(collection.length / maxPageSize));
    assert.deepEqual([].concat(...receivedPages), collection);
  });

  it("should return an iterator over multiple pages (non-collections)", async function () {
    const maxPageSize = 5;
    const collection = Array.from(Array(10), (_, i) => i + 1);
    const pagedResult: PagedResult<Record<string, unknown>, PageSettings, number> = {
      firstPageLink: 0,
      async getPage(pageLink, innerMaxPageSize) {
        const top = innerMaxPageSize || 5;
        if (pageLink < collection.length) {
          return Promise.resolve({
            page: {
              res: collection.slice(pageLink, Math.min(pageLink + top, collection.length)),
            },
            nextPageLink: top < collection.length - pageLink ? pageLink + top : undefined,
          });
        } else {
          throw new Error("should not get here");
        }
      },
    };
    const iterator = getPagedAsyncIterator<
      Record<string, any>,
      Record<string, any>,
      PageSettings,
      number
    >(pagedResult);
    const receivedItems = []; // they're pages too
    let pagesCount = 0;
    for await (const val of iterator) {
      ++pagesCount;
      receivedItems.push((val as any).res);
    }
    assert.equal(pagesCount, Math.ceil(collection.length / maxPageSize));
    assert.deepEqual([].concat(...receivedItems), collection);
    pagesCount = 0;
    const receivedPages = [];
    for await (const val of iterator.byPage({ maxPageSize: maxPageSize })) {
      ++pagesCount;
      assert.isAtMost(val.res.length, maxPageSize);
      receivedPages.push(val.res);
    }
    assert.equal(pagesCount, Math.ceil(collection.length / maxPageSize));
    assert.deepEqual([].concat(...receivedPages), collection);
  });

  describe("Iterator over object", function () {
    interface CollectionObject {
      elements: number[];
      next: number;
    }

    it("should return an iterator over an object that can extract elements", async function () {
      const collection: CollectionObject = {
        elements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        next: 0,
      };
      const pagedResult: PagedResult<CollectionObject, PageSettings, number> = {
        firstPageLink: 0,
        getPage: async () => ({ page: collection }),
        toElements: (page) => page.elements,
      };
      const iterator = getPagedAsyncIterator(pagedResult);
      const expected = [];
      for await (const val of iterator) {
        expected.push(val);
      }
      assert.deepEqual(expected, collection.elements);
    });
  });

  it("should handle undefined page", async () => {
    const pageResult: PagedResult<number[], PageSettings, number> = {
      firstPageLink: 0,
      async getPage(pageLink) {
        if (pageLink === 0) {
          return Promise.resolve({
            page: [1],
            nextPageLink: 1,
          });
        } else {
          return undefined;
        }
      },
    };

    const pageIterator = getPagedAsyncIterator(pageResult).byPage();
    let result = await pageIterator.next();
    assert.equal(result.value.length, 1, "Expecting one element in first page");
    result = await pageIterator.next();
    assert.equal(result.value, undefined, "Not expecting any more pages");
  });

  describe("Strong typing experience", function () {
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function assertNotAny<T extends IsAny<T> extends true ? never : any>(_: T): void {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function assertAny<T extends IsAny<T> extends false ? never : any>(_: T): void {}

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
          assert.fail("should not get here");
        }
      },
    };
    // instantiate the generic type variables so that TElement does not default to unknown
    const iterator = getPagedAsyncIterator<number, number[], PageSettings, number>(pagedResult);

    describe("using for-await", function () {
      it("elements and pages are not typed as any", async function () {
        for await (const page of iterator.byPage({ maxPageSize: 5 })) {
          assertNotAny(page);
          for (const element of page) {
            assertNotAny(element);
          }
        }
      });

      it("elements are not typed as any", async function () {
        for await (const element of iterator) {
          assertNotAny(element);
        }
      });
    });

    describe("calling next", function () {
      it("elements and pages are not typed as any", async function () {
        const pageIterator = iterator.byPage({ maxPageSize: 5 });
        let page = await pageIterator.next();
        while (!page.done) {
          assertNotAny(page.value);
          for (const element of page.value) {
            assertNotAny(element);
          }
          page = await pageIterator.next();
        }
        assertAny(page.value);
        if (page.value !== undefined) {
          assert.fail(`next() should not return a value but it returned ${page.value}`);
        }
      });

      it("elements are not typed as any", async function () {
        let element = await iterator.next();
        while (!element.done) {
          assertNotAny(element);
          element = await iterator.next();
        }
        assertAny(element.value);
        if (element.value !== undefined) {
          assert.fail(`next() should not return a value but it returned ${element.value}`);
        }
      });

      it("elements are typed as any if done is not checked", async function () {
        let element = await iterator.next();
        while (element.value !== undefined) {
          // without checking the `done` field, the type of the `value` field will be `any`.
          // The reason being that the typechecker does not know whether `value` was yielded (T)
          // or returned (any).
          // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-6.html#stricter-generators
          assertAny(element.value);
          element = await iterator.next();
        }
      });
    });
  });
});
