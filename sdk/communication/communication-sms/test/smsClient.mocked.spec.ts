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

import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import sinon from "sinon";
import { apiVersion } from "../src/generated/src/models/parameters";
import { SmsClient, SmsSendRequest } from "../src/smsClient";

const API_VERSION = apiVersion.mapper.defaultValue;

describe("[mocked] SmsClient", async () => {
  const baseUri = "https://contoso.api.fake:443";
  const dateHeader = isNode ? "date" : "x-ms-date";
  let smsClient: SmsClient;
  const mockHttpClient: HttpClient = {
    async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
      return {
        status: 202,
        headers: new HttpHeaders(),
        request: httpRequest,
        parsedBody: {
          value: [
            {
              to: "+18332321226",
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

  beforeEach(() => {
    sinon.stub(Uuid, "generateUuid").returns(mockedGuid);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("can instantiate with a connection string", async () => {
    new SmsClient("endpoint=https://contoso.communicationservices.azure.com:443/;accesskey=secret");
  });

  it("sends a SMS when url and KeyCredential are provided", async () => {
    smsClient = new SmsClient(baseUri, new AzureKeyCredential("banana"), {
      httpClient: mockHttpClient
    });

    const spy = sinon.spy(mockHttpClient, "sendRequest");
    sinon.useFakeTimers();
    const sendRequest: SmsSendRequest = {
      from: "+15558984505651",
      to: ["+15558985487"],
      message: "message"
    };

    const _responses = await smsClient.send(sendRequest);
    const _response = _responses[0];
    sinon.assert.calledOnce(spy);
    assert.equal(_response.httpStatusCode, 202);
    assert.equal(_response.messageId, "id");
    const request = spy.getCall(0).args[0];
    assert.equal(request.url, `${baseUri}/sms?api-version=${API_VERSION}`);
    assert.equal(request.method, "POST");

    const expectedRequestBody = {
      from: sendRequest.from,
      smsRecipients: [
        {
          to: "+15558985487",
          repeatabilityFirstSent: new Date().toUTCString(),
          repeatabilityRequestId: mockedGuid
        }
      ],
      message: sendRequest.message,
      smsSendOptions: {
        enableDeliveryReport: false
      }
    };

    assert.deepEqual(JSON.parse(request.body), expectedRequestBody);
  });

  it("sends SMS when connection string is provided", async () => {
    const connectionString = `endpoint=${baseUri};accesskey=banana`;
    smsClient = new SmsClient(connectionString, { httpClient: mockHttpClient });

    const spy = sinon.spy(mockHttpClient, "sendRequest");
    sinon.useFakeTimers();
    const sendRequest: SmsSendRequest = {
      from: "+15558984505651",
      to: ["+15558985487"],
      message: "message"
    };

    const _responses = await smsClient.send(sendRequest);
    const _response = _responses[0];
    sinon.assert.calledOnce(spy);
    assert.equal(_response.httpStatusCode, 202);
    assert.equal(_response.messageId, "id");
    const request = spy.getCall(0).args[0];
    assert.equal(request.url, `${baseUri}/sms?api-version=${API_VERSION}`);
    assert.equal(request.method, "POST");

    const expectedRequestBody = {
      from: sendRequest.from,
      smsRecipients: [
        {
          to: "+15558985487",
          repeatabilityFirstSent: new Date().toUTCString(),
          repeatabilityRequestId: mockedGuid
        }
      ],
      message: sendRequest.message,
      smsSendOptions: {
        enableDeliveryReport: false
      }
    };

    assert.deepEqual(JSON.parse(request.body), expectedRequestBody);
  });

  it("sets correct headers", async () => {
    smsClient = new SmsClient(baseUri, new AzureKeyCredential("banana"), {
      httpClient: mockHttpClient
    });
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    const sendRequest: SmsSendRequest = {
      from: "+15558984505651",
      to: ["+15558985487"],
      message: "message"
    };
    const _responses = await smsClient.send(sendRequest);
    const _response = _responses[0];
    sinon.assert.calledOnce(spy);
    assert.equal(_response.httpStatusCode, 202);
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
});
