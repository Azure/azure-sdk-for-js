// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationUserIdentifier } from "@azure/communication-common";
import { isCommunicationUserIdentifier } from "@azure/communication-common";
import type { HttpClient } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import {
  createUserAndTokenHttpClient,
  createUserHttpClient,
  createMockHttpClient,
  getTokenForTeamsUserHttpClient,
  getTokenHttpClient,
  revokeTokensHttpClient,
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

    expect(response).toEqual({
      error: { code: "BadRequest", message: "bad request" },
    });
  });

  it("does not suppress pipeline failures when shouldDeserialize is false", async () => {
    const httpClient: HttpClient = {
      async sendRequest(request) {
        const response = {
          status: 400,
          headers: createHttpHeaders(),
          request,
          bodyAsText: JSON.stringify({ error: { code: "Unavailable" } }),
        };
        throw new RestError("pipeline failure", {
          code: "PipelineFailure",
          statusCode: response.status,
          request,
          response,
        });
      },
    };
    const client = new CommunicationIdentityClient(
      "endpoint=https://contoso.spool.azure.local;accesskey=banana",
      { httpClient } as CommunicationIdentityClientOptions,
    );
    const onResponse = vi.fn();

    await expect(
      client.getToken(user, ["chat"], {
        requestOptions: { shouldDeserialize: false },
        onResponse,
      }),
    ).rejects.toThrow("pipeline failure");

    expect(onResponse).toHaveBeenCalledOnce();
    const [rawResponse, flatResponse, error] = onResponse.mock.calls[0];
    assert.equal(rawResponse.status, 400);
    assert.isUndefined(flatResponse);
    assert.instanceOf(error, RestError);
  });

  it("preserves legacy callbacks for non-RestError failures with a response", async () => {
    const pipelineError = new Error("pipeline failure") as Error & {
      statusCode: number;
      response: {
        status: number;
        headers: ReturnType<typeof createHttpHeaders>;
        request: Parameters<HttpClient["sendRequest"]>[0];
        bodyAsText: string;
      };
      details?: unknown;
    };
    const httpClient: HttpClient = {
      async sendRequest(request) {
        pipelineError.statusCode = 418;
        pipelineError.response = {
          status: pipelineError.statusCode,
          headers: createHttpHeaders(),
          request,
          bodyAsText: JSON.stringify({ error: { code: "Teapot" } }),
        };
        throw pipelineError;
      },
    };
    const client = new CommunicationIdentityClient(
      "endpoint=https://contoso.spool.azure.local;accesskey=banana",
      { httpClient } as CommunicationIdentityClientOptions,
    );
    const onResponse = vi.fn();

    await expect(client.getToken(user, ["chat"], { onResponse })).rejects.toBe(pipelineError);

    expect(onResponse).toHaveBeenCalledOnce();
    const [rawResponse, flatResponse, error] = onResponse.mock.calls[0];
    assert.equal(rawResponse.status, 418);
    assert.deepEqual(flatResponse, {});
    assert.equal(error, pipelineError);
    assert.deepEqual(pipelineError.details, {});
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

  it("preserves RestError metadata for non-envelope gateway errors", async () => {
    const sendRequest = vi.fn<HttpClient["sendRequest"]>(async (request) => ({
      status: 502,
      headers: createHttpHeaders({ "content-type": "text/plain" }),
      request,
      bodyAsText: "Bad Gateway",
    }));
    const client = new CommunicationIdentityClient(
      "endpoint=https://contoso.spool.azure.local;accesskey=banana",
      {
        httpClient: { sendRequest },
        retryOptions: { maxRetries: 0 },
      } as CommunicationIdentityClientOptions,
    );

    await client.getToken(user, ["chat"]).then(
      () => assert.fail("Expected the gateway response to reject"),
      (error: unknown) => {
        assert.instanceOf(error, RestError);
        assert.equal(error.message, "Bad Gateway");
        assert.equal(error.statusCode, 502);
        assert.equal(error.response?.bodyAsText, "Bad Gateway");
        assert.equal(error.details, "Bad Gateway");
      },
    );

    expect(sendRequest).toHaveBeenCalledOnce();
  });

  it("validates required operation arguments before sending a request", () => {
    const sendRequest = vi.fn<HttpClient["sendRequest"]>();
    const client = new CommunicationIdentityClient(
      "endpoint=https://contoso.spool.azure.local;accesskey=banana",
      { httpClient: { sendRequest } } as CommunicationIdentityClientOptions,
    );

    expect(() => client.getToken({} as CommunicationUserIdentifier, ["chat"])).toThrowError(
      "id cannot be null or undefined.",
    );
    expect(() => client.getToken(user, undefined as never)).toThrowError(
      "scopes cannot be null or undefined.",
    );
    expect(() => client.revokeTokens({} as CommunicationUserIdentifier)).toThrowError(
      "id cannot be null or undefined.",
    );
    expect(() => client.createUserAndToken(undefined as never)).toThrowError(
      "scopes cannot be null or undefined.",
    );
    expect(() => client.deleteUser({} as CommunicationUserIdentifier)).toThrowError(
      "id cannot be null or undefined.",
    );
    expect(() =>
      client.getTokenForTeamsUser({
        clientId: "clientId",
        userObjectId: "userObjectId",
      } as never),
    ).toThrowError("teamsUserAadToken cannot be null or undefined.");
    expect(() =>
      client.getTokenForTeamsUser({
        teamsUserAadToken: "token",
        userObjectId: "userObjectId",
      } as never),
    ).toThrowError("clientId cannot be null or undefined.");
    expect(() =>
      client.getTokenForTeamsUser({
        teamsUserAadToken: "token",
        clientId: "clientId",
      } as never),
    ).toThrowError("userObjectId cannot be null or undefined.");
    expect(sendRequest).not.toHaveBeenCalled();
  });

  it("[getToken] excludes _response from results", async () => {
    const client = new TestCommunicationIdentityClient();
    const response = await client.getTokenTest(user, ["chat"]);

    assert.isFalse("_response" in response);
  });

  it("[createUser] excludes _response from results", async () => {
    const client = new TestCommunicationIdentityClient();
    const spy = vi.spyOn(createUserHttpClient, "sendRequest");
    const newUser = await client.createUserTest();

    assert.isTrue(isCommunicationUserIdentifier(newUser));
    assert.equal(newUser.communicationUserId, "identity");
    assert.isFalse("_response" in newUser);
    expect(spy).toHaveBeenCalledOnce();

    const request = spy.mock.calls[0][0];
    assert.equal(request.method, "POST");
    assert.include(request.url, "/identities?api-version=2026-09-23");
    assert.isUndefined(request.body);
  });

  it("sends scopes and expiration when creating a user and token", async () => {
    const client = new TestCommunicationIdentityClient();
    const spy = vi.spyOn(createUserAndTokenHttpClient, "sendRequest");

    const response = await client.createUserAndTokenTest(["chat"], {
      tokenExpiresInMinutes: 60,
    });

    assert.equal(response.user.communicationUserId, "identity");
    assert.equal(response.token, "token");
    expect(spy).toHaveBeenCalledOnce();

    const request = spy.mock.calls[0][0];
    assert.equal(request.method, "POST");
    assert.include(request.url, "/identities?api-version=2026-09-23");
    assert.deepEqual(JSON.parse(request.body as string), {
      createTokenWithScopes: ["chat"],
      expiresInMinutes: 60,
    });
  });

  it("sends the expected revoke and delete requests", async () => {
    const client = new TestCommunicationIdentityClient();
    const revokeSpy = vi.spyOn(revokeTokensHttpClient, "sendRequest");

    await client.revokeTokensTest(user);

    expect(revokeSpy).toHaveBeenCalledOnce();
    const revokeRequest = revokeSpy.mock.calls[0][0];
    assert.equal(revokeRequest.method, "POST");
    assert.include(
      revokeRequest.url,
      "/identities/ACS_ID/:revokeAccessTokens?api-version=2026-09-23",
    );
    assert.isUndefined(revokeRequest.body);

    const deleteHttpClient = createMockHttpClient(204);
    const deleteSpy = vi.spyOn(deleteHttpClient, "sendRequest");
    const deleteClient = new CommunicationIdentityClient(
      "endpoint=https://contoso.spool.azure.local;accesskey=banana",
      { httpClient: deleteHttpClient } as CommunicationIdentityClientOptions,
    );

    await deleteClient.deleteUser(user);

    expect(deleteSpy).toHaveBeenCalledOnce();
    const deleteRequest = deleteSpy.mock.calls[0][0];
    assert.equal(deleteRequest.method, "DELETE");
    assert.include(deleteRequest.url, "/identities/ACS_ID?api-version=2026-09-23");
    assert.isUndefined(deleteRequest.body);
  });

  it("exchanges Teams token for ACS token", async () => {
    const client = new TestCommunicationIdentityClient();
    const spy = vi.spyOn(getTokenForTeamsUserHttpClient, "sendRequest");
    const response = await client.getTokenForTeamsUserTest("TeamsToken", "appId", "userId");

    assert.equal(response.token, "token");
    assert.equal(response.expiresOn.toDateString(), new Date("2011/11/30").toDateString());
    expect(spy).toHaveBeenCalledOnce();

    const request = spy.mock.calls[0][0];
    assert.equal(request.method, "POST");
    assert.include(request.url, "/teamsUser/:exchangeAccessToken?api-version=2026-09-23");
    assert.deepEqual(JSON.parse(request.body as string), {
      token: "TeamsToken",
      appId: "appId",
      userId: "userId",
    });
  });

  it("[getTokenForTeamsUser] excludes _response from results", async () => {
    const client = new TestCommunicationIdentityClient();
    const response = await client.getTokenForTeamsUserTest("TeamsToken", "appId", "userId");

    assert.isFalse("_response" in response);
  });
});
