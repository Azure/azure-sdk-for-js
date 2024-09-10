// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { Context } from "mocha";
import { PipelineRequest } from "@azure/core-rest-pipeline";
import { SDK_VERSION } from "../../src/utils/constants";
import { AlphaIdsClient } from "../../src";
import { TokenCredential } from "@azure/identity";
import { assert } from "chai";
import { createMockToken } from "../public/utils/recordedClient";
import { configurationHttpClient } from "../public/utils/mockHttpClients";
import { isNodeLike } from "@azure/core-util";
import sinon from "sinon";

describe("AlphaIdsClient - headers", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  let client = new AlphaIdsClient(endpoint, new AzureKeyCredential(accessKey), {
    httpClient: configurationHttpClient,
  });
  let request: PipelineRequest;

  afterEach(function () {
    sinon.restore();
  });

  it("calls the spy", async function () {
    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getDynamicAlphaIdConfiguration();
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
  });

  it("[node] sets correct host", function (this: Context) {
    if (!isNodeLike) {
      this.skip();
    }
    assert.equal(request.headers.get("host"), "contoso.spool.azure.local");
  });

  it("sets correct default user-agent", function () {
    const userAgentHeader = isNodeLike ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(`azsdk-js-communication-alpha-ids/${SDK_VERSION}`, "g"),
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
      /HMAC-SHA256 SignedHeaders=.+&Signature=.+/,
    );
  });

  it("sets signed authorization header with connection string", async function () {
    client = new AlphaIdsClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: configurationHttpClient,
    });

    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getDynamicAlphaIdConfiguration();
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(
      request.headers.get("authorization") as string,
      /HMAC-SHA256 SignedHeaders=.+&Signature=.+/,
    );
  });

  it("sets bearer authorization header with TokenCredential", async function (this: Context) {
    const credential: TokenCredential = createMockToken();

    client = new AlphaIdsClient(endpoint, credential, {
      httpClient: configurationHttpClient,
    });

    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getDynamicAlphaIdConfiguration();
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(request.headers.get("authorization") as string, /Bearer ./);
  });

  it("can set custom user-agent prefix", async function () {
    client = new AlphaIdsClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: configurationHttpClient,
      userAgentOptions: {
        userAgentPrefix: "alphaidsclient-headers-test",
      },
    });

    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getDynamicAlphaIdConfiguration();
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];

    const userAgentHeader = isNodeLike ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(
        `alphaidsclient-headers-test azsdk-js-communication-alpha-ids/${SDK_VERSION}`,
        "g",
      ),
    );
  });
});
