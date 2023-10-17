// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogger, setLogLevel } from "@azure/logger";
import { IdentityTestContextInterface, createResponse } from "../../httpRequestsCommon";
import {
  imdsApiVersion,
  imdsEndpointPath,
  imdsHost,
} from "../../../src/credentials/managedIdentityCredential/constants";
import {
  imdsMsi,
  imdsMsiRetryConfig,
} from "../../../src/credentials/managedIdentityCredential/imdsMsi";
import { mkdtempSync, rmdirSync, unlinkSync, writeFileSync } from "fs";
import { Context } from "mocha";
import { GetTokenOptions } from "@azure/core-auth";
import { IdentityTestContext } from "../../httpRequests";
import { ManagedIdentityCredential } from "../../../src";
import { RestError } from "@azure/core-rest-pipeline";
import Sinon from "sinon";
import { assert } from "chai";
import { join } from "path";
import { logger } from "../../../src/credentials/managedIdentityCredential/cloudShellMsi";
import { tmpdir } from "os";

describe("ManagedIdentityCredential", function () {
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

  it("sends an authorization request with a modified resource name", async function () {
    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client", {
        authorityHost: "https://login.microsoftonline.com",
      }),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        createResponse(200, {
          access_token: "token",
          expires_on: "1506484173",
        }),
      ],
    });

    // The first request is the IMDS ping.
    // This ping request has to skip a header and the query parameters for it to work on POD identity.
    const imdsPingRequest = authDetails.requests[0];
    assert.ok(!imdsPingRequest.headers!.metadata);
    assert.equal(imdsPingRequest.url, new URL(imdsEndpointPath, imdsHost).toString());

    // The second one tries to authenticate against IMDS once we know the endpoint is available.
    const authRequest = authDetails.requests[1];

    const query = new URLSearchParams(authRequest.url.split("?")[1]);

    assert.equal(authRequest.method, "GET");
    assert.equal(query.get("client_id"), "client");
    assert.equal(decodeURIComponent(query.get("resource")!), "https://service");
    assert.ok(authRequest.url.startsWith(imdsHost), "URL does not start with expected host");
    assert.ok(
      authRequest.url.indexOf(`api-version=${imdsApiVersion}`) > -1,
      "URL does not have expected version"
    );
  });

  it("sends an authorization request with an unmodified resource name", async () => {
    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["someResource"],
      credential: new ManagedIdentityCredential(),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        createResponse(200, {
          access_token: "token",
          expires_on: "1506484173",
        }),
      ],
    });

    // The first request is the IMDS ping.
    // The second one tries to authenticate against IMDS once we know the endpoint is available.
    const authRequest = authDetails.requests[1];

    const query = new URLSearchParams(authRequest.url.split("?")[1]);

    assert.equal(query.get("client_id"), undefined);
    assert.equal(decodeURIComponent(query.get("resource")!), "someResource");
  });

  it("sends an authorization request with allowLoggingAccountIdentifiers set to true", async function () {
    setLogLevel("info");
    const spy = testContext.sandbox.spy(process.stderr, "write");

    const accessTokenData = {
      appid: "HIDDEN",
      tid: "HIDDEN",
      oid: "HIDDEN",
    };
    const base64AccessTokenData = Buffer.from(JSON.stringify(accessTokenData), "utf8").toString(
      "base64"
    );

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client", {
        loggingOptions: { allowLoggingAccountIdentifiers: true },
      }),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        createResponse(200, {
          access_token: `token.${base64AccessTokenData}`,
          expires_on: "1506484173",
        }),
      ],
    });

    // The first request is the IMDS ping.
    // This ping request has to skip a header and the query parameters for it to work on POD identity.
    const imdsPingRequest = authDetails.requests[0];
    assert.ok(!imdsPingRequest.headers!.metadata);
    assert.equal(imdsPingRequest.url, new URL(imdsEndpointPath, imdsHost).toString());

    // The first request is the IMDS ping.
    // The second one tries to authenticate against IMDS once we know the endpoint is available.
    const authRequest = authDetails.requests[1];
    const query = new URLSearchParams(authRequest.url.split("?")[1]);

    assert.equal(authRequest.method, "GET");
    assert.equal(query.get("client_id"), "client");
    assert.equal(decodeURIComponent(query.get("resource")!), "https://service");
    assert.ok(authRequest.url.startsWith(imdsHost), "URL does not start with expected host");
    assert.ok(
      authRequest.url.indexOf(`api-version=${imdsApiVersion}`) > -1,
      "URL does not have expected version"
    );
    const expectedMessage = `azure:identity:info ManagedIdentityCredential => getToken() => SUCCESS. Scopes: https://service/.default.`;
    assert.equal((spy.getCall(spy.callCount - 2).args[0] as any as string).trim(), expectedMessage);
    AzureLogger.destroy();
  });

  it("sends an authorization request with tenantId on getToken", async () => {
    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["someResource"],
      getTokenOptions: { tenantId: "TENANT-ID" } as GetTokenOptions,
      credential: new ManagedIdentityCredential(),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        createResponse(200, {
          access_token: "token",
          expires_on: "1506484173",
        }),
      ],
    });

    // The first request is the IMDS ping.
    // The second one tries to authenticate against IMDS once we know the endpoint is available.
    const authRequest = authDetails.requests[1];

    const query = new URLSearchParams(authRequest.url.split("?")[1]);

    assert.equal(query.get("client_id"), undefined);
    assert.equal(decodeURIComponent(query.get("resource")!), "someResource");
  });

  it("returns error when no MSI is available", async function () {
    process.env.AZURE_CLIENT_ID = "errclient";

    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID),
      insecureResponses: [
        {
          error: new RestError("Request Timeout", { code: "REQUEST_SEND_ERROR", statusCode: 408 }),
        },
      ],
    });
    assert.ok(
      error!.message!.indexOf("No MSI credential available") > -1,
      "Failed to match the expected error"
    );
  });

  it("an unexpected error bubbles all the way up", async function () {
    process.env.AZURE_CLIENT_ID = "errclient";
    const errorMessage = "ManagedIdentityCredential authentication failed.";

    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        { error: new RestError(errorMessage, { statusCode: 500 }) },
      ],
    });
    assert.ok(error?.message.startsWith(errorMessage));
  });

  it("returns expected error when the network was unreachable", async function () {
    process.env.AZURE_CLIENT_ID = "errclient";

    const netError: RestError = new RestError("Request Timeout", {
      code: "ENETUNREACH",
      statusCode: 408,
    });

    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        { error: netError },
      ],
    });
    assert.ok(error!.message!.indexOf("Network unreachable.") > -1);
  });

  it("returns expected error when the host was unreachable", async function () {
    process.env.AZURE_CLIENT_ID = "errclient";

    const hostError: RestError = new RestError("Request Timeout", {
      code: "EHOSTUNREACH",
      statusCode: 408,
    });

    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        { error: hostError },
      ],
    });
    assert.ok(error!.message!.indexOf("No managed identity endpoint found.") > -1);
  });

  it("returns expected error when the Docker Desktop IMDS responds for unreachable network", async function () {
    const netError: RestError = new RestError(
      "connecting to 169.254.169.254:80: connecting to 169.254.169.254:80: dial tcp 169.254.169.254:80: connectex: A socket operation was attempted to an unreachable network.",
      {
        statusCode: 403,
      }
    );

    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential(),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        { error: netError },
      ],
    });

    assert.ok(error!.message!.indexOf("Network unreachable.") > -1);
    assert(error!.name, "CredentialUnavailableError");
  });

  it("IMDS MSI returns error on 403", async function () {
    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential("errclient"),
      insecureResponses: [
        createResponse(403, {
          message:
            "connecting to 169.254.169.254:80: connecting to 169.254.169.254:80: dial tcp 169.254.169.254:80: connectex: A socket operation was attempted to an unreachable network.",
        }),
      ],
    });

    assert.ok(error!.message.indexOf("No MSI credential available") > -1);
    assert(error!.name, "CredentialUnavailableError");
  });
  it("IMDS MSI retries and succeeds on 404", async function () {
    const { result, error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential("errclient", {
        authorityHost: "https://login.microsoftonline.com",
      }),
      insecureResponses: [
        createResponse(200),
        createResponse(404),
        createResponse(404),
        createResponse(200, {
          access_token: "token",
          expires_on: "1506484173",
        }),
      ],
    });
    assert.isUndefined(error);
    assert.equal(result?.token, "token");
  });

  it("IMDS MSI retries up to a limit on 404", async function () {
    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential("errclient"),
      insecureResponses: [
        createResponse(200),
        createResponse(404),
        createResponse(404),
        createResponse(404),
        createResponse(404),
      ],
    });

    assert.ok(
      error!.message!.indexOf(
        `Failed to retrieve IMDS token after ${imdsMsiRetryConfig.maxRetries} retries.`
      ) > -1
    );
  });

  it("IMDS MSI retries also retries on 503s", async function () {
    const { result, error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential("errclient"),
      insecureResponses: [
        // Any response on the ping request is fine, since it means that the endpoint is indeed there.
        createResponse(503),
        // After the ping, we try to get a token from the IMDS endpoint.
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(200, { access_token: "token", expires_on: 1506484173 }),
      ],
    });

    assert.isUndefined(error);
    assert.equal(result?.token, "token");
  });

  it("IMDS MSI retries also retries on 500s", async function () {
    const { result, error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential("errclient"),
      insecureResponses: [
        // Any response on the ping request is fine, since it means that the endpoint is indeed there.
        createResponse(500, {}),
        // After the ping, we try to get a token from the IMDS endpoint.
        createResponse(500, {}),
        createResponse(500, {}),
        createResponse(500, {}),
        createResponse(200, { access_token: "token", expires_on: "1506484173" }),
      ],
    });

    assert.isUndefined(error);
    assert.equal(result?.token, "token");
  });

  it("IMDS MSI stops after 3 retries if the ping always gets 503s", async function () {
    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential("errclient"),
      insecureResponses: [
        // Any response on the ping request is fine, since it means that the endpoint is indeed there.
        createResponse(503, {}, { "Retry-After": "2" }),
        // After the ping, we try to get a token from the IMDS endpoint.
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
      ],
    });

    assert.ok(error?.message);
    assert.equal(
      error?.message.split("\n")[0],
      "ManagedIdentityCredential authentication failed. Status code: 503"
    );
  });

  it("IMDS MSI stops after 3 retries if the ping always gets 500s", async function () {
    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential("errclient"),
      insecureResponses: [
        // Any response on the ping request is fine, since it means that the endpoint is indeed there.
        createResponse(500, {}),
        // After the ping, we try to get a token from the IMDS endpoint.
        createResponse(500, {}),
        createResponse(500, {}),
        createResponse(500, {}),
        createResponse(500, {}),
      ],
    });

    assert.ok(error?.message);
    assert.equal(
      error?.message.split("\n")[0],
      "ManagedIdentityCredential authentication failed. Status code: 500"
    );
  });

  it("IMDS MSI accepts a custom set of retries, even when client Id is passed through the first parameter", async function () {
    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential("errclient", {
        retryOptions: {
          maxRetries: 4,
        },
      }),
      insecureResponses: [
        // Any response on the ping request is fine, since it means that the endpoint is indeed there.
        createResponse(503, {}, { "Retry-After": "2" }),
        // After the ping, we try to get a token from the IMDS endpoint.
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        // This is the extra one
        createResponse(503, {}, { "Retry-After": "2" }),
      ],
    });

    assert.ok(error?.message);
    assert.equal(
      error?.message.split("\n")[0],
      "ManagedIdentityCredential authentication failed. Status code: 503"
    );
  });

  it("IMDS MSI accepts a custom set of retries, even when client Id is not passed through the first parameter", async function () {
    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential({
        retryOptions: {
          maxRetries: 4,
        },
      }),
      insecureResponses: [
        // Any response on the ping request is fine, since it means that the endpoint is indeed there.
        createResponse(503, {}, { "Retry-After": "2" }),
        // After the ping, we try to get a token from the IMDS endpoint.
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        // This is the extra one
        createResponse(503, {}, { "Retry-After": "2" }),
      ],
    });

    assert.ok(error?.message);
    assert.equal(
      error?.message.split("\n")[0],
      "ManagedIdentityCredential authentication failed. Status code: 503"
    );
  });

  it("IMDS MSI skips verification if the AZURE_POD_IDENTITY_AUTHORITY_HOST environment variable is available", async function () {
    process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST = "token URL";

    assert.ok(
      await imdsMsi.isAvailable({
        scopes: "https://endpoint/.default",
      })
    );
  });

  it("IMDS MSI works even if the AZURE_POD_IDENTITY_AUTHORITY_HOST ends with a slash", async function () {
    process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST = "http://10.0.0.1/";

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential({
        resourceId: "resource-id",
      }),
      insecureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: "1506484173",
        }),
      ],
    });

    // The first request is the IMDS ping.
    const imdsPingRequest = authDetails.requests[0];
    assert.equal(
      imdsPingRequest.url,
      "http://10.0.0.1/metadata/identity/oauth2/token?resource=https%3A%2F%2Fservice&api-version=2018-02-01&msi_res_id=resource-id"
    );
  });

  it("IMDS MSI works even if the AZURE_POD_IDENTITY_AUTHORITY_HOST doesn't end with a slash", async function () {
    process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST = "http://10.0.0.1";

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client"),
      insecureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: "1506484173",
        }),
      ],
    });

    // The first request is the IMDS ping.
    const imdsPingRequest = authDetails.requests[0];

    assert.equal(
      imdsPingRequest.url,
      "http://10.0.0.1/metadata/identity/oauth2/token?resource=https%3A%2F%2Fservice&api-version=2018-02-01&client_id=client"
    );
  });

  it("doesn't try IMDS endpoint again once it can't be detected", async function () {
    const credential = new ManagedIdentityCredential("errclient");
    const DEFAULT_CLIENT_MAX_RETRY_COUNT = 3;
    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential,
      insecureResponses: [
        // Satisfying the ping
        createResponse(200),
        // Retries until exhaustion
        ...Array(DEFAULT_CLIENT_MAX_RETRY_COUNT + 1).fill(
          createResponse(503, {}, { "Retry-After": "2" })
        ),
      ],
    });
    assert.equal(authDetails.requests.length, DEFAULT_CLIENT_MAX_RETRY_COUNT + 2);
    assert.ok(authDetails.error!.message.indexOf("authentication failed") > -1);

    await testContext.restore();

    const authDetails2 = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential,
      insecureResponses: [
        // This time, no ping should be triggered
        createResponse(200, { access_token: "token", expires_on: "1506484173" }),
      ],
    });
    assert.isUndefined(authDetails2.error);
    assert.equal(authDetails2.requests.length, 1);
    assert.equal(authDetails2.result?.token, "token");
  });

  it("sends an authorization request correctly in an App Service environment", async () => {
    // Trigger App Service behavior by setting environment variables
    process.env.MSI_ENDPOINT = "https://endpoint";
    process.env.MSI_SECRET = "secret";

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client"),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00",
        }),
      ],
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

  it("sends an authorization request correctly in an App Service 2019 environment by client id", async () => {
    // Trigger App Service behavior by setting environment variables
    process.env.IDENTITY_ENDPOINT = "https://endpoint";
    process.env.IDENTITY_HEADER = "HEADER";

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client"),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: "1624157878",
        }),
      ],
    });

    const authRequest = authDetails.requests[0];
    const query = new URLSearchParams(authRequest.url.split("?")[1]);

    assert.equal(authRequest.method, "GET");
    assert.equal(query.get("client_id"), "client");
    assert.equal(decodeURIComponent(query.get("resource")!), "https://service");
    assert.ok(
      authRequest.url.startsWith(process.env.IDENTITY_ENDPOINT),
      "URL does not start with expected host and path"
    );
    assert.equal(authRequest.headers["X-IDENTITY-HEADER"], process.env.IDENTITY_HEADER);
    assert.ok(
      authRequest.url.indexOf(`api-version=2019-08-01`) > -1,
      "URL does not have expected version"
    );
    if (authDetails.result?.token) {
      assert.equal(authDetails.result.expiresOnTimestamp, 1624157878000);
    } else {
      assert.fail("No token was returned!");
    }
  });

  it("sends an authorization request correctly in an App Service 2019 environment by resource id", async () => {
    // Trigger App Service behavior by setting environment variables
    process.env.IDENTITY_ENDPOINT = "https://endpoint";
    process.env.IDENTITY_HEADER = "HEADER";

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential({ resourceId: "RESOURCE-ID" }),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: "1624157878",
        }),
      ],
    });

    const authRequest = authDetails.requests[0];
    const query = new URLSearchParams(authRequest.url.split("?")[1]);

    assert.equal(authRequest.method, "GET");
    assert.equal(decodeURIComponent(query.get("resource")!), "https://service");
    assert.equal(decodeURIComponent(query.get("mi_res_id")!), "RESOURCE-ID");
    assert.ok(
      authRequest.url.startsWith(process.env.IDENTITY_ENDPOINT),
      "URL does not start with expected host and path"
    );
    assert.equal(authRequest.headers["X-IDENTITY-HEADER"], process.env.IDENTITY_HEADER);
    assert.ok(
      authRequest.url.indexOf(`api-version=2019-08-01`) > -1,
      "URL does not have expected version"
    );
    if (authDetails.result?.token) {
      assert.equal(authDetails.result.expiresOnTimestamp, 1624157878000);
    } else {
      assert.fail("No token was returned!");
    }
  });

  it("sends an authorization request correctly in an Cloud Shell environment", async () => {
    // Trigger Cloud Shell behavior by setting environment variables
    process.env.MSI_ENDPOINT = "https://endpoint";
    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential(),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_in: "4310",
          expires_on: "1663366555",
        }),
      ],
    });
    const authRequest = authDetails.requests[0];
    assert.equal(authRequest.method, "POST");
    assert.equal(authDetails.result!.token, "token");
  });

  it("sends an authorization request correctly in an Cloud Shell environment (with clientId)", async () => {
    // Trigger Cloud Shell behavior by setting environment variables
    process.env.MSI_ENDPOINT = "https://endpoint";
    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential({ clientId: "CLIENT-ID" }),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_in: "4310",
          expires_on: "1663366555",
        }),
      ],
    });
    const authRequest = authDetails.requests[0];
    const body = new URLSearchParams(authRequest.body);
    assert.strictEqual(decodeURIComponent(body.get("client_id")!), "CLIENT-ID");
    assert.equal(authRequest.method, "POST");
    assert.equal(authDetails.result!.token, "token");
  });

  it("sends an authorization request correctly in an Cloud Shell environment (with resourceId)", async () => {
    // Trigger Cloud Shell behavior by setting environment variables
    process.env.MSI_ENDPOINT = "https://endpoint";
    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential({ resourceId: "RESOURCE-ID" }),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_in: "4310",
          expires_on: "1663366555",
        }),
      ],
    });
    const authRequest = authDetails.requests[0];
    const body = new URLSearchParams(authRequest.body);
    assert.strictEqual(decodeURIComponent(body.get("msi_res_id")!), "RESOURCE-ID");
    assert.equal(authRequest.method, "POST");
    assert.equal(authDetails.result!.token, "token");
  });

  it("authorization request fails with client id passed in an Cloud Shell environment", async function (this: Context) {
    // Trigger Cloud Shell behavior by setting environment variables
    process.env.MSI_ENDPOINT = "https://endpoint";
    const msiGetTokenSpy = Sinon.spy(ManagedIdentityCredential.prototype, "getToken");
    const loggerSpy = Sinon.spy(logger, "warning");
    setLogLevel("warning");
    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client"),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_in: "4310",
          expires_on: "1663366555",
        }),
      ],
    });
    assert.equal(authDetails.result!.token, "token");
    assert.equal(msiGetTokenSpy.called, true);
    assert.equal(loggerSpy.calledOnce, true);
    assert.deepEqual(loggerSpy.args[0], [
      "ManagedIdentityCredential - CloudShellMSI: user-assigned identities not supported. The argument clientId might be ignored by the service.",
    ]);
  });

  it("sends an authorization request correctly in an Azure Arc environment", async function (this: Mocha.Context) {
    // Trigger Azure Arc behavior by setting environment variables

    process.env.IMDS_ENDPOINT = "http://endpoint";
    process.env.IDENTITY_ENDPOINT = "http://endpoint";

    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    const testTitle = this.test?.title || `test-Date.time()`;
    const tempDir = mkdtempSync(join(tmpdir(), testTitle));
    const tempFile = join(tempDir, testTitle);
    const key = "challenge key";
    writeFileSync(tempFile, key, { encoding: "utf8" });

    try {
      const authDetails = await testContext.sendCredentialRequests({
        scopes: ["https://service/.default"],
        credential: new ManagedIdentityCredential(),
        insecureResponses: [
          createResponse(
            401,
            {},
            {
              "www-authenticate": `we don't pay much attention about this format=${tempFile}`,
            }
          ),
          createResponse(200, {
            access_token: "token",
            expires_in: 1,
          }),
        ],
      });

      // File request
      const validationRequest = authDetails.requests[0];
      let query = new URLSearchParams(validationRequest.url.split("?")[1]);

      assert.equal(validationRequest.method, "GET");
      assert.equal(decodeURIComponent(query.get("resource")!), "https://service");

      assert.ok(
        validationRequest.url.startsWith(process.env.IDENTITY_ENDPOINT),
        "URL does not start with expected host and path"
      );

      // Authorization request, which comes after getting the file path, for now at least.
      const authRequest = authDetails.requests[1];
      query = new URLSearchParams(authRequest.url.split("?")[1]);

      assert.equal(authRequest.method, "GET");
      assert.equal(decodeURIComponent(query.get("resource")!), "https://service");

      assert.ok(
        authRequest.url.startsWith(process.env.IDENTITY_ENDPOINT),
        "URL does not start with expected host and path"
      );

      assert.equal(authRequest.headers.Authorization, `Basic ${key}`);
      if (authDetails.result!.token) {
        // We use Date.now underneath.
        assert.ok(authDetails.result!.expiresOnTimestamp);
      } else {
        assert.fail("No token was returned!");
      }
    } finally {
      unlinkSync(tempFile);
      rmdirSync(tempDir);
    }
  });

  it("sends an authorization request correctly in an Azure Arc environment (with resourceId)", async function (this: Mocha.Context) {
    // Trigger Azure Arc behavior by setting environment variables

    process.env.IMDS_ENDPOINT = "http://endpoint";
    process.env.IDENTITY_ENDPOINT = "http://endpoint";

    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    const testTitle = this.test?.title || `test-Date.time()`;
    const tempDir = mkdtempSync(join(tmpdir(), testTitle));
    const tempFile = join(tempDir, testTitle);
    const key = "challenge key";
    writeFileSync(tempFile, key, { encoding: "utf8" });

    try {
      const authDetails = await testContext.sendCredentialRequests({
        scopes: ["https://service/.default"],
        credential: new ManagedIdentityCredential({ resourceId: "RESOURCE-ID" }),
        insecureResponses: [
          createResponse(
            401,
            {},
            {
              "www-authenticate": `we don't pay much attention about this format=${tempFile}`,
            }
          ),
          createResponse(200, {
            access_token: "token",
            expires_in: 1,
          }),
        ],
      });

      // File request
      const validationRequest = authDetails.requests[0];
      console.log(validationRequest.url.split("?")[1]);
      let query = new URLSearchParams(validationRequest.url.split("?")[1]);

      assert.equal(validationRequest.method, "GET");
      assert.equal(decodeURIComponent(query.get("resource")!), "https://service");

      assert.ok(
        validationRequest.url.startsWith(process.env.IDENTITY_ENDPOINT),
        "URL does not start with expected host and path"
      );

      // Authorization request, which comes after getting the file path, for now at least.
      const authRequest = authDetails.requests[1];
      console.log(authRequest.url.split("?")[1]);
      query = new URLSearchParams(authRequest.url.split("?")[1]);

      assert.equal(authRequest.method, "GET");
      assert.equal(decodeURIComponent(query.get("resource")!), "https://service");
      assert.equal(decodeURIComponent(query.get("msi_res_id")!), "RESOURCE-ID");

      assert.ok(
        authRequest.url.startsWith(process.env.IDENTITY_ENDPOINT),
        "URL does not start with expected host and path"
      );

      assert.equal(authRequest.headers.Authorization, `Basic ${key}`);
      if (authDetails.result!.token) {
        // We use Date.now underneath.
        assert.ok(authDetails.result!.expiresOnTimestamp);
      } else {
        assert.fail("No token was returned!");
      }
    } finally {
      unlinkSync(tempFile);
      rmdirSync(tempDir);
    }
  });

  it("sends an authorization request correctly in an Azure Arc environment (with clientId)", async function (this: Mocha.Context) {
    // Trigger Azure Arc behavior by setting environment variables

    process.env.IMDS_ENDPOINT = "http://endpoint";
    process.env.IDENTITY_ENDPOINT = "http://endpoint";

    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    const testTitle = this.test?.title || `test-Date.time()`;
    const tempDir = mkdtempSync(join(tmpdir(), testTitle));
    const tempFile = join(tempDir, testTitle);
    const key = "challenge key";
    writeFileSync(tempFile, key, { encoding: "utf8" });

    try {
      const authDetails = await testContext.sendCredentialRequests({
        scopes: ["https://service/.default"],
        credential: new ManagedIdentityCredential({ clientId: "CLIENT-ID" }),
        insecureResponses: [
          createResponse(
            401,
            {},
            {
              "www-authenticate": `we don't pay much attention about this format=${tempFile}`,
            }
          ),
          createResponse(200, {
            access_token: "token",
            expires_in: 1,
          }),
        ],
      });

      // File request
      const validationRequest = authDetails.requests[0];
      console.log(validationRequest.url.split("?")[1]);
      let query = new URLSearchParams(validationRequest.url.split("?")[1]);

      assert.equal(validationRequest.method, "GET");
      assert.equal(decodeURIComponent(query.get("resource")!), "https://service");

      assert.ok(
        validationRequest.url.startsWith(process.env.IDENTITY_ENDPOINT),
        "URL does not start with expected host and path"
      );

      // Authorization request, which comes after getting the file path, for now at least.
      const authRequest = authDetails.requests[1];
      console.log(authRequest.url.split("?")[1]);
      query = new URLSearchParams(authRequest.url.split("?")[1]);

      assert.equal(authRequest.method, "GET");
      assert.equal(decodeURIComponent(query.get("resource")!), "https://service");
      assert.equal(decodeURIComponent(query.get("client_id")!), "CLIENT-ID");

      assert.ok(
        authRequest.url.startsWith(process.env.IDENTITY_ENDPOINT),
        "URL does not start with expected host and path"
      );

      assert.equal(authRequest.headers.Authorization, `Basic ${key}`);
      if (authDetails.result!.token) {
        // We use Date.now underneath.
        assert.ok(authDetails.result!.expiresOnTimestamp);
      } else {
        assert.fail("No token was returned!");
      }
    } finally {
      unlinkSync(tempFile);
      rmdirSync(tempDir);
    }
  });

  it("sends an authorization request correctly in an Azure Fabric environment", async () => {
    // Trigger App Service behavior by setting environment variables
    process.env.IDENTITY_ENDPOINT = "https://endpoint";
    process.env.IDENTITY_HEADER = "secret";

    // We're not verifying the certificate yet, but we still check for it:
    process.env.IDENTITY_SERVER_THUMBPRINT = "certificate-thumbprint";

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client"),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: 1,
        }),
      ],
    });

    // Authorization request, which comes after validating again, for now at least.
    const authRequest = authDetails.requests[0];

    const query = new URLSearchParams(authRequest.url.split("?")[1]);

    assert.equal(authRequest.method, "GET");
    assert.equal(query.get("client_id"), "client");
    assert.equal(decodeURIComponent(query.get("resource")!), "https://service");
    assert.ok(
      authRequest.url.startsWith(process.env.IDENTITY_ENDPOINT),
      "URL does not start with expected host and path"
    );

    assert.equal(authRequest.headers.secret, process.env.IDENTITY_HEADER);

    if (authDetails.result!.token) {
      // We use Date.now underneath.
      assert.equal(authDetails.result!.expiresOnTimestamp, 1000);
    } else {
      assert.fail("No token was returned!");
    }
  });

  it("sends an authorization request correctly in an Azure Fabric environment (resourceId)", async () => {
    // Trigger App Service behavior by setting environment variables
    process.env.IDENTITY_ENDPOINT = "https://endpoint";
    process.env.IDENTITY_HEADER = "secret";

    // We're not verifying the certificate yet, but we still check for it:
    process.env.IDENTITY_SERVER_THUMBPRINT = "certificate-thumbprint";

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential({ resourceId: "RESOURCE-ID" }),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: 1,
        }),
      ],
    });

    // Authorization request, which comes after validating again, for now at least.
    const authRequest = authDetails.requests[0];

    const query = new URLSearchParams(authRequest.url.split("?")[1]);

    assert.equal(authRequest.method, "GET");
    assert.equal(query.get("msi_res_id"), "RESOURCE-ID");
    assert.equal(decodeURIComponent(query.get("resource")!), "https://service");
    assert.ok(
      authRequest.url.startsWith(process.env.IDENTITY_ENDPOINT),
      "URL does not start with expected host and path"
    );

    assert.equal(authRequest.headers.secret, process.env.IDENTITY_HEADER);

    if (authDetails.result!.token) {
      // We use Date.now underneath.
      assert.equal(authDetails.result!.expiresOnTimestamp, 1000);
    } else {
      assert.fail("No token was returned!");
    }
  });

  it("calls to AppTokenProvider for MI token caching support", async () => {
    const credential: any = new ManagedIdentityCredential("client");
    const confidentialSpy = Sinon.spy(credential.confidentialApp, "SetAppTokenProvider");

    // Trigger App Service behavior by setting environment variables
    process.env.MSI_ENDPOINT = "https://endpoint";
    process.env.MSI_SECRET = "secret";

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential,
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00",
        }),
      ],
    });
    assert.equal(confidentialSpy.callCount, 1);

    if (authDetails.result?.token) {
      assert.equal(authDetails.result.expiresOnTimestamp, 1560999478000);
    } else {
      assert.fail("No token was returned!");
    }
  });
});
