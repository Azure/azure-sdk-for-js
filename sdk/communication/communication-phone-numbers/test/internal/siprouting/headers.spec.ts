// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { isNode } from "@azure/core-util";
import { TokenCredential } from "@azure/identity";
import { assert } from "chai";
import sinon from "sinon";
import { SipRoutingClient } from "../../../src/sipRoutingClient";
import { getTrunksHttpClient } from "../../public/siprouting/utils/mockHttpClients";
import { SDK_VERSION } from "../../../src/utils/constants";
import { Context } from "mocha";
import { createMockToken } from "../../public/utils/recordedClient";
import { PipelineRequest } from "@azure/core-rest-pipeline";

describe("SipRoutingClient - headers", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  let client = new SipRoutingClient(endpoint, new AzureKeyCredential(accessKey), {
    httpClient: getTrunksHttpClient,
  });
  let request: PipelineRequest;

  afterEach(function () {
    sinon.restore();
  });

  it("calls the spy", async function () {
    const spy = sinon.spy(getTrunksHttpClient, "sendRequest");
    const iter = await client.listTrunks();
    await iter.next();
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

  it("sets bearer authorization header with TokenCredential", async function (this: Context) {
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
