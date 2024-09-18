// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { Context } from "mocha";
import { PipelineRequest } from "@azure/core-rest-pipeline";
import { SDK_VERSION } from "../../src/utils/constants";
import { TokenCredential } from "@azure/identity";
import { TollFreeVerificationClient } from "../../src";
import { assert } from "chai";
import { configurationHttpClient } from "../public/utils/mockHttpClients";
import { createMockToken } from "../public/utils/recordedClient";
import { isNodeLike } from "@azure/core-util";
import sinon from "sinon";

describe("TollFreeVerificationClient - headers", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  const campaignBriefId = "63215741-b596-4eb4-a9c0-b2905ce22cb0";
  let client = new TollFreeVerificationClient(endpoint, new AzureKeyCredential(accessKey), {
    httpClient: configurationHttpClient,
  });
  let request: PipelineRequest;

  afterEach(function () {
    sinon.restore();
  });

  it("calls the spy", async function () {
    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getCampaignBrief(campaignBriefId, "US");
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
      new RegExp(`azsdk-js-communication-toll-free-verification/${SDK_VERSION}`, "g"),
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
    client = new TollFreeVerificationClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: configurationHttpClient,
    });

    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getCampaignBrief(campaignBriefId, "US");
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

    client = new TollFreeVerificationClient(endpoint, credential, {
      httpClient: configurationHttpClient,
    });

    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getCampaignBrief(campaignBriefId, "US");
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(request.headers.get("authorization") as string, /Bearer ./);
  });

  it("can set custom user-agent prefix", async function () {
    client = new TollFreeVerificationClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: configurationHttpClient,
      userAgentOptions: {
        userAgentPrefix: "tollfreeverificationclient-headers-test",
      },
    });

    const spy = sinon.spy(configurationHttpClient, "sendRequest");
    await client.getCampaignBrief(campaignBriefId, "US");
    sinon.assert.calledOnce(spy);

    request = spy.getCall(0).args[0];

    const userAgentHeader = isNodeLike ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(
        `tollfreeverificationclient-headers-test azsdk-js-communication-toll-free-verification/${SDK_VERSION}`,
        "g",
      ),
    );
  });
});
