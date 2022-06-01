// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createSynonymMapFromFile } from "../../../src/synonymMapHelper.browser";

describe("synonymmap", () => {
  it("create synonymmap from file(browser)", async function () {
    let errorThrown = false;
    try {
      await createSynonymMapFromFile("my-synonym-map-1", "./test/internal/synonymMap.txt");
    } catch (ex: any) {
      errorThrown = true;
    }
    assert.isTrue(errorThrown, "Expected createSynonymMapFromFile to fail with an exception");
  });
});
