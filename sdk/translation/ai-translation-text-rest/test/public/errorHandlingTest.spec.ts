// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how error responses are handled from the Text Translation Service
 */

import { getClient, getErrorResponseBody } from "./utils/testHelper";
import { describe, it, expect, beforeEach } from "vitest";
import { TokenCredential } from "@azure/core-auth";

const mockError = {
  error: {
    code: 401000,
    message: "The request is not authorized because credentials are missing or invalid.",
  },
};

class ErrorThrowingCredential implements TokenCredential {
  async getToken(): Promise<{ token: string; expiresOnTimestamp: number }> {
    // This will cause an unauthorized error
    throw new Error("Mock credential error");
  }
}

describe("TextTranslationClient error handling", () => {
  let client: ReturnType<typeof getClient>;

  beforeEach(() => {
    // Create client with invalid credentials to trigger auth error
    client = getClient({
      credential: new ErrorThrowingCredential(),
    });
  });

  it("should properly handle error responses", async () => {
    try {
      // Attempt to translate which should fail due to auth error
      await client.path("/translate").post({
        body: [{ text: "Hello world" }],
        queryParameters: {
          to: ["es"],
        },
      });
      // If we get here, the test failed because no error was thrown
      expect.fail("Expected an error to be thrown");
    } catch (error: any) {
      console.log("Error response body:", error.response?.body);
      
      // Get the error body using the helper function
      const errorBody = getErrorResponseBody(error);
      
      // Verify that the error body is properly parsed
      expect(errorBody).toBeDefined();
      expect(errorBody.error).toBeDefined();
      expect(typeof errorBody.error.message).toBe("string");
      expect(typeof errorBody.error.code).toBe("number");
    }
  });
});