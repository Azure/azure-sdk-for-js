// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { RestError } from "@azure/core-rest-pipeline";
import { AzureApplicationCredential } from "../../../src/credentials/azureApplicationCredential";
import { prepareIdentityTests } from "../../httpRequests";
import {
  createResponse,
  IdentityTestContext,
  SendCredentialRequests
} from "../../httpRequestsCommon";

describe("AzureApplicationCredential testing Managed Identity (internal)", function() {
  let envCopy: string = "";
  let testContext: IdentityTestContext;
  let sendCredentialRequests: SendCredentialRequests;

  beforeEach(async () => {
    envCopy = JSON.stringify(process.env);
    delete process.env.MSI_ENDPOINT;
    delete process.env.MSI_SECRET;
    delete process.env.AZURE_CLIENT_SECRET;
    delete process.env.AZURE_TENANT_ID;
    testContext = await prepareIdentityTests({});
    sendCredentialRequests = testContext.sendCredentialRequests;
  });
  afterEach(async () => {
    const env = JSON.parse(envCopy);
    process.env.MSI_ENDPOINT = env.MSI_ENDPOINT;
    process.env.MSI_SECRET = env.MSI_SECRET;
    process.env.AZURE_CLIENT_SECRET = env.AZURE_CLIENT_SECRET;
    process.env.AZURE_TENANT_ID = env.AZURE_TENANT_ID;
    await testContext.restore();
  });

  it("returns error when no MSI is available", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";

    const { error } = await sendCredentialRequests({
      scopes: ["scopes"],
      credential: new AzureApplicationCredential(),
      insecureResponses: [
        {
          error: new RestError("Request Timeout", { code: "REQUEST_SEND_ERROR", statusCode: 408 })
        }
      ]
    });
    assert.ok(
      error!.message!.indexOf("No MSI credential available") > -1,
      "Failed to match the expected error"
    );
  });

  it("an unexpected error bubbles all the way up", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";

    const errorMessage = "ManagedIdentityCredential authentication failed.";

    const { error } = await sendCredentialRequests({
      scopes: ["scopes"],
      credential: new AzureApplicationCredential(),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        { error: new RestError(errorMessage, { statusCode: 500 }) }
      ]
    });
    assert.ok(error?.message.startsWith(errorMessage));
  });

  it("returns expected error when the network was unreachable", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";

    const netError: RestError = new RestError("Request Timeout", {
      code: "ENETUNREACH",
      statusCode: 408
    });

    const { error } = await sendCredentialRequests({
      scopes: ["scopes"],
      credential: new AzureApplicationCredential(),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        { error: netError }
      ]
    });
    assert.ok(error!.message!.indexOf("Network unreachable.") > -1);
  });

  it("sends an authorization request correctly in an App Service environment", async () => {
    // Trigger App Service behavior by setting environment variables
    process.env.AZURE_CLIENT_ID = "client";
    process.env.MSI_ENDPOINT = "https://endpoint";
    process.env.MSI_SECRET = "secret";

    const authDetails = await sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new AzureApplicationCredential(),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00"
        })
      ]
    });

    const authRequest = authDetails.requests[0];
    const query = new URLSearchParams(authRequest.url.split("?")[1]);

    assert.equal(authRequest.method, "GET");
    assert.equal(query.get("clientid"), "client");
    assert.equal(decodeURIComponent(query.get("resource")!), "https://service");
    assert.ok(
      authRequest.url.startsWith(process.env.MSI_ENDPOINT),
      "URL does not start with expected host and path"
    );
    assert.equal(authRequest.headers.secret, process.env.MSI_SECRET);
    assert.ok(
      authRequest.url.indexOf(`api-version=2017-09-01`) > -1,
      "URL does not have expected version"
    );
    if (authDetails.result?.token) {
      assert.equal(authDetails.result.expiresOnTimestamp, 1560999478000);
    } else {
      assert.fail("No token was returned!");
    }
  });
});
