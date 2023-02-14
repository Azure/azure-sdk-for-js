// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureAuthorityHosts, DefaultAuthorityHost, DefaultTenantId } from "../../../src/constants";
import { IdentityTestContextInterface, createResponse } from "../../httpRequestsCommon";
import { mkdtemp, writeFile } from "fs/promises";
import { Context } from "mocha";
import { IdentityTestContext } from "../../httpRequests";
import { WorkloadIdentityCredential } from "../../../src/credentials/workloadIdentityCredential";
import { assert } from "chai";
import { join } from "path";
import { tmpdir } from "os";

describe("WorkloadIdentityCredential (internal)", () => {
  let testContext: IdentityTestContextInterface;
  let envCopy: string = "";

  beforeEach(async function () {
    envCopy = JSON.stringify(process.env);
    delete process.env.AZURE_CLIENT_ID;
    delete process.env.AZURE_TENANT_ID;
    delete process.env.AZURE_CLIENT_SECRET;
    delete process.env.IDENTITY_ENDPOINT;
    delete process.env.IDENTITY_HEADER;
    delete process.env.MSI_ENDPOINT;
    delete process.env.MSI_SECRET;
    delete process.env.IDENTITY_SERVER_THUMBPRINT;
    delete process.env.IMDS_ENDPOINT;
    delete process.env.AZURE_AUTHORITY_HOST;
    delete process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST;
    delete process.env.AZURE_FEDERATED_TOKEN_FILE;
    testContext = new IdentityTestContext({});
  });

  afterEach(async function () {
    const env = JSON.parse(envCopy);
    // Useful for record mode.
    process.env.AZURE_CLIENT_ID = env.AZURE_CLIENT_ID;
    process.env.AZURE_TENANT_ID = env.AZURE_TENANT_ID;
    process.env.AZURE_CLIENT_SECRET = env.AZURE_CLIENT_SECRET;
    await testContext.restore();
  });

  it("sends an authorization request correctly if token file path is available", async function (this: Context) {
    const testTitle = this.test?.title || Date.now().toString();
    const tempDir = await mkdtemp(join(tmpdir(), testTitle));
    const tempFile = join(tempDir, testTitle);
    const expectedAssertion = "{}";
    await writeFile(tempFile, expectedAssertion, { encoding: "utf8" });

    // Trigger token file path by setting environment variables
    process.env.AZURE_TENANT_ID = "my-tenant-id";
    process.env.AZURE_FEDERATED_TOKEN_FILE = tempFile;
    process.env.AZURE_AUTHORITY_HOST = AzureAuthorityHosts.AzureGovernment;

    const parameterClientId = "client";

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new WorkloadIdentityCredential(
        process.env.AZURE_TENANT_ID!,
        parameterClientId,
        process.env.AZURE_FEDERATED_TOKEN_FILE
      ),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_in: 1,
        }),
      ],
    });

    const authRequest = authDetails.requests[0];

    const body = new URLSearchParams(authRequest.body);

    assert.strictEqual(
      authRequest.url,
      `${AzureAuthorityHosts.AzureGovernment}/${"my-tenant-id"}/oauth2/v2.0/token`
    );
    assert.strictEqual(authRequest.method, "POST");
    assert.strictEqual(decodeURIComponent(body.get("client_id")!), parameterClientId);
    assert.strictEqual(decodeURIComponent(body.get("client_assertion")!), expectedAssertion);
    assert.strictEqual(
      decodeURIComponent(body.get("client_assertion_type")!),
      "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"
    );
    assert.strictEqual(decodeURIComponent(body.get("scope")!), "https://service/.default");
    assert.strictEqual(authDetails.result!.token, "token");
    assert.strictEqual(authDetails.result!.expiresOnTimestamp, 1000);
  });

  it("reads from the token file again only after 5 minutes have passed", async function (this: Mocha.Context) {
    // Keep in mind that in this test we're also testing:
    // - Client ID on environment variable.
    // - Default AZURE_TENANT_ID.
    // - Default AZURE_AUTHORITY_HOST.
    // - Support for multiple scopes.

    const testTitle = this.test?.title || Date.now().toString();
    const tempDir = await mkdtemp(join(tmpdir(), testTitle));
    const tempFile = join(tempDir, testTitle);
    const expectedAssertion = "{}";
    await writeFile(tempFile, expectedAssertion, { encoding: "utf8" });

    // Trigger token file path by setting environment variables
    process.env.AZURE_CLIENT_ID = "client-id";
    process.env.AZURE_TENANT_ID = DefaultTenantId;
    process.env.AZURE_FEDERATED_TOKEN_FILE = tempFile;

    const credential = new WorkloadIdentityCredential(
      process.env.AZURE_TENANT_ID!,
      process.env.AZURE_CLIENT_ID!,
      process.env.AZURE_FEDERATED_TOKEN_FILE
    );

    let authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default", "https://service2/.default"],
      credential,
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: 1,
        }),
      ],
    });

    let authRequest = authDetails.requests[0];
    let body = new URLSearchParams(authRequest.body);

    assert.strictEqual(
      authRequest.url,
      `${DefaultAuthorityHost}/${DefaultTenantId}/oauth2/v2.0/token`
    );
    assert.strictEqual(authRequest.method, "POST");
    assert.strictEqual(decodeURIComponent(body.get("client_id")!), process.env.AZURE_CLIENT_ID);
    assert.strictEqual(decodeURIComponent(body.get("client_assertion")!), expectedAssertion);
    assert.strictEqual(
      decodeURIComponent(body.get("client_assertion_type")!),
      "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"
    );
    assert.strictEqual(
      decodeURIComponent(body.get("scope")!),
      "https://service/.default https://service2/.default"
    );
    assert.strictEqual(authDetails.result!.token, "token");

    const newExpectedAssertion = '{ "different": true }';
    await writeFile(tempFile, newExpectedAssertion, { encoding: "utf8" });

    // A new credential means we read the file again
    testContext.sandbox.restore();
    authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default", "https://service2/.default"],
      credential: new WorkloadIdentityCredential(
        process.env.AZURE_TENANT_ID!,
        "client",
        process.env.AZURE_FEDERATED_TOKEN_FILE
      ),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: 1,
        }),
      ],
    });
    authRequest = authDetails.requests[0];
    body = new URLSearchParams(authRequest.body);
    assert.strictEqual(decodeURIComponent(body.get("client_assertion")!), newExpectedAssertion);

    // If we stick to the original credential...

    // Less than 5 minutes means we don't read the file again.
    testContext.sandbox.restore();
    testContext.sandbox.useFakeTimers();
    authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default", "https://service2/.default"],
      credential,
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: 1,
        }),
      ],
    });

    authRequest = authDetails.requests[0];
    body = new URLSearchParams(authRequest.body);
    assert.strictEqual(decodeURIComponent(body.get("client_assertion")!), expectedAssertion);

    // More than 5 minutes means we read the file again.
    testContext.sandbox.restore();
    testContext.sandbox.useFakeTimers();
    testContext.sandbox.clock.tick(1000 * 60 * 5);
    authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default", "https://service2/.default"],
      credential,
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: 1,
        }),
      ],
    });
    authRequest = authDetails.requests[0];
    body = new URLSearchParams(authRequest.body);
    assert.strictEqual(decodeURIComponent(body.get("client_assertion")!), newExpectedAssertion);
  });
});
