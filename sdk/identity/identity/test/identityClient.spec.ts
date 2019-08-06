// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { assertRejects } from "./authTestUtils";
import { MockAuthHttpClient } from "./authTestUtils";
import { AuthenticationError } from "../src/";
import { IdentityClient } from "../src/client/identityClient";
import { ClientSecretCredential } from "../src";

function isExpectedError(expectedErrorName: string): (error: any) => boolean {
  return (error: any) => {
    if (!(error instanceof AuthenticationError)) {
      assert.ifError(error)
    }
    return error.errorResponse.error === expectedErrorName
  }
}

describe("IdentityClient", function () {
  it("throws an exception when an authentication request fails", async () => {
    const mockHttp = new MockAuthHttpClient({
      authResponse: {
        status: 400,
        parsedBody: { error: "test_error", error_description: "This is a test error" }
      }
    });

    const credential = new ClientSecretCredential("tenant", "client", "secret", mockHttp.identityClientOptions);
    await assertRejects(
      credential.getToken("https://test/.default"),
      error => {
        assert.strictEqual(error.name, 'AuthenticationError')
        return true;
      }
    );
  });

  it("throws an exception when an authorityHost using 'http' is provided", async () => {
    assert.throws(
      () => { new IdentityClient({ authorityHost: "http://totallyinsecure.lol" }) },
      Error,
      "The authorityHost address must use the 'https' protocol.");
    assert.throws(
      () => { new IdentityClient({ authorityHost: "httpsomg.com" }) },
      Error,
      "The authorityHost address must use the 'https' protocol.");
  });

  it("returns a usable error when the authentication response doesn't contain a body", async () => {
    const mockHttp = new MockAuthHttpClient({
      authResponse: {
        status: 500,
        bodyAsText: ''
      }
    });

    const credential = new ClientSecretCredential("tenant", "client", "secret", mockHttp.identityClientOptions);
    await assertRejects(
      credential.getToken("https://test/.default"),
      isExpectedError("unknown_error")
    );
  });

  it("returns null when the token refresh request returns an 'interaction_required' error", async () => {
    const mockHttp = new MockAuthHttpClient({
      authResponse: {
        status: 401,
        parsedBody: {
          error: "interaction_required",
          error_description: "Interaction required"
        }
      }
    });

    const client = new IdentityClient(mockHttp.identityClientOptions);
    const tokenResponse = await client.refreshAccessToken("tenant", "client", "scopes", "token", undefined)
    assert.equal(tokenResponse, null);
  });

  it("rethrows any other error that is thrown while refreshing the access token", async () => {
    const mockHttp = new MockAuthHttpClient({
      authResponse: {
        status: 401,
        parsedBody: {
          error: "invalid_client",
          error_description: "Invalid client"
        }
      }
    });

    const client = new IdentityClient(mockHttp.identityClientOptions);
    await assertRejects(
      client.refreshAccessToken("tenant", "client", "scopes", "token", undefined),
      isExpectedError("invalid_client")
    );
  });
});
