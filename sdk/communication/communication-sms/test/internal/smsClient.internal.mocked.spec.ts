// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient } from "@azure/core-http";

import { Uuid } from "../../src/utils/uuid";
import { generateSendMessageRequest } from "../../src/utils/smsUtils";

import { assert } from "chai";
import sinon from "sinon";
import { apiVersion } from "../../src/generated/src/models/parameters";
import { SmsClient, SmsSendRequest } from "../../src/smsClient";
import { MockHttpClient } from "../public/utils/mockHttpClient";

const API_VERSION = apiVersion.mapper.defaultValue;
const TEST_NUMBER = "+14255550123";

describe("[mocked] SmsClient Internal", async () => {
  const baseUri = "https://contoso.api.fake:443";
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

  describe("when sending an SMS", () => {
    let smsClient: SmsClient;
    beforeEach(() => {
      uuidStub = sinon.stub(Uuid, "generateUuid");
      uuidStub.returns(mockedGuid);
      sendRequestSpy = sinon.spy(mockHttpClient, "sendRequest");
      sinon.useFakeTimers();
      smsClient = new SmsClient(connectionString, { httpClient: mockHttpClient });
    });

    it("sends with the correct request body", async () => {
      await smsClient.send(testSendRequest);

      const request = sendRequestSpy.getCall(0).args[0];
      assert.equal(request.url, `${baseUri}/sms?api-version=${API_VERSION}`);
      assert.equal(request.method, "POST");
      const expectedRequestBody = generateSendMessageRequest(testSendRequest);
      assert.deepEqual(JSON.parse(request.body), expectedRequestBody);
    });

    it("generates a new repeatability id each time", async () => {
      await smsClient.send(testSendRequest);
      assert.isTrue(uuidStub.calledOnce);
      await smsClient.send(testSendRequest);
      assert.isTrue(uuidStub.calledTwice);
    });

    afterEach(() => {
      sinon.restore();
    });
  });
});
