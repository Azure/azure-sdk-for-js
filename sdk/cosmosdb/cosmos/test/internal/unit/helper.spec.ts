// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { parseConnectionString } from "../../../src/common";

describe("Helper methods", function () {
  describe("parseConnectionString", function () {
    it("parses a valid connection string", function () {
      const connectionString =
        "AccountEndpoint=https://test-account.documents.azure.com:443/;AccountKey=c213asdasdefgdfgrtweaYPpgoeCsHbpRTHhxuMsTaw==;"; // [SuppressMessage("Microsoft.Security", "CS001:SecretInline", Justification="Not a real key")]
      const connectionObject = parseConnectionString(connectionString);

      assert.equal(connectionObject.endpoint, "https://test-account.documents.azure.com:443/");
      assert.equal(connectionObject.key, "c213asdasdefgdfgrtweaYPpgoeCsHbpRTHhxuMsTaw=="); // [SuppressMessage("Microsoft.Security", "CS001:SecretInline", Justification="Not a real key")]
    });
    it("throws on invalid connection string", function () {
      const connectionString = "asdqweqsdfd==;==sfd;asdqwe;asdqwe";
      assert.throws(() => parseConnectionString(connectionString));
    });
  });
});
