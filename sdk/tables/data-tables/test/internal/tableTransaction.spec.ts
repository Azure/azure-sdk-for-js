// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { parseTransactionResponse } from "../../src/TableTransaction";
import {
  PipelineResponse,
  createHttpHeaders,
  createPipelineRequest
} from "@azure/core-rest-pipeline";

describe("TableTransaction", () => {
  describe("parseTransactionResponse", () => {
    it("should handle error with no error info", () => {
      const testResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request: createPipelineRequest({ url: "https://example.org" }),
        status: 400
      };

      try {
        parseTransactionResponse(testResponse);
        assert.fail("Expected error");
      } catch (error) {
        assert.equal(error.message, "Transaction Failed");
      }
    });

    it("should handle error with  odata error info", () => {
      const testResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request: createPipelineRequest({ url: "https://example.org" }),
        status: 400,
        bodyAsText: JSON.stringify({
          "odata.error": {
            code: "123",
            message: { value: "Test message" }
          }
        })
      };

      try {
        parseTransactionResponse(testResponse);
        assert.fail("Expected error");
      } catch (error) {
        assert.equal(error.message, "Test message");
        assert.equal(error.code, "123");
      }
    });
  });
});
