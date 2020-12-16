// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { isResourceValid, parseConnectionString } from "../../src/common";

describe("Helper methods", function() {
  describe("isResourceValid Unit Tests", function() {
    it("id is not string", function() {
      const err = {};
      const result = isResourceValid({ id: 1 }, err);

      assert.equal(result, false);
      assert.deepEqual(err, { message: "Id must be a string." });
    });
  });
  describe("parseConnectionString", function() {
    it("parses a valid connection string", function() {
      const connectionString =
        "AccountEndpoint=https://test-account.documents.azure.com:443/;AccountKey=c213asdasdefgdfgrtweaYPpgoeCsHbpRTHhxuMsTaw==;"; // [SuppressMessage("Microsoft.Security", "CS001:SecretInline", Justification="Not a real key")]
      const connectionObject = parseConnectionString(connectionString);

      assert.equal(connectionObject.endpoint, "https://test-account.documents.azure.com:443/");
      assert.equal(connectionObject.key, "c213asdasdefgdfgrtweaYPpgoeCsHbpRTHhxuMsTaw=="); // [SuppressMessage("Microsoft.Security", "CS001:SecretInline", Justification="Not a real key")]
    });
    it("throws on invalid connection string", function() {
      const connectionString = "asdqweqsdfd==;==sfd;asdqwe;asdqwe";
      assert.throws(() => parseConnectionString(connectionString));
    });
  });
});
