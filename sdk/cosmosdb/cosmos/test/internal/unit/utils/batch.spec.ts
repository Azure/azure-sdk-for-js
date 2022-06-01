// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { deepFind } from "../../../../src/utils/batch";

describe("batch utils", function () {
  it("deep finds nested partition key values in objects", function () {
    const testTwiceNested = {
      nested: {
        nested2: {
          key: "value",
        },
      },
    };
    const testNested = {
      nested: {
        key: "value",
      },
    };
    const testBase = {
      key: "value",
    };
    assert.equal(deepFind(testNested, "nested/key"), "value");
    assert.equal(deepFind(testBase, "key"), "value");
    assert.equal(deepFind(testTwiceNested, "nested/nested2/key"), "value");
  });
});
