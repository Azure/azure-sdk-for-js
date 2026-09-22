// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { IdentityTestContext, prepareMSALResponses } from "./httpRequests.js";
import type { IdentityTestContextInterface } from "../../httpRequestsCommon.js";
import { createResponse } from "../../httpRequestsCommon.js";
import { OnBehalfOfCredential } from "@azure/identity";
import { isNodeLike } from "@azure/core-util";
import { describe, it, assert, afterEach, beforeEach } from "vitest";

describe("OnBehalfOfCredential", function () {
  let testContext: IdentityTestContextInterface;

  beforeEach(function () {
    testContext = new IdentityTestContext({ replaceLogger: true, logLevel: "verbose" });
  });

  afterEach(async function () {
    if (isNodeLike) {
      delete process.env.AZURE_AUTHORITY_HOST;
    }
    await testContext.restore();
  });

  it("authenticates with a secret", async () => {
    const credential = new OnBehalfOfCredential({
      tenantId: "adfs",
      clientId: "client",
      clientSecret: "secret",
      userAssertionToken: "user-assertion",
      authorityHost: "https://fake-authority.com",
    });

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://test/.default"],
      credential,
      secureResponses: [
        ...prepareMSALResponses(),
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00",
        }),
      ],
    });
    assert.equal(authDetails.requests.length, 2);
    const authRequest = authDetails.requests[1];
    assert.isTrue(authRequest.body.includes("client_secret=secret"));

    assert.exists(authDetails.result?.token);
    assert.isNumber(authDetails.result?.expiresOnTimestamp);
  });

  it("authenticates with a certificate path", async () => {
    const certificatePath = path.join("assets", "fake-cert.pem");
    const credential = new OnBehalfOfCredential({
      tenantId: "adfs",
      clientId: "client",
      certificatePath,
      userAssertionToken: "user-assertion",
      authorityHost: "https://fake-authority.com",
    });

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://test/.default"],
      credential,
      secureResponses: [
        ...prepareMSALResponses(),
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00",
        }),
      ],
    });

    assert.equal(authDetails.requests.length, 2);
    const authRequest = authDetails.requests[1];
    assert.isTrue(authRequest.body.includes("client_assertion=eyJ")); // The assertion is base64 encoded JWT

    assert.exists(authDetails.result?.token);
    assert.isNumber(authDetails.result?.expiresOnTimestamp);
  });

  it("authenticates with a certificate assertion", async () => {
    const credential = new OnBehalfOfCredential({
      tenantId: "adfs",
      clientId: "client",
      getAssertion: () => Promise.resolve("foo"),
      userAssertionToken: "user-assertion",
      authorityHost: "https://fake-authority.com",
    });

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://test/.default"],
      credential,
      secureResponses: [
        ...prepareMSALResponses(),
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00",
        }),
      ],
    });

    assert.equal(authDetails.requests.length, 2);
    const authRequest = authDetails.requests[1];
    assert.isTrue(authRequest.body.includes("client_assertion=foo"));

    assert.exists(authDetails.result?.token);
    assert.isNumber(authDetails.result?.expiresOnTimestamp);
  });
});
