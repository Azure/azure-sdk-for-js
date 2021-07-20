// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as https from "https";
import {
  getIdentityClientAuthorityHost,
  IdentityClient,
  TokenResponse
} from "../../src/client/identityClient";
import { ClientSecretCredential } from "../../src";
import { Context } from "mocha";
import { isNode } from "../../src/util/isNode";
import {
  createRequest,
  createResponse,
  IdentityTestContext,
  isExpectedError,
  prepareIdentityTests,
  getError,
  SendCredentialRequests
} from "../authTestUtils";
import { IncomingMessage } from "http";

describe("IdentityClient", function() {
  let testContext: IdentityTestContext;
  let sendCredentialRequests: SendCredentialRequests;
  beforeEach(async function() {
    testContext = await prepareIdentityTests({ replaceLogger: true, logLevel: "verbose" });
    sendCredentialRequests = testContext.sendCredentialRequests;
  });
  afterEach(async function() {
    await testContext.restore();
  });

  /**
   * Wraps the outgoing request in a mocked environment, then returns the result of the request.
   */
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

  /**
   * Wraps the outgoing request in a mocked environment, then returns the error that results from the request.
   */
  async function sendRequestAndGetError<T>(
    sendPromise: () => Promise<T | null>,
    response: IncomingMessage
  ): Promise<Error> {
    return getError(sendRequest(sendPromise, response));
  }

  const scope = "https://test/.default";

  it("throws an exception when an authentication request fails", async () => {
    const credential = new ClientSecretCredential("tenant", "client", "secret");
    const response = createResponse(
      400,
      JSON.stringify({ error: "test_error", error_description: "This is a test error" })
    );
    const error = await sendRequestAndGetError(async () => credential.getToken(scope), response);
    assert.strictEqual(error.name, "AuthenticationError");
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

  it("parses authority host environment variable as expected", function(this: Context) {
    if (!isNode) {
      return this.skip();
    }
    process.env.AZURE_AUTHORITY_HOST = "http://totallyinsecure.lol";
    assert.equal(getIdentityClientAuthorityHost({}), process.env.AZURE_AUTHORITY_HOST);
    return;
  });

  it("throws an exception when an Env AZURE_AUTHORITY_HOST using 'http' is provided", async function(this: Context) {
    if (!isNode) {
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
    const error = await getError(
      sendCredentialRequests({
        scopes: ["https://test/.default"],
        credential: new ClientSecretCredential("tenant", "client", "secret"),
        secureResponses: [
          {
            response: createResponse(500)
          }
        ]
      })
    );

    // Keep in mind that this credential has different implementations in Node and in browsers.
    if (isNode) {
      assert.equal(error.name, "CredentialUnavailableError");
    } else {
      assert.equal(error.name, "AuthenticationError");
    }
  });

  it("parses authority host environment variable as expected", function(this: Context) {
    if (!isNode) {
      return this.skip();
    }
    process.env.AZURE_AUTHORITY_HOST = "http://totallyinsecure.lol";
    assert.equal(getIdentityClientAuthorityHost({}), process.env.AZURE_AUTHORITY_HOST);
    return;
  });

  it("returns a usable error when the authentication response doesn't contain a body", async () => {
    const credential = new ClientSecretCredential("tenant", "client", "secret");
    const response = createResponse(300, "");
    const error = await sendRequestAndGetError(async () => credential.getToken(scope), response);
    isExpectedError("unknown_error")(error);
  });

  it("returns null when the token refresh request returns an 'interaction_required' error", async () => {
    const client = new IdentityClient({ authorityHost: "https://authority" });
    const response = createResponse(
      401,
      JSON.stringify({
        error: "interaction_required",
        error_description: "Interaction required"
      })
    );
    const tokenResponse = await sendRequest<TokenResponse>(async () => {
      return client.refreshAccessToken("tenant", "client", "scopes", "token", undefined);
    }, response);

    assert.equal(tokenResponse, null);

    const expectedMessages = [
      /.*azure:identity:info.*IdentityClient: refreshing access token with client ID: client, scopes: scopes started.*/,
      /.*azure:identity:info.*IdentityClient: sending token request to \[https:\/\/authority\/tenant\/oauth2\/v2.0\/token\].*/,
      /.*azure:identity:warning.*IdentityClient: authentication error. HTTP status: 401, Interaction required.*/,
      /.*azure:identity:info.*IdentityClient: interaction required for client ID: client.*/
    ];

    const logMessages = testContext.logMessages.filter(
      (msg: string) => msg.indexOf("azure:identity:") >= 0
    );

    assert.equal(expectedMessages.length, logMessages.length);

    for (let i = 0; i < logMessages.length; i++) {
      assert.ok(logMessages[i].match(expectedMessages[i]), `Checking[${i}] ${logMessages[i]}`);
    }
  });

  it("rethrows any other error that is thrown while refreshing the access token", async () => {
    const client = new IdentityClient();
    const response = createResponse(
      401,
      JSON.stringify({
        error: "interaction_required",
        error_description: "Interaction required"
      })
    );
    const error = await sendRequestAndGetError(async () => {
      return client.refreshAccessToken("tenant", "client", "scopes", "token", undefined);
    }, response);
    isExpectedError("invalid_client")(error);
  });
});
