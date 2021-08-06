// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getPagedAsyncIterator, PagedResult } from "../src";

describe("getPagedAsyncIterator", function() {
  it("should return an iterator over an empty collection", async function() {
    const pagedResult: PagedResult<any, any> = {
      async fetchPage() {
        return Promise.resolve({
          results: []
        });
      }
    };
    const iterator = getPagedAsyncIterator(pagedResult, "", {});
    for await (const val of iterator) {
      assert.fail(`should not get here but got: ${val}`);
    }
  });

  it("should return an iterator over an non-empty collection", async function() {
    const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const pagedResult: PagedResult<any, any> = {
      async fetchPage() {
        return Promise.resolve({
          results: collection
        });
      }
    };
    const iterator = getPagedAsyncIterator(pagedResult, "", {});
    const expected = [];
    for await (const val of iterator) {
      expected.push(val);
    }
    assert.deepEqual(expected, collection);
  });

  it("should return an iterator over an non-collection", async function() {
    const pagedResult: PagedResult<any, any> = {
      async fetchPage() {
        return Promise.resolve({
          results: {}
        });
      }
    };
    const iterator = getPagedAsyncIterator(pagedResult, "", {});
    for await (const val of iterator) {
      assert.deepEqual(val, {});
    }
  });

  it("should return an iterator over no pages", async function() {
    const pagedResult: PagedResult<any, any> = {
      async fetchPage() {
        return Promise.resolve({ results: [] });
      }
    };
    const iterator = getPagedAsyncIterator(pagedResult, "", {});
    for await (const val of iterator.byPage({ maxPageSize: 5 })) {
      assert.deepEqual(val, []);
    }
  });

  it("should return an iterator over multiple pages (collections)", async function() {
    const collection = Array.from(Array(10), (_, i) => i + 1);
    let currIndex = 0;
    const pagedResult: PagedResult<any, any> = {
      async fetchPage(_path, options) {
        const top = options.top || 5;
        if (currIndex < collection.length) {
          const res = collection.slice(currIndex, Math.min(currIndex + top, collection.length));
          const nextLink = top < collection.length - currIndex ? "nextLink" : undefined;
          currIndex += top;
          return Promise.resolve({
            results: res,
            nextLink: nextLink
          });
        } else {
          throw new Error("should not get here");
        }
      }
    };
    const iterator = getPagedAsyncIterator(pagedResult, "", {});
    let receivedItems = [];
    for await (const val of iterator) {
      receivedItems.push(val);
    }
    assert.deepEqual(receivedItems, collection);
    currIndex = 0;
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

  it("should return an iterator over multiple pages (non-collections)", async function() {
    const maxPageSize = 5;
    const collection = Array.from(Array(10), (_, i) => i + 1);
    let currIndex = 0;
    const pagedResult: PagedResult<any, any> = {
      async fetchPage(_path, options) {
        const top = options.top || 5;
        if (currIndex < collection.length) {
          const res = collection.slice(currIndex, Math.min(currIndex + top, collection.length));
          const nextLink = top < collection.length - currIndex ? "nextLink" : undefined;
          currIndex += top;
          return Promise.resolve({
            results: { res },
            nextLink: nextLink
          });
        } else {
          throw new Error("should not get here");
        }
      }
    };
    const iterator = getPagedAsyncIterator<{}, any, any, any>(pagedResult, "", {});
    let receivedItems = []; // they're pages too
    let pagesCount = 0;
    for await (const val of iterator) {
      ++pagesCount;
      receivedItems.push((val as any).res);
    }
    assert.equal(pagesCount, Math.ceil(collection.length / maxPageSize));
    assert.deepEqual([].concat(...receivedItems), collection);
    // reset the dummy server
    currIndex = 0;
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
