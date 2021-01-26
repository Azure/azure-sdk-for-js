// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpClient,
  HttpHeaders,
  WebResourceLike,
  HttpOperationResponse,
  isNode
} from "@azure/core-http";
//import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import sinon from "sinon";
import { SendRequest } from "../src/smsClient";
import { apiVersion } from "../src/generated/src/models/parameters";

const API_VERSION = apiVersion.mapper.defaultValue;

describe("[mocked] SmsClient", async () => {
  const baseUri = "https://contoso.api.fake:443";
  const dateHeader = isNode ? "date" : "x-ms-date";
  //let smsClient: SmsClient;
  const mockHttpClient: HttpClient = {
    async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
      return {
        status: 200,
        headers: new HttpHeaders(),
        request: httpRequest,
        parsedBody: {
          messageId: "id"
        }
      };
    }
  };

  afterEach(() => {
    sinon.restore();
  });

  it("can instantiate with a connection string", async () => {
    //new SmsClient("endpoint=https://contoso.communicationservices.azure.com:443/;accesskey=secret");
  });

  it("sends a SMS when url and KeyCredential are provided", async () => {
    //smsClient = new SmsClient(baseUri, new AzureKeyCredential("banana"), {
    //  httpClient: mockHttpClient
    //});
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    const sendRequest: SendRequest = {
      from: "+18768984505651",
      to: ["+18768985487"],
      message: "message"
    };
    //const { _response } = await smsClient.send(sendRequest);

    sinon.assert.calledOnce(spy);
    //assert.equal(_response.status, 200);
    //assert.equal(_response.parsedBody.messageId, "id");

    const request = spy.getCall(0).args[0];

    assert.equal(request.url, `${baseUri}/sms?api-version=${API_VERSION}`);
    assert.equal(request.method, "POST");
    assert.deepEqual(JSON.parse(request.body), { ...sendRequest, sendSmsOptions: {} });
  });

  it("sends SMS when connection string is provided", async () => {
    //const connectionString = `endpoint=${baseUri};accesskey=banana`;
    //smsClient = new SmsClient(connectionString, { httpClient: mockHttpClient });
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    const sendRequest: SendRequest = {
      from: "+18768984505651",
      to: ["+18768985487"],
      message: "message"
    };
    //const { _response } = await smsClient.send(sendRequest);

    sinon.assert.calledOnce(spy);
    //assert.equal(_response.status, 200);
    //assert.equal(_response.parsedBody.messageId, "id");

    const request = spy.getCall(0).args[0];

    assert.equal(request.url, `${baseUri}/sms?api-version=${API_VERSION}`);
    assert.equal(request.method, "POST");
    assert.deepEqual(JSON.parse(request.body), { ...sendRequest, sendSmsOptions: {} });
  });

  it("sets correct headers", async () => {
    //smsClient = new SmsClient(baseUri, new AzureKeyCredential("banana"), {
    //  httpClient: mockHttpClient
    //});
    const spy = sinon.spy(mockHttpClient, "sendRequest");
    //const sendRequest: SendRequest = {
    //  from: "+18768984505651",
    //  to: ["+18768985487"],
    //  message: "message"
    //};
    //const { _response } = await smsClient.send(sendRequest);

    sinon.assert.calledOnce(spy);
    //assert.equal(_response.status, 200);

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
