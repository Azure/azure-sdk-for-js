// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { deserializeDetectedLanguage } from "../../src/transforms";

describe("Utilities", function () {
  describe("deserializeDetectedLanguage", function () {
    it("deserializes string", function () {
      assert.deepEqual(deserializeDetectedLanguage("en"), { iso6391Name: "en" } as any);
    });

    it("deserializes object", function () {
      const res = {
        name: "English",
        iso6391Name: "en",
        confidenceScore: 0.98,
      };
      assert.deepEqual(deserializeDetectedLanguage(JSON.stringify(res)), res);
    });
  });
});
