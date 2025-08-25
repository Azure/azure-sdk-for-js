// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { sanitizeEndpoint } from "$internal/utils/checkURL.js";
import { describe, it, assert } from "vitest";

describe("URL utils", () => {
  describe("sanitizeEndpoint", () => {
    it("correctly formats URL with scope", () => {
      const testURLs = [
        "https://sample.documents.azure.com",
        "https://sample.documents.azure.com/",
        "https://sample.documents.azure.com:443/",
        "https://sample.documents.azure.com:443",
        "https://sample.documents.azure.com",
      ];
      const correctURL = "https://sample.documents.azure.com";

      testURLs.forEach((url) => {
        assert.equal(sanitizeEndpoint(url), correctURL);
      });
    });
  });
});
