// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, SendRequest } from "@azure/core-rest-pipeline";

import { generateSendMessageRequest } from "../../src/utils/smsUtils.js";
import { Uuid } from "../../src/utils/uuid.js";
import { apiVersion } from "../../src/generated/src/models/parameters.js";
import type { SmsSendRequest } from "../../src/smsSubClient.js";
import { TelcoMessagingClient } from "../../src/telcoMessagingClient.js";
import { MockHttpClient } from "../public/utils/mockHttpClient.js";
import type { MockInstance } from "vitest";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

const API_VERSION = apiVersion.mapper.defaultValue;
const TEST_NUMBER = "+14255550123";

describe("[mocked] TelcoMessagingClient Internal", async () => {
  const baseUri = "https://contoso.api.fake";
  const connectionString = `endpoint=${baseUri};accesskey=banana`;
  let sendRequestSpy: MockInstance<SendRequest>;
  let uuidStub: MockInstance<() => string>;
  const mockHttpClient: HttpClient = new MockHttpClient(TEST_NUMBER);
  const mockedGuid = "42bf408f-1931-4314-8971-2b538625a2b0";

  const testSendRequest: SmsSendRequest = {
    from: TEST_NUMBER,
    to: [TEST_NUMBER],
    message: "message",
  };

  describe("when sending an SMS via sms sub-client", () => {
    let telcoMessagingClient: TelcoMessagingClient;
    beforeEach(() => {
      uuidStub = vi.spyOn(Uuid, "generateUuid");
      uuidStub.mockReturnValue(mockedGuid);
      sendRequestSpy = vi.spyOn(mockHttpClient, "sendRequest");
      vi.useFakeTimers();
      telcoMessagingClient = new TelcoMessagingClient(connectionString, { httpClient: mockHttpClient });
    });

    it("sends with the correct request body", async () => {
      await telcoMessagingClient.sms.send(testSendRequest);

      const request = sendRequestSpy.mock.calls[0][0];
      assert.equal(request.url, `${baseUri}/sms?api-version=${API_VERSION}`);
      assert.equal(request.method, "POST");
      const expectedRequestBody = generateSendMessageRequest(testSendRequest);
      assert.deepEqual(JSON.parse(request.body as string), expectedRequestBody);
    });

    it("generates a new repeatability id each time", async () => {
      await telcoMessagingClient.sms.send(testSendRequest);
      expect(uuidStub).toHaveBeenCalledOnce();
      await telcoMessagingClient.sms.send(testSendRequest);
      expect(uuidStub).toHaveBeenCalledTimes(2);
    });

    afterEach(() => {
      vi.restoreAllMocks();
      vi.useRealTimers();
    });
  });
});
