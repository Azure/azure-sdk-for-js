// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { isNodeLike } from "@azure/core-util";
import type { TokenCredential } from "@azure/identity";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
import { getPhoneNumberHttpClient } from "../public/utils/mockHttpClients.js";
import { SDK_VERSION } from "$internal/utils/constants.js";
import { createMockToken } from "../public/utils/recordedClient.js";
import type { PipelineRequest } from "@azure/core-rest-pipeline";
import { describe, it, assert, expect, vi, afterEach } from "vitest";

describe("PhoneNumbersClient - headers", () => {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  let client = new PhoneNumbersClient(endpoint, new AzureKeyCredential(accessKey), {
    httpClient: getPhoneNumberHttpClient,
  });
  let request: PipelineRequest;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls the spy", async () => {
    const spy = vi.spyOn(getPhoneNumberHttpClient, "sendRequest");
    await client.getPurchasedPhoneNumber("+18005550100");
    expect(spy).toHaveBeenCalledOnce();

    request = spy.mock.calls[0][0];
  });

  it.skipIf(!isNodeLike)("[node] sets correct host", () => {
    assert.equal(request.headers.get("host"), "contoso.spool.azure.local");
  });

  it("sets correct default user-agent", () => {
    const userAgentHeader = isNodeLike ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(`azsdk-js-communication-phone-numbers/${SDK_VERSION}`, "g"),
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
    client = new PhoneNumbersClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: getPhoneNumberHttpClient,
    });

    const spy = vi.spyOn(getPhoneNumberHttpClient, "sendRequest");
    await client.getPurchasedPhoneNumber("+18005550100");
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

    client = new PhoneNumbersClient(endpoint, credential, {
      httpClient: getPhoneNumberHttpClient,
    });

    const spy = vi.spyOn(getPhoneNumberHttpClient, "sendRequest");
    await client.getPurchasedPhoneNumber("+18005550100");
    expect(spy).toHaveBeenCalledOnce();

    request = spy.mock.calls[0][0];
    assert.isDefined(request.headers.get("authorization"));
    assert.match(request.headers.get("authorization") as string, /Bearer ./);
  });

  it("can set custom user-agent prefix", async () => {
    client = new PhoneNumbersClient(`endpoint=${endpoint};accessKey=${accessKey}`, {
      httpClient: getPhoneNumberHttpClient,
      userAgentOptions: {
        userAgentPrefix: "phonenumbersclient-headers-test",
      },
    });

    const spy = vi.spyOn(getPhoneNumberHttpClient, "sendRequest");
    await client.getPurchasedPhoneNumber("+18005550100");
    expect(spy).toHaveBeenCalledOnce();

    request = spy.mock.calls[0][0];

    const userAgentHeader = isNodeLike ? "user-agent" : "x-ms-useragent";
    assert.match(
      request.headers.get(userAgentHeader) as string,
      new RegExp(
        `phonenumbersclient-headers-test azsdk-js-communication-phone-numbers/${SDK_VERSION}`,
        "g",
      ),
    );
  });
});
