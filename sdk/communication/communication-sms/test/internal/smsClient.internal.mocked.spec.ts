// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient } from "@azure/core-rest-pipeline";

import { generateSendMessageRequest } from "../../src/utils/smsUtils.js";
import { Uuid } from "../../src/utils/uuid.js";
import { apiVersion } from "../../src/generated/src/models/parameters.js";
import type { SmsSendRequest } from "../../src/smsClient.js";
import { SmsClient } from "../../src/smsClient.js";
import { MockHttpClient } from "../public/utils/mockHttpClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

const API_VERSION = apiVersion.mapper.defaultValue;
const TEST_NUMBER = "+14255550123";

describe("[mocked] SmsClient Internal", async function () {
  const baseUri = "https://contoso.api.fake";
  const connectionString = `endpoint=${baseUri};accesskey=banana`;
  let sendRequestSpy: sinon.SinonSpy;
  let uuidStub: sinon.SinonStub;
  const mockHttpClient: HttpClient = new MockHttpClient(TEST_NUMBER);
  const mockedGuid = "42bf408f-1931-4314-8971-2b538625a2b0";

  const testSendRequest: SmsSendRequest = {
    from: TEST_NUMBER,
    to: [TEST_NUMBER],
    message: "message",
  };

  describe("when sending an SMS", function () {
    let smsClient: SmsClient;
    beforeEach(function () {
      uuidStub = vi.spyOn(Uuid, "generateUuid");
      uuidStub.returns(mockedGuid);
      sendRequestSpy = sinon.spy(mockHttpClient, "sendRequest");
      sinon.useFakeTimers();
      smsClient = new SmsClient(connectionString, { httpClient: mockHttpClient });
    });

    it("sends with the correct request body", async function () {
      await smsClient.send(testSendRequest);

      const request = sendRequestSpy.getCall(0).args[0];
      assert.equal(request.url, `${baseUri}/sms?api-version=${API_VERSION}`);
      assert.equal(request.method, "POST");
      const expectedRequestBody = generateSendMessageRequest(testSendRequest);
      assert.deepEqual(JSON.parse(request.body as string), expectedRequestBody);
    });

    it("generates a new repeatability id each time", async function () {
      await smsClient.send(testSendRequest);
      assert.isTrue(uuidStub.calledOnce);
      await smsClient.send(testSendRequest);
      assert.isTrue(uuidStub.calledTwice);
    });

    afterEach(function () {
      vi.restoreAllMocks();
    });
  });
});
