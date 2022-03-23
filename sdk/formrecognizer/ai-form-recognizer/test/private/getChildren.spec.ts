// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentSpan } from "../../src";
import {
  contains,
  fastGetChildren,
  iteratorFromFirstMatchBinarySearch,
} from "../../src/lro/analyze";

import { assert } from "chai";

interface TestData {
  id: number;
  span: DocumentSpan;
}

let currentId = 0;

// eslint-disable-next-line @typescript-eslint/no-redeclare
function TestData(offset: number, length: number): TestData {
  return {
    id: currentId++,
    span: {
      offset,
      length,
    },
  };
}

const TEST_DATA: TestData[] = [
  TestData(0, 0),
  TestData(0, 1),
  TestData(2, 1),
  TestData(3, 6),
  TestData(9, 2),
  TestData(9, 2),
  TestData(11, 5),
];

/**
 * A utility function to coerce a value or array of values into an iterator.
 * @param values - a value or array of values
 * @returns - an Iterator over all of `values`
 */
function intoIter<T>(values: T | T[]): IterableIterator<T> {
  if (Array.isArray(values)) {
    return values[Symbol.iterator]();
  } else {
    return [values][Symbol.iterator]();
  }
}

function naiveGetChildren<T extends { span: DocumentSpan }>(
  spans: DocumentSpan[],
  items: T[]
): T[] {
  const arr = [] as T[];

  for (const span of spans) {
    for (const item of items) {
      if (contains(span, item.span)) {
        arr.push(item);
      }
    }
  }

  return arr;
}

function naiveFindFirst<T extends { span: DocumentSpan }>(
  span: DocumentSpan,
  items: T[]
): T | undefined {
  for (const item of items) {
    if (item.span.offset >= span.offset) {
      return item;
    }
  }

  return undefined;
}

describe("get children", function () {
  it("simple inclusion", () => {
    const testSpan = { offset: 1, length: 3 };
    const result = [...fastGetChildren(intoIter(testSpan), TEST_DATA)].map(({ id }) => id);

    assert.deepStrictEqual(result, [2]);
    assert.deepStrictEqual(
      result,
      naiveGetChildren([testSpan], TEST_DATA).map(({ id }) => id)
    );
  });

  it("all span identities", () => {
    for (const { id: dataId, span } of TEST_DATA) {
      const result = [...fastGetChildren(intoIter(span), TEST_DATA)].map(({ id }) => id);

      assert.include(result, dataId);

      assert.deepStrictEqual(
        result,
        naiveGetChildren([span], TEST_DATA).map(({ id }) => id)
      );
    }
  });

  it("zero size inclusion", () => {
    const testSpan = { offset: 0, length: 1 };
    const result = [...fastGetChildren(intoIter(testSpan), TEST_DATA)].map(({ id }) => id);

    assert.deepStrictEqual(result, [0, 1]);

    assert.deepStrictEqual(
      result,
      naiveGetChildren([testSpan], TEST_DATA).map(({ id }) => id)
    );
  });

  describe("binary search", function () {
    it("search finds correct index", () => {
      for (const datum of TEST_DATA) {
        const testSpan = { offset: datum.span.offset, length: 1 };
        assert.strictEqual(
          (iteratorFromFirstMatchBinarySearch(testSpan, TEST_DATA).next().value as TestData)?.id,
          naiveFindFirst(testSpan, TEST_DATA)?.id
        );
      }
    });
  });
});
