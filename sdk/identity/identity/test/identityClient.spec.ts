// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { assertRejects } from "./authTestUtils";
import { MockAuthHttpClient } from "./authTestUtils";
import { AuthenticationError } from "../src/";
import { IdentityClient } from "../src/client/identityClient";
import { ClientSecretCredential } from "../src";
import { setLogLevel, AzureLogger, getLogLevel, AzureLogLevel } from "@azure/logger";
import { isNode } from "@azure/core-http";

function isExpectedError(expectedErrorName: string): (error: any) => boolean {
  return (error: any) => {
    if (!(error instanceof AuthenticationError)) {
      assert.ifError(error);
    }
    return error.errorResponse.error === expectedErrorName;
  };
}

describe("IdentityClient", function() {
  let logMessages: string[];
  let oldLogger: typeof AzureLogger.log;
  let oldLogLevel: AzureLogLevel | undefined;

  beforeEach(() => {
    oldLogLevel = getLogLevel();
    setLogLevel("verbose");

    oldLogger = AzureLogger.log;

    logMessages = [];

    AzureLogger.log = (args) => {
      logMessages.push(args);
    };
  });

  afterEach(() => {
    AzureLogger.log = oldLogger;
    setLogLevel(oldLogLevel);
  });

  it("throws an exception when an authentication request fails", async () => {
    const mockHttp = new MockAuthHttpClient({
      authResponse: {
        status: 400,
        parsedBody: { error: "test_error", error_description: "This is a test error" }
      }
    });

    const credential = new ClientSecretCredential(
      "tenant",
      "client",
      "secret",
      mockHttp.tokenCredentialOptions
    );
    await assertRejects(credential.getToken("https://test/.default"), (error) => {
      assert.strictEqual(error.name, "AuthenticationError");
      return true;
    });
  });

  it("throws an exception when an authorityHost using 'http' is provided", async () => {
    assert.throws(
      () => {
        new IdentityClient({ authorityHost: "http://totallyinsecure.lol" });
      },
      Error,
      "The authorityHost address must use the 'https' protocol."
    );
    assert.throws(
      () => {
        new IdentityClient({ authorityHost: "httpsomg.com" });
      },
      Error,
      "The authorityHost address must use the 'https' protocol."
    );
  });

  it("throws an exception when an Env AZURE_AUTHORITY_HOST using 'http' is provided", async function() {
    if (!isNode) {
      // eslint-disable-next-line no-invalid-this
      return this.skip();
    }
    process.env.AZURE_AUTHORITY_HOST = "http://totallyinsecure.lol";
    assert.throws(
      () => {
        new IdentityClient();
      },
      Error,
      "The authorityHost address must use the 'https' protocol."
    );
    process.env.AZURE_AUTHORITY_HOST = "httpsomg.com";
    assert.throws(
      () => {
        new IdentityClient();
      },
      Error,
      "The authorityHost address must use the 'https' protocol."
    );

    // While we have the environment variable, ensure correct precedence
    assert(new IdentityClient({ authorityHost: "https://correct.url" }));

    delete process.env.AZURE_AUTHORITY_HOST;
  });

  it("returns a usable error when the authentication response doesn't contain a body", async () => {
    const mockHttp = new MockAuthHttpClient({
      authResponse: {
        status: 500,
        bodyAsText: ""
      }
    });

    const credential = new ClientSecretCredential(
      "tenant",
      "client",
      "secret",
      mockHttp.tokenCredentialOptions
    );

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

    const client = new IdentityClient(mockHttp.tokenCredentialOptions);
    const tokenResponse = await client.refreshAccessToken(
      "tenant",
      "client",
      "scopes",
      "token",
      undefined
    );

    assert.equal(tokenResponse, null);

    const expectedMessages = [
      /.*azure:identity:info.*IdentityClient: refreshing access token with client ID: client, scopes: scopes started.*/,
      /.*azure:identity:info.*IdentityClient: sending token request to \[https:\/\/authority\/tenant\/oauth2\/v2.0\/token\].*/,
      /.*azure:identity:warning.*IdentityClient: authentication error. HTTP status: 401, Interaction required.*/,
      /.*azure:identity:info.*IdentityClient: interaction required for client ID: client.*/
    ];

    logMessages = logMessages.filter((msg) => msg.indexOf("azure:identity:") >= 0);

    assert.equal(expectedMessages.length, logMessages.length);

    for (let i = 0; i < logMessages.length; i++) {
      assert.ok(logMessages[i].match(expectedMessages[i]), `Checking[${i}] ${logMessages[i]}`);
    }
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

    const client = new IdentityClient(mockHttp.tokenCredentialOptions);
    await assertRejects(
      client.refreshAccessToken("tenant", "client", "scopes", "token", undefined),
      isExpectedError("invalid_client")
    );
  });
});
