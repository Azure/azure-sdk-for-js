// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { sortByPreviousOrder } from "../src/util";

describe("sortByPreviousOrder", () => {
  it("should sort outputs correctly", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const output = [{ id: 3 }, { id: 1 }, { id: 2 }];
    const result = sortByPreviousOrder(input, output, "id");
    assert.deepEqual(result, input);
  });
});
