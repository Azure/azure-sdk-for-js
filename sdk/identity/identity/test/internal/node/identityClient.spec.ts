// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityClient } from "$internal/client/identityClient.js";
import { getAuthorityHost } from "$internal/util/authorityHost.js";
import { IdentityTestContext } from "./httpRequests.js";
import type { IdentityTestContextInterface } from "../../httpRequestsCommon.js";
import { createResponse } from "../../httpRequestsCommon.js";
import { ClientSecretCredential } from "@azure/identity";
import { openIdConfigurationResponse, PlaybackTenantId } from "../../msalTestUtils.js";
import { isExpectedError } from "../../authTestUtils.js";
import { isNodeLike } from "@azure/core-util";
import { describe, it, assert, beforeEach, afterEach, vi, expect } from "vitest";
import type { HttpClient } from "@azure/core-rest-pipeline";
import { createDefaultHttpClient, createHttpHeaders } from "@azure/core-rest-pipeline";

describe("IdentityClient", function () {
  let testContext: IdentityTestContextInterface;

  beforeEach(async function () {
    testContext = new IdentityTestContext({ replaceLogger: true, logLevel: "verbose" });
  });
  afterEach(async function () {
    if (isNodeLike) {
      delete process.env.AZURE_AUTHORITY_HOST;
    }
    await testContext.restore();
  });

  it("throws an exception if the credential is not available (can't resolve discovery endpoint)", async () => {
    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scope"],
      credential: new ClientSecretCredential(PlaybackTenantId, "client", "secret", {
        // createResponse below will simulate a 400 error when trying to resolve the authority
        authorityHost: "https://fake-authority.com",
      }),
      secureResponses: [
        createResponse(400, {
          error: "test_error",
          error_description: "This is a test error",
        }),
      ],
    });
    if (isNodeLike) {
      assert.strictEqual(error!.name, "CredentialUnavailableError");
    } else {
      // The browser version of this credential uses a legacy approach.
      // While the Node version uses MSAL, the browser version does the network requests directly.
      // While that means the browser version is simpler, it also means the browser version will not keep the same behavior.
      assert.strictEqual(error!.name, "AuthenticationError");
    }
  });

  it("throws an exception when an authentication request fails", async () => {
    const mockHttpClient: HttpClient = createDefaultHttpClient();
    vi.spyOn(mockHttpClient, "sendRequest")
      .mockImplementationOnce(async (request) => {
        return {
          request,
          status: 200,
          bodyAsText: JSON.stringify(openIdConfigurationResponse),
          headers: createHttpHeaders(),
        };
      })
      .mockImplementationOnce(async (request) => {
        return {
          request,
          status: 400,
          bodyAsText: JSON.stringify({
            error: "test_error",
            error_description: "This is a test error",
          }),
          headers: createHttpHeaders(),
        };
      });

    const credential = new ClientSecretCredential("adfs", "client", "secret", {
      authorityHost: "https://fake-authority.com",
      httpClient: mockHttpClient,
    });

    if (isNodeLike) {
      await expect(credential.getToken(["scope"])).rejects.toThrow("This is a test error");
    } else {
      // The browser version of this credential uses a legacy approach.
      // While the Node version uses MSAL, the browser version does the network requests directly.
      // While that means the browser version is simpler, it also means the browser version will not keep the same behavior.
      await expect(credential.getToken(["scope"])).rejects.toThrow("AuthenticationError");
    }
  });

  it("throws an exception when an authorityHost using 'http' is provided", async () => {
    assert.throws(
      () => {
        new IdentityClient({ authorityHost: "http://totallyinsecure.lol" });
      },
      Error,
      "The authorityHost address must use the 'https' protocol.",
    );
    assert.throws(
      () => {
        new IdentityClient({ authorityHost: "httpsomg.com" });
      },
      Error,
      "The authorityHost address must use the 'https' protocol.",
    );
  });

  it.skipIf(!isNodeLike)("parses authority host environment variable as expected", function () {
    process.env.AZURE_AUTHORITY_HOST = "http://totallyinsecure.lol";
    assert.equal(getAuthorityHost({}), process.env.AZURE_AUTHORITY_HOST);
    return;
  });

  it.skipIf(!isNodeLike)(
    "throws an exception when an Env AZURE_AUTHORITY_HOST using 'http' is provided",
    async function () {
      process.env.AZURE_AUTHORITY_HOST = "http://totallyinsecure.lol";
      assert.throws(
        () => {
          new IdentityClient();
        },
        Error,
        "The authorityHost address must use the 'https' protocol.",
      );
      process.env.AZURE_AUTHORITY_HOST = "httpsomg.com";
      assert.throws(
        () => {
          new IdentityClient();
        },
        Error,
        "The authorityHost address must use the 'https' protocol.",
      );

      // While we have the environment variable, ensure correct precedence
      assert(new IdentityClient({ authorityHost: "https://correct.url" }));
      return;
    },
  );

  it("returns a usable error when the authentication response doesn't contain a body", async () => {
    const mockHttpClient: HttpClient = createDefaultHttpClient();
    vi.spyOn(mockHttpClient, "sendRequest")
      .mockImplementationOnce(async (request) => {
        return {
          request,
          status: 200,
          bodyAsText: JSON.stringify(openIdConfigurationResponse),
          headers: createHttpHeaders(),
        };
      })
      .mockImplementationOnce(async (request) => {
        return {
          request,
          status: 300,
          headers: createHttpHeaders(),
        };
      });
    const credential = new ClientSecretCredential("adfs", "client", "secret", {
      httpClient: mockHttpClient,
    });

    if (isNodeLike) {
      await expect(credential.getToken(["scope"])).rejects.toThrow(
        'Response had no "expiresOn" property.',
      );
    } else {
      // The browser version of this credential uses a legacy approach.
      // While the Node version uses MSAL, the browser version does the network requests directly.
      // While that means the browser version is simpler, it also means the browser version will not keep the same behavior.
      await expect(credential.getToken(["scope"])).rejects.toThrow("AuthenticationError");
    }
  });

  it.skipIf(!isNodeLike)("parses authority host environment variable as expected", function () {
    process.env.AZURE_AUTHORITY_HOST = "http://totallyinsecure.lol";
    assert.equal(getAuthorityHost({}), process.env.AZURE_AUTHORITY_HOST);
    return;
  });

  it("returns null when the token refresh request returns an 'interaction_required' error", async function () {
    const mockHttpClient = createDefaultHttpClient();
    vi.spyOn(mockHttpClient, "sendRequest").mockImplementation((request) =>
      Promise.resolve({
        request,
        headers: createHttpHeaders(),
        status: 401,
        bodyAsText: JSON.stringify({
          error: "interaction_required",
          error_description: "Interaction required",
        }),
      }),
    );
    const client = new IdentityClient({
      authorityHost: "https://authority",
      httpClient: mockHttpClient,
    });
    const tokenResponse = await client.refreshAccessToken(
      "tenant",
      "client",
      "scopes",
      "token",
      undefined,
    );

    assert.equal(tokenResponse, null);
  });

  it("rethrows any other error that is thrown while refreshing the access token", async () => {
    const client = new IdentityClient();
    const response = createResponse(300, {
      error: "unknown_error",
      error_description: "This error shouldn't be happening.",
    });
    const error = await testContext.sendIndividualRequestAndGetError(async () => {
      return client.refreshAccessToken("tenant", "client", "scopes", "token", undefined);
    }, response);
    isExpectedError("unknown_error")(error);
  });
});
