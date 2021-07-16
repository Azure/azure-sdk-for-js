// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import * as https from "https";
import { IdentityClient, TokenResponse } from "../../src/client/identityClient";
import { ClientSecretCredential } from "../../src";
import { isNode } from "../../src/util/isNode";
import {
  assertRejects,
  createRequest,
  createResponse,
  IdentityTestContext,
  isExpectedError,
  prepareIdentityTests
} from "../authTestUtils";
import { IncomingMessage } from "http";

describe("IdentityClient", function() {
  let testContext: IdentityTestContext;
  beforeEach(async function() {
    testContext = await prepareIdentityTests({ replaceLogger: true, logLevel: "verbose" });
  });
  afterEach(async function() {
    await testContext.restore();
  });

  async function sendRequest<T>(
    sendPromise: () => Promise<T | null>,
    response: IncomingMessage
  ): Promise<T | null> {
    const stubbedHttpsRequest = testContext.sandbox.stub(https, "request");

    stubbedHttpsRequest.returns(createRequest());
    const promise = sendPromise();
    stubbedHttpsRequest.yield(response);
    await testContext.clock.runAllAsync();
    return promise;
  }

  it("throws an exception when an authentication request fails", async () => {
    await assertRejects(
      sendRequest(async () => {
        const credential = new ClientSecretCredential("tenant", "client", "secret");
        return credential.getToken("https://test/.default");
      }, createResponse(400, JSON.stringify({ error: "test_error", error_description: "This is a test error" }))),
      (e) => {
        assert.strictEqual(e.name, "AuthenticationError");
        return true;
      }
    );
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

    return;
  });

  it("returns a usable error when the authentication response doesn't contain a body", async () => {
    await assertRejects(
      sendRequest(async () => {
        const credential = new ClientSecretCredential("tenant", "client", "secret");
        return credential.getToken("https://test/.default", {
          requestOptions: {}
        });
      }, createResponse(300, "")),
      isExpectedError("unknown_error")
    );
  });

  it("returns null when the token refresh request returns an 'interaction_required' error", async () => {
    const tokenResponse = await sendRequest<TokenResponse>(
      async () => {
        const client = new IdentityClient({ authorityHost: "https://authority" });
        return client.refreshAccessToken("tenant", "client", "scopes", "token", undefined);
      },
      createResponse(
        401,
        JSON.stringify({
          error: "interaction_required",
          error_description: "Interaction required"
        })
      )
    );

    assert.equal(tokenResponse, null);

    const expectedMessages = [
      /.*azure:identity:info.*IdentityClient: refreshing access token with client ID: client, scopes: scopes started.*/,
      /.*azure:identity:info.*IdentityClient: sending token request to \[https:\/\/authority\/tenant\/oauth2\/v2.0\/token\].*/,
      /.*azure:identity:warning.*IdentityClient: authentication error. HTTP status: 401, Interaction required.*/,
      /.*azure:identity:info.*IdentityClient: interaction required for client ID: client.*/
    ];

    const logMessages = testContext.logMessages.filter(
      (msg) => msg.indexOf("azure:identity:") >= 0
    );

    assert.equal(expectedMessages.length, logMessages.length);

    for (let i = 0; i < logMessages.length; i++) {
      assert.ok(logMessages[i].match(expectedMessages[i]), `Checking[${i}] ${logMessages[i]}`);
    }
  });

  it("rethrows any other error that is thrown while refreshing the access token", async () => {
    await assertRejects(
      sendRequest<TokenResponse>(
        async () => {
          const client = new IdentityClient();
          return client.refreshAccessToken("tenant", "client", "scopes", "token", undefined);
        },
        createResponse(
          401,
          JSON.stringify({
            error: "interaction_required",
            error_description: "Interaction required"
          })
        )
      ),
      isExpectedError("invalid_client")
    );
  });
});
