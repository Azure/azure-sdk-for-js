// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { parseConnectionString } from "$internal/common/index.js";
import { describe, it, assert } from "vitest";

describe("Helper methods", () => {
  describe("parseConnectionString", () => {
    it("parses a valid connection string", () => {
      const connectionString =
        "AccountEndpoint=https://test-account.documents.azure.com:443/;AccountKey=c213asdasdefgdfgrtweaYPpgoeCsHbpRTHhxuMsTaw==;"; // [SuppressMessage("Microsoft.Security", "CS001:SecretInline", Justification="Not a real key")]
      const connectionObject = parseConnectionString(connectionString);

      assert.equal(connectionObject.endpoint, "https://test-account.documents.azure.com:443/");
      assert.equal(connectionObject.key, "c213asdasdefgdfgrtweaYPpgoeCsHbpRTHhxuMsTaw=="); // [SuppressMessage("Microsoft.Security", "CS001:SecretInline", Justification="Not a real key")]
    });
    it("throws on invalid connection string", () => {
      const connectionString = "asdqweqsdfd==;==sfd;asdqwe;asdqwe";
      assert.throws(() => parseConnectionString(connectionString));
    });
  });
});
