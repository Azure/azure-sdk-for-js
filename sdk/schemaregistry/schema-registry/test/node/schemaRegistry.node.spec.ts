// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as lib from "../../src/index";
import assert from "assert";

describe("SchemaRegistryClient constructor - node", () => {
  it("should succeed", () => {
    const p = new lib.SchemaRegistryClient("https://example.com");
    assert(p instanceof lib.SchemaRegistryClient);
  });
});
