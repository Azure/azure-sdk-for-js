// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import type { PipelineRequest } from "@azure/core-rest-pipeline";
import { SDK_VERSION } from "$internal/utils/constants.js";
import { ShortCodesClient } from "@azure-tools/communication-short-codes";
import type { TokenCredential } from "@azure/identity";
import { createMockToken } from "../public/utils/recordedClient.js";
import { getUSProgramBriefHttpClient } from "../public/utils/mockHttpClients.js";
import { isNodeLike } from "@azure/core-util";
import { describe, it, assert, expect, vi, afterEach } from "vitest";

describe("ShortCodesClient - headers", () => {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  let client = new ShortCodesClient(endpoint, new AzureKeyCredential(accessKey), {
    httpClient: getUSProgramBriefHttpClient,
  });
  let request: PipelineRequest;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls the spy", async () => {
    const spy = vi.spyOn(getUSProgramBriefHttpClient, "sendRequest");
    await client.getUSProgramBrief("9fb78ef0-5704-4866-bca2-6a040ec83c0b");
    expect(spy).toHaveBeenCalledOnce();

    request = spy.mock.calls[0][0];
  });

  it("[node] sets correct host", (ctx) => {
    if (!isNodeLike) {
      ctx.skip();
    }
    assert.equal(request.headers.get("host"), "contoso.spool.azure.local");
  });

  it("sets correct default user-agent", () => {
    const userAgentHeader = isNodeLike ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(`azsdk-js-communication-short-codes/${SDK_VERSION}`, "g"),
    );
  });

  it("sets date header", () => {
    const dateHeader = "x-ms-date";
    assert.typeOf(request.headers.get(dateHeader), "string");
  });

  it("sets signed authorization header with KeyCredential", () => {
    assert.isDefined(request.headers.get("authorization"));
    assert.match(
      request.headers.get("authorization") as string,
      /HMAC-SHA256 SignedHeaders=.+&Signature=.+/,
    );
  });

  it("sets signed authorization header with connection string", async () => {
    client = new ShortCodesClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: getUSProgramBriefHttpClient,
    });

    const spy = vi.spyOn(getUSProgramBriefHttpClient, "sendRequest");
    await client.getUSProgramBrief("9fb78ef0-5704-4866-bca2-6a040ec83c0b");
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

    client = new ShortCodesClient(endpoint, credential, {
      httpClient: getUSProgramBriefHttpClient,
    });

    const spy = vi.spyOn(getUSProgramBriefHttpClient, "sendRequest");
    await client.getUSProgramBrief("9fb78ef0-5704-4866-bca2-6a040ec83c0b");
    expect(spy).toHaveBeenCalledOnce();

    request = spy.mock.calls[0][0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(request.headers.get("authorization") as string, /Bearer ./);
  });

  it("can set custom user-agent prefix", async () => {
    client = new ShortCodesClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: getUSProgramBriefHttpClient,
      userAgentOptions: {
        userAgentPrefix: "shortcodesclient-headers-test",
      },
    });

    const spy = vi.spyOn(getUSProgramBriefHttpClient, "sendRequest");
    await client.getUSProgramBrief("9fb78ef0-5704-4866-bca2-6a040ec83c0b");
    expect(spy).toHaveBeenCalledOnce();

    request = spy.mock.calls[0][0];

    const userAgentHeader = isNodeLike ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(
        `shortcodesclient-headers-test azsdk-js-communication-short-codes/${SDK_VERSION}`,
        "g",
      ),
    );
  });
});
