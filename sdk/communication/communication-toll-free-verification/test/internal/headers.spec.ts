// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import type { PipelineRequest } from "@azure/core-rest-pipeline";
import { SDK_VERSION } from "$internal/utils/constants.js";
import type { TokenCredential } from "@azure/identity";
import { TollFreeVerificationClient } from "@azure-tools/communication-toll-free-verification";
import { configurationHttpClient } from "../public/utils/mockHttpClients.js";
import { createMockToken } from "../public/utils/recordedClient.js";
import { isNodeLike } from "@azure/core-util";
import { describe, it, assert, expect, vi, afterEach } from "vitest";

describe("TollFreeVerificationClient - headers", () => {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  const campaignBriefId = "63215741-b596-4eb4-a9c0-b2905ce22cb0";
  let client = new TollFreeVerificationClient(endpoint, new AzureKeyCredential(accessKey), {
    httpClient: configurationHttpClient,
  });
  let request: PipelineRequest;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls the spy", async () => {
    const spy = vi.spyOn(configurationHttpClient, "sendRequest");
    await client.getCampaignBrief(campaignBriefId, "US");
    expect(spy).toHaveBeenCalledOnce();

    request = spy.mock.calls[0][0];
  });

  it("[node] sets correct host", (ctx) => {
    if (!isNodeLike) {
      ctx.skip();
    }
    assert.equal(request.headers.get("host"), "contoso.spool.azure.local");
  });

  it("sets correct default user-agent", async () => {
    const userAgentHeader = isNodeLike ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(`azsdk-js-communication-toll-free-verification/${SDK_VERSION}`, "g"),
    );
  });

  it("sets date header", async () => {
    const dateHeader = "x-ms-date";
    assert.typeOf(request.headers.get(dateHeader), "string");
  });

  it("sets signed authorization header with KeyCredential", async () => {
    assert.isDefined(request.headers.get("authorization"));
    assert.match(
      request.headers.get("authorization") as string,
      /HMAC-SHA256 SignedHeaders=.+&Signature=.+/,
    );
  });

  it("sets signed authorization header with connection string", async () => {
    client = new TollFreeVerificationClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: configurationHttpClient,
    });

    const spy = vi.spyOn(configurationHttpClient, "sendRequest");
    await client.getCampaignBrief(campaignBriefId, "US");
    expect(spy).toHaveBeenCalledOnce();

    request = spy.mock.calls[0][0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(
      request.headers.get("authorization") as string,
      /HMAC-SHA256 SignedHeaders=.+&Signature=.+/,
    );
  });

  it("sets bearer authorization header with TokenCredential", async () => {
    const credential: TokenCredential = createMockToken();

    client = new TollFreeVerificationClient(endpoint, credential, {
      httpClient: configurationHttpClient,
    });

    const spy = vi.spyOn(configurationHttpClient, "sendRequest");
    await client.getCampaignBrief(campaignBriefId, "US");
    expect(spy).toHaveBeenCalledOnce();

    request = spy.mock.calls[0][0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(request.headers.get("authorization") as string, /Bearer ./);
  });

  it("can set custom user-agent prefix", async () => {
    client = new TollFreeVerificationClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: configurationHttpClient,
      userAgentOptions: {
        userAgentPrefix: "tollfreeverificationclient-headers-test",
      },
    });

    const spy = vi.spyOn(configurationHttpClient, "sendRequest");
    await client.getCampaignBrief(campaignBriefId, "US");
    expect(spy).toHaveBeenCalledOnce();

    request = spy.mock.calls[0][0];

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
