// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import type { HttpClient, SendRequest } from "@azure/core-rest-pipeline";
import { isNodeLike } from "@azure/core-util";
import type { TokenCredential } from "@azure/identity";
import type { SmsClientOptions, SmsSendRequest } from "../../src/index.js";
import { SmsClient } from "../../src/index.js";
import { MockHttpClient } from "./utils/mockHttpClient.js";
import type { MockInstance } from "vitest";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

const TEST_NUMBER = "+14255550123";

describe("[mocked] SmsClient", async function () {
  const baseUri = "https://contoso.api.fake";
  const connectionString = `endpoint=${baseUri};accesskey=banana`;
  const dateHeader = "x-ms-date";
  let sendRequestSpy: MockInstance<SendRequest>;
  const mockHttpClient: HttpClient = new MockHttpClient(TEST_NUMBER);

  const testSendRequest: SmsSendRequest = {
    from: TEST_NUMBER,
    to: [TEST_NUMBER],
    message: "message",
  };

  describe("when instantiating SMS client", function () {
    it("can instantiate with a connection string", async function () {
      new SmsClient(connectionString);
    });

    it("can instantiate with a url and KeyCredential ", async function () {
      new SmsClient(baseUri, new AzureKeyCredential("banana"));
    });

    it("can instantiate with a token", async function () {
      const fakeToken: TokenCredential = {
        getToken: async (_scopes) => {
          return { token: "testToken", expiresOnTimestamp: 11111 };
        },
      };
      new SmsClient(baseUri, fakeToken);
    });
  });

  describe("when sending an SMS", function () {
    let smsClient: SmsClient;
    beforeEach(function () {
      sendRequestSpy = vi.spyOn(mockHttpClient, "sendRequest");
      vi.useFakeTimers();
      // workaround: casting because min testing has issues with httpClient newer versions having extra optional fields
      smsClient = new SmsClient(connectionString, {
        httpClient: mockHttpClient,
      } as SmsClientOptions);
    });

    it("sends with the correct headers", async function () {
      await smsClient.send(testSendRequest);

      const request = sendRequestSpy.mock.calls[0][0];
      if (isNodeLike) {
        assert.equal(request.headers.get("host"), "contoso.api.fake");
      }
      assert.typeOf(request.headers.get(dateHeader), "string");
      assert.isDefined(request.headers.get("authorization"));
      assert.match(
        request.headers.get("authorization") as string,
        /HMAC-SHA256 SignedHeaders=.+&Signature=.+/,
      );
    });

    it("returns the correct results", async function () {
      const smsTestResults = await smsClient.send(testSendRequest);

      const smsTestResult = smsTestResults[0];
      expect(sendRequestSpy).toHaveBeenCalled();
      assert.equal(smsTestResult.httpStatusCode, 202);
      assert.equal(smsTestResult.messageId, "test-message-id-123");
    });

    afterEach(function () {
      vi.restoreAllMocks();
      vi.useRealTimers();
    });
  });

  describe("when getting delivery reports", function () {
    let smsClient: SmsClient;
    beforeEach(function () {
      sendRequestSpy = vi.spyOn(mockHttpClient, "sendRequest");
      smsClient = new SmsClient(connectionString, {
        httpClient: mockHttpClient,
      } as SmsClientOptions);
    });

    it("can get delivery report for existing message", async function () {
      const messageId = "test-message-id-123";
      const result = await smsClient.getDeliveryReport(messageId);

      assert.equal(result.messageId, messageId);
      assert.equal(result.from, "+14255550123");
      assert.equal(result.to, TEST_NUMBER);
      assert.equal(result.deliveryStatus, "Delivered");
      assert.equal(result.deliveryStatusDetails, "Message delivered successfully");
      assert.isArray(result.deliveryAttempts);
      assert.equal(result.deliveryAttempts?.length, 1);
      assert.equal(result.deliveryAttempts?.[0].segmentsSucceeded, 1);
      assert.equal(result.deliveryAttempts?.[0].segmentsFailed, 0);
      assert.equal(result.tag, "test-tag");
      assert.equal(result.httpStatusCode, 200);
    });

    it("handles delivery report not found", async function () {
      const messageId = "00000000-0000-0000-0000-000000000000";

      try {
        await smsClient.getDeliveryReport(messageId);
        assert.fail("Expected error to be thrown for non-existent message ID");
      } catch (error: any) {
        assert.equal(error.statusCode, 404);
        assert.include(error.message, "Not Found");
      }
    });

    afterEach(function () {
      vi.restoreAllMocks();
    });
  });
});
