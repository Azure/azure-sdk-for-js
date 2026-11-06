// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi, beforeEach, type Mock } from "vitest";
import type { AccessToken, GetTokenOptions } from "@azure/core-auth";
import type { PipelineRequest, PipelineResponse } from "../../src/index.js";
import {
  authorizeRequestOnTenantChallenge,
  bearerTokenAuthenticationPolicy,
  createHttpHeaders,
  createPipelineRequest,
} from "../../src/index.js";

describe("authorizeRequestOnTenantChallenge", function () {
  const fakeGuid = "3a4e2c3b-defc-466c-b0c8-6a419bf92858";
  let getTokenStub: Mock<
    (scopes: string | string[], options: GetTokenOptions | undefined) => Promise<AccessToken | null>
  >;
  beforeEach(() => {
    getTokenStub = vi
      .fn<
        (
          scopes: string | string[],
          options: GetTokenOptions | undefined,
        ) => Promise<AccessToken | null>
      >()
      .mockResolvedValue({ expiresOnTimestamp: 1, token: "originalToken" });
  });

  it("should forward abort, timeout, and tracing options to token retrieval", async () => {
    const abortSignal = new AbortController().signal;
    const tracingOptions = { tracingContext: undefined };
    const request = createPipelineRequest({
      url: "https://example.org",
      abortSignal,
      timeout: 1234,
    });
    request.tracingOptions = tracingOptions;

    const authorized = await authorizeRequestOnTenantChallenge({
      request,
      response: {
        request,
        status: 401,
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize resource_id=https://storage.azure.com/container`,
        }),
      },
      getAccessToken: getTokenStub,
      scopes: ["https://example.org/.default"],
    });

    assert.isTrue(authorized);
    expect(getTokenStub).toHaveBeenCalledExactlyOnceWith(["https://storage.azure.com/.default"], {
      abortSignal,
      requestOptions: { timeout: 1234 },
      tracingOptions,
      tenantId: fakeGuid,
    });
  });

  it.each([undefined, "Bearer", "pop"] as const)(
    "should honor token type %s when setting the authorization header",
    async (tokenType) => {
      getTokenStub.mockResolvedValue({ expiresOnTimestamp: 1, token: "challengeToken", tokenType });
      const request = createPipelineRequest({ url: "https://example.org" });

      const authorized = await authorizeRequestOnTenantChallenge({
        request,
        response: {
          request,
          status: 401,
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize`,
          }),
        },
        getAccessToken: getTokenStub,
        scopes: ["https://example.org/.default"],
      });

      assert.isTrue(authorized);
      assert.equal(request.headers.get("authorization"), `${tokenType ?? "Bearer"} challengeToken`);
    },
  );

  it("should leave the authorization header unchanged when no token is returned", async () => {
    getTokenStub.mockResolvedValue(null);
    const request = createPipelineRequest({
      url: "https://example.org",
      headers: createHttpHeaders({ authorization: "Bearer originalToken" }),
    });

    const authorized = await authorizeRequestOnTenantChallenge({
      request,
      response: {
        request,
        status: 401,
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize`,
        }),
      },
      getAccessToken: getTokenStub,
      scopes: ["https://example.org/.default"],
    });

    assert.isFalse(authorized);
    assert.equal(request.headers.get("authorization"), "Bearer originalToken");
  });

  it.each(["common", "", `${fakeGuid}suffix`, fakeGuid.replaceAll("-", "")])(
    "should reject a tenant that is not a UUID: %s",
    async (tenantId) => {
      const request = createPipelineRequest({ url: "https://example.org" });
      const authorized = await authorizeRequestOnTenantChallenge({
        request,
        response: {
          request,
          status: 401,
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${tenantId}/oauth2/authorize`,
          }),
        },
        getAccessToken: getTokenStub,
        scopes: [],
      });

      assert.isFalse(authorized);
      expect(getTokenStub).not.toHaveBeenCalled();
    },
  );

  it("should not try to get challenge info if request succeeded initially", async () => {
    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    await policy.sendRequest(
      {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "",
        timeout: 1000,
        url: "https://example.org",
        withCredentials: true,
      },
      async (req) => {
        assert.equal(req.headers.get("authorization"), "Bearer originalToken");

        return {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize resource_id=https://storage.azure.com`,
          }),
          request: req,
          status: 200,
        };
      },
    );

    expect(getTokenStub).toBeCalledTimes(1);
  });

  it("should fail with 401 if no challenge is present", async () => {
    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    const response = await policy.sendRequest(
      {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "",
        timeout: 1000,
        url: "https://example.org",
        withCredentials: true,
      },
      async (req) => {
        assert.equal(req.headers.get("authorization"), "Bearer originalToken");

        return {
          headers: createHttpHeaders({}),
          request: req,
          status: 401,
        };
      },
    );

    assert.equal(response.status, 401);
  });

  it("should try to get challenge info if request succeeded initially", async () => {
    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    const nextFn = vi
      .fn<(req: PipelineRequest) => Promise<PipelineResponse>>()
      .mockImplementationOnce(async (req) => {
        assert.equal(req.headers.get("authorization"), "Bearer originalToken");
        return {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize resource_id=https://storage.azure.com`,
          }),
          request: req,
          status: 401,
        };
      })
      .mockImplementation(async (req) => {
        return {
          headers: createHttpHeaders(),
          request: req,
          status: 200,
        };
      });

    await policy.sendRequest(
      {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "",
        timeout: 1000,
        url: "https://example.org",
        withCredentials: true,
      },
      nextFn,
    );

    expect(getTokenStub).toBeCalledTimes(2);
    const lastGetTokenCall = getTokenStub.mock.calls[1];
    assert.equal(lastGetTokenCall[1]?.tenantId, fakeGuid);
  });

  it("should use the scopes returned in the challenge", async () => {
    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    const nextFn = vi
      .fn<(req: PipelineRequest) => Promise<PipelineResponse>>()
      .mockImplementationOnce(async (req) => {
        assert.equal(req.headers.get("authorization"), "Bearer originalToken");
        return {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize resource_id=https://storage.azure.com`,
          }),
          request: req,
          status: 401,
        };
      })
      .mockImplementation(async (req) => {
        return {
          headers: createHttpHeaders(),
          request: req,
          status: 200,
        };
      });

    await policy.sendRequest(
      {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "",
        timeout: 1000,
        url: "https://example.org",
        withCredentials: true,
      },
      nextFn,
    );

    expect(getTokenStub).toBeCalledTimes(2);
    const lastGetTokenCall = getTokenStub.mock.calls[1];
    assert.equal(lastGetTokenCall[1]?.tenantId, fakeGuid);
    assert.equal(lastGetTokenCall[0], "https://storage.azure.com/.default");
  });

  it("should use the original scopes returned if there is none in the challenge", async () => {
    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org/.default"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    const nextFn = vi
      .fn<(req: PipelineRequest) => Promise<PipelineResponse>>()
      .mockImplementationOnce(async (req) => {
        assert.equal(req.headers.get("authorization"), "Bearer originalToken");
        return {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize`,
          }),
          request: req,
          status: 401,
        };
      })
      .mockImplementation(async (req) => {
        return {
          headers: createHttpHeaders(),
          request: req,
          status: 200,
        };
      });

    await policy.sendRequest(
      {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "",
        timeout: 1000,
        url: "https://example.org",
        withCredentials: true,
      },
      nextFn,
    );

    expect(getTokenStub).toBeCalledTimes(2);
    const lastGetTokenCall = getTokenStub.mock.calls[1];
    assert.equal(lastGetTokenCall[1]?.tenantId, fakeGuid);
    assert.equal(lastGetTokenCall[0], "https://example.org/.default");
  });

  it("should if request failed after first challenge stop retrying", async () => {
    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    const response = await policy.sendRequest(
      {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "",
        timeout: 1000,
        url: "https://example.org",
        withCredentials: true,
      },
      async (req) => {
        assert.equal(req.headers.get("authorization"), "Bearer originalToken");
        return {
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize resource_id=https://storage.azure.com`,
          }),
          request: req,
          status: 401,
        };
      },
    );

    assert.equal(response.status, 401);
    expect(getTokenStub).toBeCalledTimes(2);
  });

  it("should reuse token if it hasn't expired", async () => {
    getTokenStub = vi
      .fn<
        (
          scopes: string | string[],
          options: GetTokenOptions | undefined,
        ) => Promise<AccessToken | null>
      >()
      .mockResolvedValue({ expiresOnTimestamp: Date.now() + 100000000, token: "originalToken" });

    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    const sendTestRequest = (): Promise<PipelineResponse> =>
      policy.sendRequest(
        {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "",
          timeout: 1000,
          url: "https://example.org",
          withCredentials: true,
        },
        async (req) => {
          assert.equal(req.headers.get("authorization"), "Bearer originalToken");
          return {
            headers: createHttpHeaders(),
            request: req,
            status: 200,
          };
        },
      );

    // Send the request 3 times
    await sendTestRequest();
    await sendTestRequest();
    await sendTestRequest();

    expect(getTokenStub).toBeCalledTimes(1);
  });

  it("should refresh token if it has expired", async () => {
    getTokenStub = vi
      .fn<
        (
          scopes: string | string[],
          options: GetTokenOptions | undefined,
        ) => Promise<AccessToken | null>
      >()
      .mockResolvedValue({ expiresOnTimestamp: Date.now() - 1000000, token: "originalToken" });

    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    const sendTestRequest = (): Promise<PipelineResponse> =>
      policy.sendRequest(
        {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "",
          timeout: 1000,
          url: "https://example.org",
          withCredentials: true,
        },
        async (req) => {
          assert.equal(req.headers.get("authorization"), "Bearer originalToken");
          return {
            headers: createHttpHeaders(),
            request: req,
            status: 200,
          };
        },
      );

    // Send the request 3 times
    await sendTestRequest();
    await sendTestRequest();
    await sendTestRequest();

    // We are setting expiration time in the past everytime we refresh the token
    // so we expect 3 calls to refresh the token
    expect(getTokenStub).toBeCalledTimes(3);
  });

  it("should refresh token if valid but within window it has expired", async () => {
    getTokenStub = vi
      .fn<
        (
          scopes: string | string[],
          options: GetTokenOptions | undefined,
        ) => Promise<AccessToken | null>
      >()
      // Refresh window is 1000ms setting 999 to make sure we are in the refresh window
      .mockResolvedValue({ expiresOnTimestamp: Date.now() + 999, token: "originalToken" });

    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    const sendTestRequest = (): Promise<PipelineResponse> =>
      policy.sendRequest(
        {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "",
          timeout: 1000,
          url: "https://example.org",
          withCredentials: true,
        },
        async (req) => {
          assert.equal(req.headers.get("authorization"), "Bearer originalToken");
          return {
            headers: createHttpHeaders(),
            request: req,
            status: 200,
          };
        },
      );

    // Send the request 2 times
    await sendTestRequest();
    await sendTestRequest();

    // We are setting expiration time within the refresh window
    // so we expect 2 calls to refresh the token
    expect(getTokenStub).toBeCalledTimes(2);
  });

  it("should not try to request a token if tenant is invalid", async function () {
    const request = createPipelineRequest({ url: "https://example.org" });
    const invalidAuthUri =
      "https://login.microsoftonline.com/eastasia:/DiskRP-eastasia_2/PoolManagerService/oauth2/authorize";
    const shouldSendRequest = await authorizeRequestOnTenantChallenge({
      request,
      response: {
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer authorization_uri=${invalidAuthUri}`,
        }),
        request,
        status: 401,
      },
      getAccessToken: getTokenStub,
      scopes: [],
    });
    expect(getTokenStub).toBeCalledTimes(0);
    assert.isFalse(shouldSendRequest);
  });

  it("should handle disk scope being quirky", async function () {
    const request = createPipelineRequest({ url: "https://example.org" });
    // the double forward slash is required
    const quirkScope = "https://disk.azure.com//.default";
    const shouldSendRequest = await authorizeRequestOnTenantChallenge({
      request,
      response: {
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize resource_id=https://disk.azure.com/`,
        }),
        request,
        status: 401,
      },
      getAccessToken: getTokenStub,
      scopes: [],
    });
    assert.isTrue(shouldSendRequest);
    expect(getTokenStub).toBeCalledTimes(1);
    const lastGetTokenCall = getTokenStub.mock.calls[0];
    assert.equal(lastGetTokenCall[0], quirkScope);
  });
});
