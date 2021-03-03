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
import { SmsClient, SmsSendRequest, SmsSendResult } from "../src/smsClient";

const API_VERSION = apiVersion.mapper.defaultValue;

describe("[mocked] SmsClient", async () => {
  const baseUri = "https://contoso.api.fake:443";
  const dateHeader = isNode ? "date" : "x-ms-date";
  let smsClient: SmsClient;
  let spy: sinon.SinonSpy;
  const mockHttpClient: HttpClient = {
    async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
      return {
        status: 202,
        headers: new HttpHeaders(),
        request: httpRequest,
        parsedBody: {
          value: [
            {
              to: "+15558985487",
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
    from: "+15558984505651",
    to: ["+15558985487"],
    message: "message"
  };
  let testResults: SmsSendResult[];

  //Helper functions
  const shouldReturnCorrectValues = () => {
    it("returns the correct results", () => {
      const _response = testResults[0];
      sinon.assert.calledOnce(spy);
      assert.equal(_response.httpStatusCode, 202);
      assert.equal(_response.messageId, "id");
    });
  };

  const shouldSendCorrectRequest = () => {
    it("sends with the correct request body", () => {
      const request = spy.getCall(0).args[0];
      assert.equal(request.url, `${baseUri}/sms?api-version=${API_VERSION}`);
      assert.equal(request.method, "POST");
      const expectedRequestBody = generateSendMessageRequest(testSendRequest);
      assert.deepEqual(JSON.parse(request.body), expectedRequestBody);
    });
  };

  const shouldSetCorrectHeaders = () => {
    it("sends with the correct headers", () => {
      const request = spy.getCall(0).args[0];
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
  };

  describe("when client instantiated with connection string", async () => {
    const connectionString = `endpoint=${baseUri};accesskey=banana`;
    before(async () => {
      sinon.stub(Uuid, "generateUuid").returns(mockedGuid);
      spy = sinon.spy(mockHttpClient, "sendRequest");
      sinon.useFakeTimers();

      smsClient = new SmsClient(connectionString, { httpClient: mockHttpClient });
      testResults = await smsClient.send(testSendRequest);
    });

    shouldSendCorrectRequest();
    shouldSetCorrectHeaders();
    shouldReturnCorrectValues();

    after(() => {
      sinon.restore();
    });
  });

  describe("when instantiating client with url and KeyCredential", async () => {
    before(async () => {
      sinon.stub(Uuid, "generateUuid").returns(mockedGuid);
      spy = sinon.spy(mockHttpClient, "sendRequest");
      sinon.useFakeTimers();

      smsClient = new SmsClient(baseUri, new AzureKeyCredential("banana"), {
        httpClient: mockHttpClient
      });
      testResults = await smsClient.send(testSendRequest);
    });

    shouldSendCorrectRequest();
    shouldSetCorrectHeaders();
    shouldReturnCorrectValues();

    after(() => {
      sinon.restore();
    });
  });
});
