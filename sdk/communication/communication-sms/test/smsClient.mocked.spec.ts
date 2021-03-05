// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpClient,
  HttpHeaders,
  WebResourceLike,
  HttpOperationResponse,
  isNode
} from "@azure/core-http";

import { Uuid } from "../src/utils/uuid";
import { generateSendMessageRequest } from "../src/utils/smsUtils";

import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import sinon from "sinon";
import { apiVersion } from "../src/generated/src/models/parameters";
import { SmsClient, SmsSendRequest } from "../src/smsClient";

const API_VERSION = apiVersion.mapper.defaultValue;
const TEST_NUMBER = "+18005551234";

describe("[mocked] SmsClient", async () => {
  const baseUri = "https://contoso.api.fake:443";
  const connectionString = `endpoint=${baseUri};accesskey=banana`;
  const dateHeader = isNode ? "date" : "x-ms-date";
  let sendRequestSpy: sinon.SinonSpy;
  let uuidStub: sinon.SinonStub;
  const mockHttpClient: HttpClient = {
    async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
      return {
        status: 202,
        headers: new HttpHeaders(),
        request: httpRequest,
        parsedBody: {
          value: [
            {
              to: TEST_NUMBER,
              messageId: "id",
              httpStatusCode: 202,
              errorMessage: null,
              repeatabilityResult: "accepted",
              successful: true
            }
          ]
        }
      };
    }
  };
  const mockedGuid = "42bf408f-1931-4314-8971-2b538625a2b0";

  const testSendRequest: SmsSendRequest = {
    from: TEST_NUMBER,
    to: [TEST_NUMBER],
    message: "message"
  };

  it("can instantiate with a connection string", async () => {
    new SmsClient(connectionString);
  });

  it("can instantiate with a url and KeyCredential ", async () => {
    new SmsClient(baseUri, new AzureKeyCredential("banana"));
  });

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

    it("sends with the correct headers", async () => {
      await smsClient.send(testSendRequest);

      const request = sendRequestSpy.getCall(0).args[0];
      if (isNode) {
        assert.equal(request.headers.get("host"), "contoso.api.fake:443");
      }
      assert.typeOf(request.headers.get(dateHeader), "string");
      assert.isDefined(request.headers.get("authorization"));
      assert.match(
        request.headers.get("authorization") as string,
        /HMAC-SHA256 SignedHeaders=.+&Signature=.+/
      );
    });

    it("returns the correct results", async () => {
      const smsTestResults = await smsClient.send(testSendRequest);

      const smsTestResult = smsTestResults[0];
      sinon.assert.calledOnce(sendRequestSpy);
      assert.equal(smsTestResult.httpStatusCode, 202);
      assert.equal(smsTestResult.messageId, "id");
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
