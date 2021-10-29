// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentSpan } from "@azure/ai-form-recognizer";
import { fastGetChildren } from "../../src/lro/analyze";

import { assert } from "chai";

interface TestData {
  id: number;
  span: DocumentSpan;
}

let currentId = 0;

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
];

function intoIter<T>(values: T | T[]): IterableIterator<T> {
  if (Array.isArray(values)) {
    return values[Symbol.iterator]();
  } else {
    return [values][Symbol.iterator]();
  }
}

describe("get children", function () {
  it("simple inclusion", () => {
    const testSpan = { offset: 1, length: 3 };
    const result = [...fastGetChildren(intoIter(testSpan), TEST_DATA)].map(({ id }) => id);

    assert.deepStrictEqual(result, [2]);
  });

  it("all span identities", () => {
    for (const { id, span } of TEST_DATA) {
      const result = [...fastGetChildren(intoIter(span), TEST_DATA)].map(
        ({ id: resultId }) => resultId
      );

      assert.include(result, id);
    }
  });

  it("zero size inclusion", () => {
    const testSpan = { offset: 0, length: 1 };
    const result = [...fastGetChildren(intoIter(testSpan), TEST_DATA)].map(({ id }) => id);

    assert.deepStrictEqual(result, [0, 1]);
  });
});
