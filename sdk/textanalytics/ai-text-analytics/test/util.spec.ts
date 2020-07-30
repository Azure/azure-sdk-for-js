// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { sortResponseIdObjects } from "../src/util";

describe("util.sortByPreviousOrder", () => {
  it("should sort outputs correctly", () => {
    const input = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const output = [{ id: "3" }, { id: "1" }, { id: "2" }];
    const result = sortResponseIdObjects(input, output);
    assert.deepEqual(result, input);
  });

  it('should throw when id: "" is present', () => {
    const input = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const output = [
      { id: "3" },
      { id: "1" },
      { id: "2" },
      { id: "", error: { code: "Oops", message: "A fatal error!" } }
    ];
    assert.throws(() => {
      sortResponseIdObjects(input, output);
    }, /^A fatal error!$/);
  });
});
