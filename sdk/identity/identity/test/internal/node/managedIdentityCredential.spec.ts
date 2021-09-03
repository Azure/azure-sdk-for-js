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
  imdsApiVersion
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

describe("ManagedIdentityCredential", function() {
  let envCopy: string = "";
  let testContext: IdentityTestContext;
  let sendCredentialRequests: SendCredentialRequests;

  beforeEach(async function() {
    envCopy = JSON.stringify(process.env);
    delete process.env.IDENTITY_ENDPOINT;
    delete process.env.IDENTITY_HEADER;
    delete process.env.MSI_ENDPOINT;
    delete process.env.MSI_SECRET;
    delete process.env.IDENTITY_SERVER_THUMBPRINT;
    delete process.env.IMDS_ENDPOINT;
    delete process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST;
    testContext = await prepareIdentityTests({});
    sendCredentialRequests = testContext.sendCredentialRequests;
  });

  afterEach(async function() {
    const env = JSON.parse(envCopy);
    process.env.IDENTITY_ENDPOINT = env.IDENTITY_ENDPOINT;
    process.env.IDENTITY_HEADER = env.IDENTITY_HEADER;
    process.env.MSI_ENDPOINT = env.MSI_ENDPOINT;
    process.env.MSI_SECRET = env.MSI_SECRET;
    process.env.IDENTITY_SERVER_THUMBPRINT = env.IDENTITY_SERVER_THUMBPRINT;
    process.env.IMDS_ENDPOINT = env.IMDS_ENDPOINT;
    process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST = env.AZURE_POD_IDENTITY_AUTHORITY_HOST;
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

    assert.ok(await imdsMsi.isAvailable());
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

  it("sends an authorization request correctly in an Azure Arc environment", async function() {
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

      assert.equal(authRequest.headers.authorization, `Basic ${key}`);
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

  // "fabricMsi" isn't part of the ManagedIdentityCredential MSIs yet
  // because our HTTPs pipeline doesn't allow skipping the SSL verification step,
  // which is necessary since Service Fabric only provides self-signed certificates on their Identity Endpoint.
  it.skip("sends an authorization request correctly in an Azure Fabric environment", async () => {
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
          token: "token",
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
});
