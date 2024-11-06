// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import type { PipelineRequest } from "@azure/core-rest-pipeline";
import { SDK_VERSION } from "../../src/utils/constants.js";
import { AlphaIdsClient } from "../../src/index.js";
import type { TokenCredential } from "@azure/identity";
import { createMockToken } from "../public/utils/recordedClient.js";
import { configurationHttpClient } from "../public/utils/mockHttpClients.js";
import { isNodeLike } from "@azure/core-util";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("AlphaIdsClient - headers", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  let client = new AlphaIdsClient(endpoint, new AzureKeyCredential(accessKey), {
    httpClient: configurationHttpClient,
  });
  let request: PipelineRequest;

  afterEach(function () {
    vi.restoreAllMocks();
  });

  it("calls the spy", async function () {
    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getDynamicAlphaIdConfiguration();
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
  });

  it("[node] sets correct host", function (ctx) {
    if (!isNodeLike) {
      ctx.skip();
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

  it("sets bearer authorization header with TokenCredential", async function (ctx) {
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
