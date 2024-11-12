// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { isNode } from "@azure/core-util";
import type { TokenCredential } from "@azure/identity";
import { SipRoutingClient } from "../../../src/sipRoutingClient.js";
import { getTrunksHttpClient } from "../../public/siprouting/utils/mockHttpClients.js";
import { SDK_VERSION } from "../../../src/utils/constants.js";
import { createMockToken } from "../../public/utils/recordedClient.js";
import type { PipelineRequest } from "@azure/core-rest-pipeline";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("SipRoutingClient - headers", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  let client = new SipRoutingClient(endpoint, new AzureKeyCredential(accessKey), {
    httpClient: getTrunksHttpClient,
  });
  let request: PipelineRequest;

  afterEach(function () {
    vi.restoreAllMocks();
  });

  it("calls the spy", async function () {
    const spy = sinon.spy(getTrunksHttpClient, "sendRequest");
    const iter = await client.listTrunks();
    await iter.next();
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
  });

  it("[node] sets correct host", function (ctx) {
    if (!isNode) {
      ctx.skip();
    }
    assert.equal(request.headers.get("host"), "contoso.spool.azure.local");
  });

  it("sets correct default user-agent", function () {
    const userAgentHeader = isNode ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(`azsdk-js-communication-phone-numbers/${SDK_VERSION}`, "g"),
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
    client = new SipRoutingClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: getTrunksHttpClient,
    });

    const spy = sinon.spy(getTrunksHttpClient, "sendRequest");
    const iter = await client.listTrunks();
    await iter.next();
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

    client = new SipRoutingClient(endpoint, credential, {
      httpClient: getTrunksHttpClient,
    });

    const spy = sinon.spy(getTrunksHttpClient, "sendRequest");
    const iter = await client.listTrunks();
    await iter.next();
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(request.headers.get("authorization") as string, /Bearer ./);
  });

  it("can set custom user-agent prefix", async function () {
    client = new SipRoutingClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: getTrunksHttpClient,
      userAgentOptions: {
        userAgentPrefix: "siproutingclient-headers-test",
      },
    });

    const spy = sinon.spy(getTrunksHttpClient, "sendRequest");
    const iter = await client.listTrunks();
    await iter.next();
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];

    const userAgentHeader = isNode ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(
        `siproutingclient-headers-test azsdk-js-communication-phone-numbers/${SDK_VERSION}`,
        "g",
      ),
    );
  });
});
