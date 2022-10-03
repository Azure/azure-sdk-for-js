// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { bearerTokenAuthenticationPolicy, createHttpHeaders } from "@azure/core-rest-pipeline";

import { assert } from "chai";
import { authorizeRequestOnTenantChallenge } from "../src";
import sinon from "sinon";

describe("storageBearerTokenChallengeAuthenticationPolicy", function () {
  const fakeGuid = "3a4e2c3b-defc-466c-b0c8-6a419bf92858";
  let getTokenStub: sinon.SinonStub<
    [string | string[], GetTokenOptions | undefined],
    Promise<AccessToken | null>
  >;
  beforeEach(() => {
    getTokenStub = sinon
      .stub<[string | string[], GetTokenOptions | undefined], Promise<AccessToken | null>>()
      .resolves({ expiresOnTimestamp: 1, token: "originalToken" });
  });

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
            "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize resource_uri=https://storage.azure.com`,
          }),
          request: req,
          status: 200,
        };
      }
    );

    assert.equal(getTokenStub.callCount, 1);
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
      }
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

    const calledOnce = false;

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
        if (!calledOnce) {
          assert.equal(req.headers.get("authorization"), "Bearer originalToken");
          return {
            headers: createHttpHeaders({
              "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize resource_uri=https://storage.azure.com`,
            }),
            request: req,
            status: 401,
          };
        }

        return {
          headers: createHttpHeaders(),
          request: req,
          status: 200,
        };
      }
    );

    assert.equal(getTokenStub.callCount, 2);
    const lastGetTokenCall = getTokenStub.getCall(1);
    assert.equal(lastGetTokenCall.args[1]?.tenantId, fakeGuid);
  });

  it("should use the scopes returned in the challenge", async () => {
    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    const calledOnce = false;

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
        if (!calledOnce) {
          assert.equal(req.headers.get("authorization"), "Bearer originalToken");
          return {
            headers: createHttpHeaders({
              "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize resource_uri=https://storage.azure.com`,
            }),
            request: req,
            status: 401,
          };
        }
        return {
          headers: createHttpHeaders(),
          request: req,
          status: 200,
        };
      }
    );

    assert.equal(getTokenStub.callCount, 2);
    const lastGetTokenCall = getTokenStub.getCall(1);
    assert.equal(lastGetTokenCall.args[1]?.tenantId, fakeGuid);
    assert.equal(lastGetTokenCall.args[0], "https://storage.azure.com/.default");
  });

  it("should use the original scopes returned if there is none in the challenge", async () => {
    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org/.default"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    const calledOnce = false;

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
        if (!calledOnce) {
          assert.equal(req.headers.get("authorization"), "Bearer originalToken");
          return {
            headers: createHttpHeaders({
              "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize`,
            }),
            request: req,
            status: 401,
          };
        }
        return {
          headers: createHttpHeaders(),
          request: req,
          status: 200,
        };
      }
    );

    assert.equal(getTokenStub.callCount, 2);
    const lastGetTokenCall = getTokenStub.getCall(1);
    assert.equal(lastGetTokenCall.args[1]?.tenantId, fakeGuid);
    assert.equal(lastGetTokenCall.args[0], "https://example.org/.default");
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
            "WWW-Authenticate": `Bearer authorization_uri=https://login.microsoftonline.com/${fakeGuid}/oauth2/authorize resource_uri=https://storage.azure.com`,
          }),
          request: req,
          status: 401,
        };
      }
    );

    assert.equal(response.status, 401);
    assert.equal(getTokenStub.callCount, 2);
  });

  it("should reuse token if it hasn't expired", async () => {
    getTokenStub = sinon
      .stub<[string | string[], GetTokenOptions | undefined], Promise<AccessToken | null>>()
      .resolves({ expiresOnTimestamp: Date.now() + 100000000, token: "originalToken" });

    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    const sendTestRequest = () =>
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
        }
      );

    // Send the request 3 times
    await sendTestRequest();
    await sendTestRequest();
    await sendTestRequest();

    assert.equal(getTokenStub.callCount, 1);
  });

  it("should refresh token if it has expired", async () => {
    getTokenStub = sinon
      .stub<[string | string[], GetTokenOptions | undefined], Promise<AccessToken | null>>()
      .resolves({ expiresOnTimestamp: Date.now() - 1000000, token: "originalToken" });

    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    const sendTestRequest = () =>
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
        }
      );

    // Send the request 3 times
    await sendTestRequest();
    await sendTestRequest();
    await sendTestRequest();

    // We are setting expiration time in the past everytime we refresh the token
    // so we expect 3 calls to refresh the token
    assert.equal(getTokenStub.callCount, 3);
  });

  it("should refresh token if valid but within window it has expired", async () => {
    getTokenStub = sinon
      .stub<[string | string[], GetTokenOptions | undefined], Promise<AccessToken | null>>()
      // Refresh window is 1000ms setting 999 to make sure we are in the refresh window
      .resolves({ expiresOnTimestamp: Date.now() + 999, token: "originalToken" });

    const policy = bearerTokenAuthenticationPolicy({
      credential: { getToken: getTokenStub },
      scopes: ["https://example.org"],
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnTenantChallenge,
      },
    });

    const sendTestRequest = () =>
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
        }
      );

    // Send the request 2 times
    await sendTestRequest();
    await sendTestRequest();

    // We are setting expiration time within the refresh window
    // so we expect 2 calls to refresh the token
    assert.equal(getTokenStub.callCount, 2);
  });
});
