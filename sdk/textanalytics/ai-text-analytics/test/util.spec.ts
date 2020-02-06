// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { sortByPreviousIdOrder } from "../src/util";

describe("util.sortByPreviousOrder", () => {
  it("should sort outputs correctly", () => {
    const input = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const output = [{ id: "3" }, { id: "1" }, { id: "2" }];
    const result = sortByPreviousIdOrder(input, output);
    assert.deepEqual(result, input);
  });

  it("should throw when input/output lengths do not match", () => {
    const input = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const output = [{ id: "3" }, { id: "1" }];
    assert.throws(() => {
      sortByPreviousIdOrder(input, output);
    }, /same length/);
  });
});
