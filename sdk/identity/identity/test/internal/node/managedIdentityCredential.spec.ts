// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { join } from "path";
import { tmpdir } from "os";
import { mkdtempSync, rmdirSync, unlinkSync, writeFileSync } from "fs";
import { RestError } from "@azure/core-rest-pipeline";
import { ManagedIdentityCredential } from "../../../src";
import {
  imdsHost,
  imdsApiVersion,
  imdsEndpointPath
} from "../../../src/credentials/managedIdentityCredential/constants";
import {
  imdsMsi,
  imdsMsiRetryConfig
} from "../../../src/credentials/managedIdentityCredential/imdsMsi";
import {
  createResponse,
  IdentityTestContext,
  SendCredentialRequests
} from "../../httpRequestsCommon";
import { prepareIdentityTests } from "../../httpRequests";
import { AzureAuthorityHosts, DefaultAuthorityHost, DefaultTenantId } from "../../../src/constants";

describe("ManagedIdentityCredential", function() {
  let testContext: IdentityTestContext;
  let sendCredentialRequests: SendCredentialRequests;
  let envCopy: string = "";

  beforeEach(async function() {
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
    testContext = await prepareIdentityTests({});
    sendCredentialRequests = testContext.sendCredentialRequests;
  });

  afterEach(async function() {
    const env = JSON.parse(envCopy);
    // Useful for record mode.
    process.env.AZURE_CLIENT_ID = env.AZURE_CLIENT_ID;
    process.env.AZURE_TENANT_ID = env.AZURE_TENANT_ID;
    process.env.AZURE_CLIENT_SECRET = env.AZURE_CLIENT_SECRET;
    await testContext.restore();
  });

  it("sends an authorization request with a modified resource name", async function() {
    const authDetails = await sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client"),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00"
        })
      ]
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
    const authDetails = await sendCredentialRequests({
      scopes: ["someResource"],
      credential: new ManagedIdentityCredential(),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        createResponse(200, {
          token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00"
        })
      ]
    });

    // The first request is the IMDS ping.
    // The second one tries to authenticate against IMDS once we know the endpoint is available.
    const authRequest = authDetails.requests[1];

    const query = new URLSearchParams(authRequest.url.split("?")[1]);

    assert.equal(query.get("client_id"), undefined);
    assert.equal(decodeURIComponent(query.get("resource")!), "someResource");
  });

  it("returns error when no MSI is available", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";

    const { error } = await sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID),
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
      credential: new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID),
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
      credential: new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        { error: netError }
      ]
    });
    assert.ok(error!.message!.indexOf("Network unreachable.") > -1);
  });

  it("returns expected error when the host was unreachable", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";

    const hostError: RestError = new RestError("Request Timeout", {
      code: "EHOSTUNREACH",
      statusCode: 408
    });

    const { error } = await sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        { error: hostError }
      ]
    });
    assert.ok(error!.message!.indexOf("No managed identity endpoint found.") > -1);
  });

  it("IMDS MSI retries and succeeds on 404", async function() {
    const { result } = await sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential("errclient"),
      insecureResponses: [
        createResponse(200),
        createResponse(404),
        createResponse(404),
        createResponse(200, {
          access_token: "token"
        })
      ]
    });

    assert.equal(result?.token, "token");
  });

  it("IMDS MSI retries up to a limit on 404", async function() {
    const { error } = await sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential("errclient"),
      insecureResponses: [
        createResponse(200),
        createResponse(404),
        createResponse(404),
        createResponse(404),
        createResponse(404)
      ]
    });

    assert.ok(
      error!.message!.indexOf(
        `Failed to retrieve IMDS token after ${imdsMsiRetryConfig.maxRetries} retries.`
      ) > -1
    );
  });

  it("IMDS MSI retries also retries on 503s", async function() {
    const { result } = await sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential("errclient"),
      insecureResponses: [
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        // The ThrottlingRetryPolicy of core-http will retry up to 3 times, an extra retry would make this fail (meaning a 503 response would be considered the result)
        // createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(200),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(200, { access_token: "token" })
      ]
    });

    assert.equal(result?.token, "token");
  });

  it("IMDS MSI skips verification if the AZURE_POD_IDENTITY_AUTHORITY_HOST environment variable is available", async function() {
    process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST = "token URL";

    assert.ok(await imdsMsi.isAvailable("https://endpoint/.default"));
  });

  it("IMDS MSI works even if the AZURE_POD_IDENTITY_AUTHORITY_HOST ends with a slash", async function() {
    process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST = "http://10.0.0.1/";

    const authDetails = await sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client"),
      insecureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00"
        })
      ]
    });

    // The first request is the IMDS ping.
    const imdsPingRequest = authDetails.requests[0];
    assert.equal(
      imdsPingRequest.url,
      "http://10.0.0.1/metadata/identity/oauth2/token?resource=https%3A%2F%2Fservice&api-version=2018-02-01&client_id=client"
    );
  });

  it("IMDS MSI works even if the AZURE_POD_IDENTITY_AUTHORITY_HOST doesn't end with a slash", async function() {
    process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST = "http://10.0.0.1";

    const authDetails = await sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client"),
      insecureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00"
        })
      ]
    });

    // The first request is the IMDS ping.
    const imdsPingRequest = authDetails.requests[0];

    assert.equal(
      imdsPingRequest.url,
      "http://10.0.0.1/metadata/identity/oauth2/token?resource=https%3A%2F%2Fservice&api-version=2018-02-01&client_id=client"
    );
  });

  it("doesn't try IMDS endpoint again once it can't be detected", async function() {
    const credential = new ManagedIdentityCredential("errclient");
    const authDetails = await sendCredentialRequests({
      scopes: ["scopes"],
      credential,
      insecureResponses: [
        // Satisfying the ping
        createResponse(200),
        // Retries until exhaustion
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" }),
        createResponse(503, {}, { "Retry-After": "2" })
      ]
    });
    assert.equal(authDetails.requests.length, 5);
    assert.ok(authDetails.error!.message.indexOf("authentication failed") > -1);

    await testContext.restore();

    const authDetails2 = await sendCredentialRequests({
      scopes: ["scopes"],
      credential,
      insecureResponses: [
        // This time, no ping should be triggered
        createResponse(200, { access_token: "token" })
      ]
    });
    assert.equal(authDetails2.requests.length, 1);
    assert.equal(authDetails2.result?.token, "token");
  });

  it("sends an authorization request correctly in an App Service environment", async () => {
    // Trigger App Service behavior by setting environment variables
    process.env.MSI_ENDPOINT = "https://endpoint";
    process.env.MSI_SECRET = "secret";

    const authDetails = await sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client"),
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

  it("sends an authorization request correctly in an Cloud Shell environment", async () => {
    // Trigger Cloud Shell behavior by setting environment variables
    process.env.MSI_ENDPOINT = "https://endpoint";

    const authDetails = await sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client"),
      secureResponses: [createResponse(200, { access_token: "token" })]
    });

    const authRequest = authDetails.requests[0];
    assert.equal(authRequest.method, "POST");
    assert.equal(authDetails.result!.token, "token");
  });

  it("sends an authorization request correctly in an Azure Arc environment", async function(this: Mocha.Context) {
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
      const authDetails = await sendCredentialRequests({
        scopes: ["https://service/.default"],
        credential: new ManagedIdentityCredential(),
        insecureResponses: [
          createResponse(
            401,
            {},
            {
              "www-authenticate": `we don't pay much attention about this format=${tempFile}`
            }
          ),
          createResponse(200, {
            access_token: "token",
            expires_in: 1
          })
        ]
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

  it("sends an authorization request correctly in an Azure Fabric environment", async () => {
    // Trigger App Service behavior by setting environment variables
    process.env.IDENTITY_ENDPOINT = "https://endpoint";
    process.env.IDENTITY_HEADER = "secret";

    // We're not verifying the certificate yet, but we still check for it:
    process.env.IDENTITY_SERVER_THUMBPRINT = "certificate-thumbprint";

    const authDetails = await sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client"),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: 1
        })
      ]
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
      assert.equal(authDetails.result!.expiresOnTimestamp, 1);
    } else {
      assert.fail("No token was returned!");
    }
  });

  describe("File Exchange MSI", () => {
    it("sends an authorization request correctly if token file path is available", async function(this: Mocha.Context) {
      // Keep in mind that in this test we're also testing:
      // - Parametrized client ID.
      // - Non-default AZURE_TENANT_ID.
      // - Non-default AZURE_AUTHORITY_HOST.
      // - Support for single scopes.

      const testTitle = this.test?.title || Date.now().toString();
      const tempDir = mkdtempSync(join(tmpdir(), testTitle));
      const tempFile = join(tempDir, testTitle);
      const expectedAssertion = "{}";
      writeFileSync(tempFile, expectedAssertion, { encoding: "utf8" });

      // Trigger token file path by setting environment variables
      process.env.AZURE_TENANT_ID = "my-tenant-id";
      process.env.AZURE_FEDERATED_TOKEN_FILE = tempFile;
      process.env.AZURE_AUTHORITY_HOST = AzureAuthorityHosts.AzureGovernment;

      const parameterClientId = "client";

      const authDetails = await sendCredentialRequests({
        scopes: ["https://service/.default"],
        credential: new ManagedIdentityCredential(parameterClientId),
        secureResponses: [
          createResponse(200, {
            access_token: "token",
            expires_in: 1
          })
        ]
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

    it("reads from the token file again only after 5 minutes have passed", async function(this: Mocha.Context) {
      // Keep in mind that in this test we're also testing:
      // - Client ID on environment variable.
      // - Default AZURE_TENANT_ID.
      // - Default AZURE_AUTHORITY_HOST.
      // - Support for multiple scopes.

      const testTitle = this.test?.title || Date.now().toString();
      const tempDir = mkdtempSync(join(tmpdir(), testTitle));
      const tempFile = join(tempDir, testTitle);
      const expectedAssertion = "{}";
      writeFileSync(tempFile, expectedAssertion, { encoding: "utf8" });

      // Trigger token file path by setting environment variables
      process.env.AZURE_CLIENT_ID = "client-id";
      process.env.AZURE_TENANT_ID = DefaultTenantId;
      process.env.AZURE_FEDERATED_TOKEN_FILE = tempFile;

      const credential = new ManagedIdentityCredential();

      let authDetails = await sendCredentialRequests({
        scopes: ["https://service/.default", "https://service2/.default"],
        credential,
        secureResponses: [
          createResponse(200, {
            access_token: "token",
            expires_on: 1
          })
        ]
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
      writeFileSync(tempFile, newExpectedAssertion, { encoding: "utf8" });

      // A new credential means we read the file again
      testContext.sandbox.restore();
      authDetails = await sendCredentialRequests({
        scopes: ["https://service/.default", "https://service2/.default"],
        credential: new ManagedIdentityCredential("client"),
        secureResponses: [
          createResponse(200, {
            access_token: "token",
            expires_on: 1
          })
        ]
      });
      authRequest = authDetails.requests[0];
      body = new URLSearchParams(authRequest.body);
      assert.strictEqual(decodeURIComponent(body.get("client_assertion")!), newExpectedAssertion);

      // If we stick to the original credential...

      // Less than 5 minutes means we don't read the file again.
      testContext.sandbox.restore();
      testContext.sandbox.useFakeTimers();
      authDetails = await sendCredentialRequests({
        scopes: ["https://service/.default", "https://service2/.default"],
        credential,
        secureResponses: [
          createResponse(200, {
            access_token: "token",
            expires_on: 1
          })
        ]
      });
      authRequest = authDetails.requests[0];
      body = new URLSearchParams(authRequest.body);
      assert.strictEqual(decodeURIComponent(body.get("client_assertion")!), expectedAssertion);

      // More than 5 minutes means we read the file again.
      testContext.sandbox.restore();
      testContext.sandbox.useFakeTimers();
      testContext.sandbox.clock.tick(1000 * 60 * 5);
      authDetails = await sendCredentialRequests({
        scopes: ["https://service/.default", "https://service2/.default"],
        credential,
        secureResponses: [
          createResponse(200, {
            access_token: "token",
            expires_on: 1
          })
        ]
      });
      authRequest = authDetails.requests[0];
      body = new URLSearchParams(authRequest.body);
      assert.strictEqual(decodeURIComponent(body.get("client_assertion")!), newExpectedAssertion);
    });

    it("the provided client ID overrides the AZURE_CLIENT_ID environment variable", async function(this: Mocha.Context) {
      const testTitle = this.test?.title || Date.now().toString();
      const tempDir = mkdtempSync(join(tmpdir(), testTitle));
      const tempFile = join(tempDir, testTitle);
      const expectedAssertion = "{}";
      writeFileSync(tempFile, expectedAssertion, { encoding: "utf8" });

      // Trigger token file path by setting environment variables
      process.env.AZURE_TENANT_ID = DefaultTenantId;
      process.env.AZURE_FEDERATED_TOKEN_FILE = tempFile;
      process.env.AZURE_CLIENT_ID = "client-id";

      const parameterClientId = "client";

      const authDetails = await sendCredentialRequests({
        scopes: ["https://service/.default"],
        credential: new ManagedIdentityCredential(parameterClientId),
        secureResponses: [
          createResponse(200, {
            access_token: "token",
            expires_on: 1
          })
        ]
      });

      const authRequest = authDetails.requests[0];

      const body = new URLSearchParams(authRequest.body);

      assert.strictEqual(
        authRequest.url,
        `${DefaultAuthorityHost}/${DefaultTenantId}/oauth2/v2.0/token`
      );
      assert.strictEqual(authRequest.method, "POST");
      assert.strictEqual(decodeURIComponent(body.get("client_id")!), parameterClientId);
    });
  });
});
