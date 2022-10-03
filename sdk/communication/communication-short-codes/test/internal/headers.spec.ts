// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { Context } from "mocha";
import { PipelineRequest } from "@azure/core-rest-pipeline";
import { SDK_VERSION } from "../../src/utils/constants";
import { ShortCodesClient } from "../../src/shortCodesClient";
import { TokenCredential } from "@azure/identity";
import { assert } from "chai";
import { createMockToken } from "../public/utils/recordedClient";
import { getUSProgramBriefHttpClient } from "../public/utils/mockHttpClients";
import { isNode } from "@azure/test-utils";
import sinon from "sinon";

describe("ShortCodesClient - headers", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  let client = new ShortCodesClient(endpoint, new AzureKeyCredential(accessKey), {
    httpClient: getUSProgramBriefHttpClient,
  });
  let request: PipelineRequest;

  afterEach(function () {
    sinon.restore();
  });

  it("calls the spy", async function () {
    const spy = sinon.spy(getUSProgramBriefHttpClient, "sendRequest");
    await client.getUSProgramBrief("9fb78ef0-5704-4866-bca2-6a040ec83c0b");
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
  });

  it("[node] sets correct host", function (this: Context) {
    if (!isNode) {
      this.skip();
    }
    assert.equal(request.headers.get("host"), "contoso.spool.azure.local");
  });

  it("sets correct default user-agent", function () {
    const userAgentHeader = isNode ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(`azsdk-js-communication-short-codes/${SDK_VERSION}`, "g")
    );
  });

  it("sets date header", function () {
    const dateHeader = "x-ms-date";
    assert.typeOf(request.headers.get(dateHeader), "string");
  });

  it("sets signed authorization header with KeyCredential", function () {
    assert.isDefined(request.headers.get("authorization"));
    assert.match(
      request.headers.get("authorization") as string,
      /HMAC-SHA256 SignedHeaders=.+&Signature=.+/
    );
  });

  it("sets signed authorization header with connection string", async function () {
    client = new ShortCodesClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: getUSProgramBriefHttpClient,
    });

    const spy = sinon.spy(getUSProgramBriefHttpClient, "sendRequest");
    await client.getUSProgramBrief("9fb78ef0-5704-4866-bca2-6a040ec83c0b");
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(
      request.headers.get("authorization") as string,
      /HMAC-SHA256 SignedHeaders=.+&Signature=.+/
    );
  });

  it("sets bearer authorization header with TokenCredential", async function (this: Context) {
    const credential: TokenCredential = createMockToken();

    client = new ShortCodesClient(endpoint, credential, {
      httpClient: getUSProgramBriefHttpClient,
    });

    const spy = sinon.spy(getUSProgramBriefHttpClient, "sendRequest");
    await client.getUSProgramBrief("9fb78ef0-5704-4866-bca2-6a040ec83c0b");
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(request.headers.get("authorization") as string, /Bearer ./);
  });

  it("can set custom user-agent prefix", async function () {
    client = new ShortCodesClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: getUSProgramBriefHttpClient,
      userAgentOptions: {
        userAgentPrefix: "shortcodesclient-headers-test",
      },
    });

    const spy = sinon.spy(getUSProgramBriefHttpClient, "sendRequest");
    await client.getUSProgramBrief("9fb78ef0-5704-4866-bca2-6a040ec83c0b");
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];

    const userAgentHeader = isNode ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(
        `shortcodesclient-headers-test azsdk-js-communication-short-codes/${SDK_VERSION}`,
        "g"
      )
    );
  });
});
