// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as lib from "../../src/index";

describe("SchemaRegistryClient constructor - browser", () => {
  it("should succeed", () => {
    const result = new lib.SchemaRegistryClient("https://example.com");
    if (!(result instanceof lib.SchemaRegistryClient)) {
      throw new Error();
    }
  });
});
