// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { RestError } from "@azure/core-http";
import { AuthenticationError, ApplicationCredential } from "../../../src";
import { MockAuthHttpClient, assertRejects } from "../../authTestUtils";
import { OAuthErrorResponse } from "../../../src/client/errors";
import Sinon from "sinon";

describe.skip("ApplicationCredential (internal)", function() {
  let envCopy: string = "";
  let sandbox: Sinon.SinonSandbox;

  beforeEach(() => {
    envCopy = JSON.stringify(process.env);
    delete process.env.MSI_ENDPOINT;
    delete process.env.MSI_SECRET;
    sandbox = Sinon.createSandbox();
  });
  afterEach(() => {
    const env = JSON.parse(envCopy);
    process.env.MSI_ENDPOINT = env.MSI_ENDPOINT;
    process.env.MSI_SECRET = env.MSI_SECRET;
    sandbox.restore();
  });

  it("returns error when no MSI is available", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";

    const imdsError: RestError = new RestError("Request Timeout", "REQUEST_SEND_ERROR", 408);
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [{ error: imdsError }]
    });

    const credential = new ApplicationCredential({
      ...mockHttpClient.tokenCredentialOptions
    });
    await assertRejects(
      credential.getToken("scopes"),
      (error: AuthenticationError) => error.message.indexOf("No MSI credential available") > -1
    );
  });

  it("an unexpected error bubbles all the way up", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";

    const errResponse: OAuthErrorResponse = {
      error: "ApplicationCredential authentication failed.",
      error_description: ""
    };

    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [{ status: 200 }, { status: 500, parsedBody: errResponse }]
    });

    const credential = new ApplicationCredential({
      ...mockHttpClient.tokenCredentialOptions
    });
    await assertRejects(
      credential.getToken("scopes"),
      (error: AuthenticationError) => error.message.indexOf(errResponse.error) > -1
    );
  });

  it("returns expected error when the network was unreachable", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";

    const netError: RestError = new RestError("Request Timeout", "ENETUNREACH", 408);
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [{ status: 200 }, { error: netError }]
    });
    console.dir(mockHttpClient.tokenCredentialOptions);
    const credential = new ApplicationCredential({
      ...mockHttpClient.tokenCredentialOptions
    });
    await assertRejects(
      credential.getToken("scopes"),
      (error: AuthenticationError) => error.message.indexOf("Network unreachable.") > -1
    );
  });

  it("sends an authorization request correctly in an App Service environment", async () => {
    // Trigger App Service behavior by setting environment variables
    process.env.MSI_ENDPOINT = "https://endpoint";
    process.env.MSI_SECRET = "secret";

    const mockHttpClient = new MockAuthHttpClient({
      authResponse: {
        status: 200,
        parsedBody: {
          token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00"
        }
      }
    });
    const credential = new ApplicationCredential({ ...mockHttpClient.tokenCredentialOptions });
    const token = await credential.getToken(["https://service/.default"]);
    const authDetails = { token, requests: mockHttpClient.requests };

    const authRequest = authDetails.requests[0];
    assert.ok(authRequest.query, "No query string parameters on request");
    if (authRequest.query) {
      assert.equal(authRequest.method, "GET");
      assert.equal(authRequest.query["clientid"], "client");
      assert.equal(decodeURIComponent(authRequest.query["resource"]), "https://service");
      assert.ok(
        authRequest.url.startsWith(process.env.MSI_ENDPOINT),
        "URL does not start with expected host and path"
      );
      assert.equal(authRequest.headers.get("secret"), process.env.MSI_SECRET);
      assert.ok(
        authRequest.url.indexOf(`api-version=2017-09-01`) > -1,
        "URL does not have expected version"
      );
      if (authDetails.token) {
        assert.equal(authDetails.token.expiresOnTimestamp, 1560999478000);
      } else {
        assert.fail("No token was returned!");
      }
    }
  });
});
