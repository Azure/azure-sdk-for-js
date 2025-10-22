// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import type { HttpClient, SendRequest } from "@azure/core-rest-pipeline";
import { isNodeLike } from "@azure/core-util";
import type { TokenCredential } from "@azure/identity";
import type { TelcoMessagingClientOptions, SmsSendRequest } from "../../src/index.js";
import { TelcoMessagingClient } from "../../src/index.js";
import { MockHttpClient } from "./utils/mockHttpClient.js";
import type { MockInstance } from "vitest";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

const TEST_NUMBER = "+14255550123";

describe("[mocked] TelcoMessagingClient", async function () {
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

  describe("when instantiating TelcoMessaging client", function () {
    it("can instantiate with a connection string", async function () {
      new TelcoMessagingClient(connectionString);
    });

    it("can instantiate with a url and KeyCredential ", async function () {
      new TelcoMessagingClient(baseUri, new AzureKeyCredential("banana"));
    });

    it("can instantiate with a token", async function () {
      const fakeToken: TokenCredential = {
        getToken: async (_scopes) => {
          return { token: "testToken", expiresOnTimestamp: 11111 };
        },
      };
      new TelcoMessagingClient(baseUri, fakeToken);
    });

    it("has all expected sub-clients", async function () {
      const client = new TelcoMessagingClient(connectionString);
      assert.isDefined(client.sms);
      assert.isDefined(client.optOuts);
      assert.isDefined(client.deliveryReports);
    });
  });

  describe("when sending an SMS via sms sub-client", function () {
    let telcoClient: TelcoMessagingClient;
    beforeEach(function () {
      sendRequestSpy = vi.spyOn(mockHttpClient, "sendRequest");
      vi.useFakeTimers();
      // workaround: casting because min testing has issues with httpClient newer versions having extra optional fields
      telcoClient = new TelcoMessagingClient(connectionString, {
        httpClient: mockHttpClient,
      } as TelcoMessagingClientOptions);
    });

    it("sends with the correct headers", async function () {
      await telcoClient.sms.send(testSendRequest);

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
      const smsTestResults = await telcoClient.sms.send(testSendRequest);

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

  describe("when using optOuts sub-client", function () {
    let telcoClient: TelcoMessagingClient;
    beforeEach(function () {
      sendRequestSpy = vi.spyOn(mockHttpClient, "sendRequest");
      telcoClient = new TelcoMessagingClient(connectionString, {
        httpClient: mockHttpClient,
      } as TelcoMessagingClientOptions);
    });

    it("can add phone numbers to opt-out list", async function () {
      const results = await telcoClient.optOuts.add(TEST_NUMBER, [TEST_NUMBER]);
      
      assert.isArray(results);
      assert.equal(results.length, 1);
      assert.equal(results[0].to, TEST_NUMBER);
      assert.equal(results[0].httpStatusCode, 200);
    });

    it("can check if phone numbers are opted out", async function () {
      const results = await telcoClient.optOuts.check(TEST_NUMBER, [TEST_NUMBER]);
      
      assert.isArray(results);
      assert.equal(results.length, 1);
      assert.equal(results[0].to, TEST_NUMBER);
      assert.equal(results[0].isOptedOut, false);
      assert.equal(results[0].httpStatusCode, 200);
    });

    it("can remove phone numbers from opt-out list", async function () {
      const results = await telcoClient.optOuts.remove(TEST_NUMBER, [TEST_NUMBER]);
      
      assert.isArray(results);
      assert.equal(results.length, 1);
      assert.equal(results[0].to, TEST_NUMBER);
      assert.equal(results[0].httpStatusCode, 200);
    });

    afterEach(function () {
      vi.restoreAllMocks();
    });
  });

  describe("when using deliveryReports sub-client", function () {
    let telcoClient: TelcoMessagingClient;
    beforeEach(function () {
      sendRequestSpy = vi.spyOn(mockHttpClient, "sendRequest");
      telcoClient = new TelcoMessagingClient(connectionString, {
        httpClient: mockHttpClient,
      } as TelcoMessagingClientOptions);
    });

    it("can get delivery report for existing message", async function () {
      const messageId = "test-message-id-123";
      const result = await telcoClient.deliveryReports.get(messageId);
      
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
      const messageId = "non-existent-message-id";
      const result = await telcoClient.deliveryReports.get(messageId);
      
      assert.equal(result.messageId, messageId);
      assert.equal(result.httpStatusCode, 404);
      assert.equal(result.deliveryStatus, "Unknown");
      assert.include(result.errorMessage, "Delivery report not found");
    });

    afterEach(function () {
      vi.restoreAllMocks();
    });
  });
});
