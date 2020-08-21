// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { extractConnectionStringParts, ConnectionString } from "../../src/utils/connectionString";
import { base64Encode, base64Decode } from "../../src/utils/bufferSerializer";
import { isNode } from "@azure/core-http";
import { assert } from "chai";

describe("Utility Helpers", () => {
  describe("extractConnectionStringParts", () => {
    describe("Account Connection String", () => {
      beforeEach(function() {
        if (!isNode) {
          // Account connection string is not supported for Browsers
          this.skip();
        }
      });
      it("should handle connection string without TableEndpoint", () => {
        const validConnectionString =
          "DefaultEndpointsProtocol=https;AccountName=testaccount;AccountKey=REDACTED;EndpointSuffix=core.windows.net";
        const result = extractConnectionStringParts(validConnectionString);
        assert.deepEqual(result, {
          accountName: "testaccount",
          accountKey: Buffer.from([68, 64, 192, 9, 49, 3]),
          kind: "AccountConnString",
          url: "https://testaccount.table.core.windows.net"
        });
      });

      it("should handle connection string with TableEndpoint", () => {
        const validConnectionString =
          "DefaultEndpointsProtocol=https;AccountName=testaccount;AccountKey=REDACTED;EndpointSuffix=core.windows.net;TableEndpoint=https://myAccount.table.core.windows.net/";
        const result = extractConnectionStringParts(validConnectionString);
        assert.deepEqual(result, {
          accountName: "testaccount",
          accountKey: Buffer.from([68, 64, 192, 9, 49, 3]),
          kind: "AccountConnString",
          url: "https://myAccount.table.core.windows.net"
        });
      });

      it("should throw when AccountName is missing", () => {
        const badString =
          "DefaultEndpointsProtocol=https;AccountKey=REDACTED;EndpointSuffix=core.windows.net";

        assert.throws(() => extractConnectionStringParts(badString), /Invalid AccountName/);
      });

      it("should throw when AccountKey is missing", () => {
        const badString =
          "DefaultEndpointsProtocol=https;AccountKey=;AccountName=testaccount;EndpointSuffix=core.windows.net";

        assert.throws(() => extractConnectionStringParts(badString), /Invalid AccountKey/);
      });
    });

    describe("SAS Connection String", () => {
      const expectedConenctionStringParts: ConnectionString = {
        accountName: "teststorageaccount",
        accountSas: "REDACTED",
        kind: "SASConnString",
        url: "https://teststorageaccount.table.core.windows.net"
      };

      beforeEach(() => {});

      it("should handle format 'protocol://accountName.table.endpointSuffix'", () => {
        const validSAS =
          "BlobEndpoint=https://teststorageaccount.blob.core.windows.net/;QueueEndpoint=https://teststorageaccount.queue.core.windows.net/;FileEndpoint=https://teststorageaccount.file.core.windows.net/;TableEndpoint=https://teststorageaccount.table.core.windows.net/;SharedAccessSignature=REDACTED";
        const connectionStringParts = extractConnectionStringParts(validSAS);
        assert.deepEqual(connectionStringParts, expectedConenctionStringParts);
      });

      it("should handle IPv4/6 format ", () => {
        const validIPSAS =
          "BlobEndpoint=https://teststorageaccount.blob.core.windows.net/;QueueEndpoint=https://teststorageaccount.queue.core.windows.net/;FileEndpoint=https://teststorageaccount.file.core.windows.net/;TableEndpoint=https://127.0.0.1/teststorageaccount/;SharedAccessSignature=REDACTED";
        const connectionStringParts = extractConnectionStringParts(validIPSAS);
        assert.deepEqual(connectionStringParts, {
          ...expectedConenctionStringParts,
          url: "https://127.0.0.1/teststorageaccount"
        });
      });

      it("should throw error for invalid TableEndpoint", () => {
        const invalidSAS =
          "BlobEndpoint=BlobEndpoint=https://testaccount.blob.core.windows.net/;QueueEndpoint=https://testaccount.queue.core.windows.net/;SharedAccessSignature=REDACTED";
        assert.throws(() => extractConnectionStringParts(invalidSAS), /Invalid TableEndpoint/);
      });

      it("should throw error for invalid SharedAccessSignature", () => {
        const invalidSAS =
          "BlobEndpoint=BlobEndpoint=https://testaccount.blob.core.windows.net/;QueueEndpoint=https://testaccount.queue.core.windows.net/;FileEndpoint=https://testaccount.file.core.windows.net/;TableEndpoint=https://testaccount.table.core.windows.net/";
        assert.throws(
          () => extractConnectionStringParts(invalidSAS),
          /Invalid SharedAccessSignature/
        );
      });

      it("should throw error for invalid AccountName", () => {
        const invalidSAS =
          "BlobEndpoint=BlobEndpoint=https://testaccount.blob.core.windows.net/;QueueEndpoint=https://testaccount.queue.core.windows.net/;FileEndpoint=https://testaccount.file.core.windows.net/;TableEndpoint=https://testaccount.buggyUrl.core.windows.net/;SharedAccessSignature=REDACTED";
        assert.throws(() => extractConnectionStringParts(invalidSAS), /Invalid AccountName/);
      });
    });
  });
  describe("bufferSerializer", () => {
    it("should correctly serialize a Uint8Array object to a base64 string", () => {
      const binValue = new Uint8Array([84, 101, 115, 116, 49, 50, 51]);
      const base64Encoded = "VGVzdDEyMw==";
      assert.strictEqual(base64Encode(binValue), base64Encoded);
    });

    it("should correctly deserialize a base64 string to a Uint8Array object", () => {
      const base64Str = "VGVzdDEyMw==";
      const binValue = new Uint8Array([84, 101, 115, 116, 49, 50, 51]);
      assert.deepEqual(base64Decode(base64Str), binValue);
    });
  });
});
