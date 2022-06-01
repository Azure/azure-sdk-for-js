// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { sanitizeEndpoint } from "../../../../src/utils/checkURL";

describe("URL utils", function () {
  describe("sanitizeEndpoint", function () {
    it("correctly formats URL with scope", function () {
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
