// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getPagedAsyncIterator, PagedResult, PageSettings } from "../src";

function buildIterator<T>(input: T) {
  return getPagedAsyncIterator({
    firstPageLink: 0,
    async getPage() {
      return Promise.resolve({ page: input });
    },
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
    let receivedItems = [];
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
      async getPage(pageLink, maxPageSize) {
        const top = maxPageSize || 5;
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
    let receivedItems = []; // they're pages too
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
});
