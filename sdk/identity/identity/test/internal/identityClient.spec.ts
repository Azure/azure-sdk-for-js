// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { isNode } from "@azure/core-util";
import {
  getIdentityClientAuthorityHost,
  IdentityClient,
  TokenResponse,
} from "../../src/client/identityClient";
import { ClientSecretCredential } from "../../src";
import { Context } from "mocha";
import { isExpectedError } from "../authTestUtils";
import { PlaybackTenantId } from "../msalTestUtils";
import { createResponse, IdentityTestContextInterface } from "../httpRequestsCommon";
import { IdentityTestContext, prepareMSALResponses } from "../httpRequests";

describe("IdentityClient", function () {
  let testContext: IdentityTestContextInterface;

  beforeEach(async function () {
    testContext = new IdentityTestContext({ replaceLogger: true, logLevel: "verbose" });
  });
  afterEach(async function () {
    if (isNode) {
      delete process.env.AZURE_AUTHORITY_HOST;
    }
    await testContext.restore();
  });

  it("throws an exception if the credential is not available (can't resolve discovery endpoint)", async () => {
    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scope"],
      credential: new ClientSecretCredential(PlaybackTenantId, "client", "secret"),
      secureResponses: [
        createResponse(400, {
          error: "test_error",
          error_description: "This is a test error",
        }),
      ],
    });
    if (isNode) {
      assert.strictEqual(error!.name, "CredentialUnavailableError");
    } else {
      // The browser version of this credential uses a legacy approach.
      // While the Node version uses MSAL, the browser version does the network requests directly.
      // While that means the browser version is simpler, it also means the browser version will not keep the same behavior.
      assert.strictEqual(error!.name, "AuthenticationError");
    }
  });

  it("throws an exception when an authentication request fails", async () => {
    const { error } = await testContext.sendCredentialRequests({
      scopes: ["https://test/.default"],
      credential: new ClientSecretCredential("adfs", "client", "secret"),
      secureResponses: [
        ...prepareMSALResponses(),
        createResponse(400, {
          error: "test_error",
          error_description: "This is a test error",
        }),
      ],
    });
    if (isNode) {
      assert.strictEqual(error!.name, "AuthenticationRequiredError");
      assert.ok(error!.message.indexOf("This is a test error") > -1);
    } else {
      // The browser version of this credential uses a legacy approach.
      // While the Node version uses MSAL, the browser version does the network requests directly.
      // While that means the browser version is simpler, it also means the browser version will not keep the same behavior.
      assert.strictEqual(error!.name, "AuthenticationError");
    }
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
    return;
  });

  it("returns a usable error when the authentication response doesn't contain a body", async () => {
    const credential = new ClientSecretCredential("adfs", "client", "secret");
    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scope"],
      credential,
      secureResponses: [...prepareMSALResponses(), createResponse(300)],
    });
    if (isNode) {
      assert.strictEqual(error?.name, "AuthenticationRequiredError");
      assert.strictEqual(error?.message, `Response had no "expiresOn" property.`);
    } else {
      // The browser version of this credential uses a legacy approach.
      // While the Node version uses MSAL, the browser version does the network requests directly.
      // While that means the browser version is simpler, it also means the browser version will not keep the same behavior.
      assert.strictEqual(error!.name, "AuthenticationError");
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

  it("returns null when the token refresh request returns an 'interaction_required' error", async function (this: Context) {
    const client = new IdentityClient({ authorityHost: "https://authority" });
    const response = createResponse(401, {
      error: "interaction_required",
      error_description: "Interaction required",
    });
    const tokenResponse = await testContext.sendIndividualRequest<TokenResponse>(async () => {
      return client.refreshAccessToken("tenant", "client", "scopes", "token", undefined);
    }, response);

    assert.equal(tokenResponse, null);

    const expectedMessages = [
      /.*azure:identity:info.*IdentityClient: refreshing access token with client ID: client, scopes: scopes started.*/,
      /.*azure:identity:info.*IdentityClient: sending token request to \[https:\/\/authority\/tenant\/oauth2\/v2.0\/token\].*/,
      /.*azure:identity:warning.*IdentityClient: authentication error. HTTP status: 401, Interaction required.*/,
      /.*azure:identity:info.*IdentityClient: interaction required for client ID: client.*/,
    ];

    const logMessages = testContext.logMessages.filter(
      (msg: string) => msg.indexOf("azure:identity:") >= 0
    );

    assert.equal(expectedMessages.length, logMessages.length);

    for (let i = 0; i < logMessages.length; i++) {
      assert.ok(logMessages[i].match(expectedMessages[i]), `Checking[${i}] ${logMessages[i]}`);
    }
    return;
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
