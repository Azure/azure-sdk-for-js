// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationUserIdentifier } from "@azure/communication-common";
import { isCommunicationUserIdentifier } from "@azure/communication-common";
import {
  createMockHttpClient,
  getTokenForTeamsUserHttpClient,
  getTokenHttpClient,
} from "./utils/mockHttpClients.js";
import {
  CommunicationIdentityClient,
  RestError,
  type CommunicationIdentityClientOptions,
} from "../../src/index.js";
import { TestCommunicationIdentityClient } from "./utils/testCommunicationIdentityClient.js";
import { describe, it, assert, expect, vi, afterEach } from "vitest";

describe("CommunicationIdentityClient [Mocked]", () => {
  const dateHeader = "x-ms-date";
  const user: CommunicationUserIdentifier = { communicationUserId: "ACS_ID" };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("creates instance of CommunicationIdentityClient", () => {
    const client = new CommunicationIdentityClient(
      "endpoint=https://contoso.spool.azure.local;accesskey=banana",
    );
    assert.instanceOf(client, CommunicationIdentityClient);
  });

  it("sets correct headers", async () => {
    const client = new TestCommunicationIdentityClient();
    const spy = vi.spyOn(getTokenHttpClient, "sendRequest");

    await client.getTokenTest(user, ["chat"]);
    expect(spy).toHaveBeenCalledOnce();

    const request = spy.mock.calls[0][0];

    assert.equal(request.headers.get("host"), "contoso.spool.azure.local");

    assert.typeOf(request.headers.get(dateHeader), "string");
    assert.isDefined(request.headers.get("authorization"));
    assert.match(
      request.headers.get("authorization") as string,
      /HMAC-SHA256 SignedHeaders=.+&Signature=.+/,
    );
  });

  it("sends the expected api-version", async () => {
    const client = new TestCommunicationIdentityClient();
    const spy = vi.spyOn(getTokenHttpClient, "sendRequest");

    await client.getTokenTest(user, ["chat"]);
    expect(spy).toHaveBeenCalledOnce();

    // Asserted directly rather than relying on playback: a wrong api-version
    // surfaces there as a recording mismatch, which is harder to read than a
    // failed assertion naming the expected value.
    const request = spy.mock.calls[0][0];
    assert.include(request.url, "api-version=2026-09-23");
  });

  it("sends scopes in issue token request", async () => {
    const client = new TestCommunicationIdentityClient();
    const spy = vi.spyOn(getTokenHttpClient, "sendRequest");
    const response = await client.getTokenTest(user, ["chat"]);

    assert.equal(response.token, "token");
    assert.equal(response.expiresOn.toDateString(), new Date("2011/11/30").toDateString());
    expect(spy).toHaveBeenCalledOnce();

    const request = spy.mock.calls[0][0];
    assert.deepEqual(JSON.parse(request.body as string), { scopes: ["chat"] });
  });

  it("preserves legacy operation options", async () => {
    const client = new TestCommunicationIdentityClient();
    const spy = vi.spyOn(getTokenHttpClient, "sendRequest");

    const response = await client.getTokenTest(user, ["chat"], {
      requestOptions: {
        customHeaders: { "x-custom-header": "custom-value" },
        shouldDeserialize: false,
      },
      serializerOptions: { xml: {} },
    });

    const request = spy.mock.calls[0][0];
    assert.equal(request.headers.get("x-custom-header"), "custom-value");
    assert.typeOf(response.expiresOn, "string");
  });

  it("preserves the shouldDeserialize callback", async () => {
    const client = new TestCommunicationIdentityClient();
    const order: string[] = [];
    const shouldDeserialize = vi.fn(() => {
      order.push("shouldDeserialize");
      return false;
    });
    const onResponse = vi.fn((_response, flatResponse) => {
      order.push("onResponse");
      assert.typeOf((flatResponse as { expiresOn: unknown }).expiresOn, "string");
    });

    const response = await client.getTokenTest(user, ["chat"], {
      requestOptions: { shouldDeserialize },
      onResponse,
    });

    expect(shouldDeserialize).toHaveBeenCalledOnce();
    expect(onResponse).toHaveBeenCalledOnce();
    assert.deepEqual(order, ["shouldDeserialize", "onResponse"]);
    assert.typeOf(response.expiresOn, "string");
  });

  it("bypasses generated error handling when shouldDeserialize is false", async () => {
    const httpClient = createMockHttpClient(400, {
      error: { code: "BadRequest", message: "bad request" },
    });
    const client = new CommunicationIdentityClient(
      "endpoint=https://contoso.spool.azure.local;accesskey=banana",
      { httpClient } as CommunicationIdentityClientOptions,
    );

    const response = await client.getToken(user, ["chat"], {
      requestOptions: { shouldDeserialize: false },
    });

    assert.deepEqual(response, {
      error: { code: "BadRequest", message: "bad request" },
    });
  });

  it("preserves the legacy onResponse error arguments", async () => {
    const responseBody = { error: { code: "BadRequest", message: "bad request" } };
    const client = new CommunicationIdentityClient(
      "endpoint=https://contoso.spool.azure.local;accesskey=banana",
      {
        httpClient: createMockHttpClient(400, responseBody),
      } as CommunicationIdentityClientOptions,
    );
    const onResponse = vi.fn();

    await expect(client.getToken(user, ["chat"], { onResponse })).rejects.toThrow(RestError);

    expect(onResponse).toHaveBeenCalledOnce();
    const [rawResponse, flatResponse, error] = onResponse.mock.calls[0];
    assert.equal(rawResponse.status, 400);
    assert.deepEqual(flatResponse, responseBody);
    assert.instanceOf(error, RestError);
  });

  it("[getToken] excludes _response from results", async () => {
    const client = new TestCommunicationIdentityClient();
    const response = await client.getTokenTest(user, ["chat"]);

    assert.isFalse("_response" in response);
  });

  it("[createUser] excludes _response from results", async () => {
    const client = new TestCommunicationIdentityClient();
    const newUser = await client.createUserTest();

    assert.isTrue(isCommunicationUserIdentifier(newUser));
    assert.equal(newUser.communicationUserId, "identity");
    assert.isFalse("_response" in newUser);
  });

  it("exchanges Teams token for ACS token", async () => {
    const client = new TestCommunicationIdentityClient();
    const spy = vi.spyOn(getTokenForTeamsUserHttpClient, "sendRequest");
    const response = await client.getTokenForTeamsUserTest("TeamsToken", "appId", "userId");

    assert.equal(response.token, "token");
    assert.equal(response.expiresOn.toDateString(), new Date("2011/11/30").toDateString());
    expect(spy).toHaveBeenCalledOnce();
  });

  it("[getTokenForTeamsUser] excludes _response from results", async () => {
    const client = new TestCommunicationIdentityClient();
    const response = await client.getTokenForTeamsUserTest("TeamsToken", "appId", "userId");

    assert.isFalse("_response" in response);
  });
});
