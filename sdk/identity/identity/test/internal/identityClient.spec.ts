// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  getIdentityClientAuthorityHost,
  IdentityClient,
  TokenResponse
} from "../../src/client/identityClient";
import { ClientSecretCredential } from "../../src";
import { Context } from "mocha";
import { isNode } from "../../src/util/isNode";
import { isExpectedError, getError } from "../authTestUtils";
import { openIdConfigurationResponse, PlaybackTenantId } from "../msalTestUtils";
import {
  IdentityTestContext,
  SendCredentialRequests,
  SendIndividualRequest,
  SendIndividualRequestAndGetError,
  TestResponse
} from "../httpRequestsTypes";
import { createResponse, prepareIdentityTests } from "../httpRequests";

describe.only("IdentityClient", function () {
  let testContext: IdentityTestContext;
  let sendIndividualRequest: SendIndividualRequest;
  let sendIndividualRequestAndGetError: SendIndividualRequestAndGetError;
  let sendCredentialRequests: SendCredentialRequests;

  beforeEach(async function () {
    testContext = await prepareIdentityTests({ replaceLogger: true, logLevel: "verbose" });
    sendIndividualRequest = testContext.sendIndividualRequest;
    sendIndividualRequestAndGetError = testContext.sendIndividualRequestAndGetError;
    sendCredentialRequests = testContext.sendCredentialRequests;
  });
  afterEach(async function () {
    await testContext.restore();
  });

  it.only("throws an exception if the credential is not available (can't resolve discovery endpoint)", async () => {
    const { error } = await sendCredentialRequests({
      scopes: ["scope"],
      credential: new ClientSecretCredential(PlaybackTenantId, "client", "secret"),
      secureResponses: [
        {
          response: createResponse(400, {
            error: "test_error",
            error_description: "This is a test error"
          })
        }
      ]
    });
    console.log("11111 ERROR", error);
    assert.strictEqual(error!.name, "CredentialUnavailableError");
  });

  it.only("throws an exception when an authentication request fails", async () => {
    let responses: { response: TestResponse }[] = [];
    if (isNode) {
      responses.push({ response: createResponse(200, openIdConfigurationResponse) });
    }
    responses.push({
      response: createResponse(400, {
        error: "test_error",
        error_description: "This is a test error"
      })
    });

    const { error } = await sendCredentialRequests({
      scopes: ["https://test/.default"],
      credential: new ClientSecretCredential(PlaybackTenantId, "client", "secret"),
      secureResponses: responses
    });
    assert.strictEqual(error!.name, "AuthenticationRequiredError");
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

  it("parses authority host environment variable as expected", function (this: Context) {
    if (!isNode) {
      return this.skip();
    }
    process.env.AZURE_AUTHORITY_HOST = "http://totallyinsecure.lol";
    assert.equal(getIdentityClientAuthorityHost({}), process.env.AZURE_AUTHORITY_HOST);
    return;
  });

  it("throws an exception when an Env AZURE_AUTHORITY_HOST using 'http' is provided", async function (this: Context) {
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

  it("parses authority host environment variable as expected", function (this: Context) {
    if (!isNode) {
      return this.skip();
    }
    process.env.AZURE_AUTHORITY_HOST = "http://totallyinsecure.lol";
    assert.equal(getIdentityClientAuthorityHost({}), process.env.AZURE_AUTHORITY_HOST);
    return;
  });

  it("returns a usable error when the authentication response doesn't contain a body", async () => {
    const credential = new ClientSecretCredential("tenant", "client", "secret");
    const response = createResponse(300);
    const error = await getError(
      sendCredentialRequests({
        scopes: ["scope"],
        credential,
        secureResponses: [{ response }]
      })
    );
    isExpectedError("unknown_error")(error);
  });

  it("returns null when the token refresh request returns an 'interaction_required' error", async () => {
    const client = new IdentityClient({ authorityHost: "https://authority" });
    const response = createResponse(401, {
      error: "interaction_required",
      error_description: "Interaction required"
    });
    const tokenResponse = await sendIndividualRequest<TokenResponse>(async () => {
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
    const response = createResponse(401, {
      error: "interaction_required",
      error_description: "Interaction required"
    });
    const error = await sendIndividualRequestAndGetError(async () => {
      return client.refreshAccessToken("tenant", "client", "scopes", "token", undefined);
    }, response);
    isExpectedError("invalid_client")(error);
  });
});
