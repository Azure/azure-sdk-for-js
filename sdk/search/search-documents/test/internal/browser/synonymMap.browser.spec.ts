// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assert, describe, it } from "vitest";
import { createSynonymMapFromFile } from "../../../src/synonymMapHelper.js";

describe("synonymmap", () => {
  it("create synonymmap from file(browser)", async () => {
    let errorThrown = false;
    try {
      await createSynonymMapFromFile("my-synonym-map-1", "./test/internal/synonymMap.txt");
    } catch (ex: any) {
      errorThrown = true;
    }
    assert.isTrue(errorThrown, "Expected createSynonymMapFromFile to fail with an exception");
  });
});
