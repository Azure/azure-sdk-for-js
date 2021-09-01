// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import qs from "qs";
import assert from "assert";
import { ManagedIdentityCredential, AuthenticationError } from "../../../src";
import { RestError } from "@azure/core-rest-pipeline";
import {
  createResponse,
  IdentityTestContext,
  prepareIdentityTests,
  SendCredentialRequests
} from "../../public/node/nodeAuthTestUtils";
import {
  imdsApiVersion,
  imdsEndpointPath,
  imdsHost
} from "../../../src/credentials/managedIdentityCredential/constants";
import { assertRejects } from "../../authTestUtils";
import { imdsMsi } from "../../../src/credentials/managedIdentityCredential/imdsMsi";

describe("ManagedIdentityCredential", function() {
  let testContext: IdentityTestContext;
  let sendCredentialRequests: SendCredentialRequests;

  beforeEach(async function() {
    testContext = await prepareIdentityTests({});
    sendCredentialRequests = testContext.sendCredentialRequests;
  });
  afterEach(async function() {
    await testContext.restore();
    delete process.env.IDENTITY_ENDPOINT;
    delete process.env.IDENTITY_HEADER;
    delete process.env.MSI_ENDPOINT;
    delete process.env.MSI_SECRET;
    delete process.env.IDENTITY_SERVER_THUMBPRINT;
    delete process.env.IMDS_ENDPOINT;
    delete process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST;
  });

  it("sends an authorization request with a modified resource name", async function() {
    const authDetails = await sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client"),
      insecureResponses: [
        { response: createResponse(200) }, // IMDS Endpoint ping
        {
          response: createResponse(
            200,
            JSON.stringify({
              token: "token",
              expires_on: "06/20/2019 02:57:58 +00:00"
            })
          )
        }
      ]
    });

    // The first request is the IMDS ping.
    const imdsPingRequest = authDetails.insecureRequestOptions[0];
    assert.ok(!imdsPingRequest.headers!.metadata);
    assert.equal(imdsPingRequest.path, imdsEndpointPath);

    // The second one tries to authenticate against IMDS once we know the endpoint is available.
    const authRequest = authDetails.insecureRequestOptions[1];

    assert.ok(authRequest.headers!.metadata);

    const query = qs.parse(authRequest.path!.split("?")[1]);

    assert.equal(authRequest.method, "GET");
    assert.equal(query.client_id, "client");
    assert.equal(decodeURIComponent(query.resource as string), "https://service");
    assert.ok(
      `http://${authRequest.hostname}${authRequest.path}`.startsWith(
        `${imdsHost}${imdsEndpointPath}`
      ),
      "URL does not start with expected host and path"
    );
    assert.ok(
      authRequest.path!.indexOf(`api-version=${imdsApiVersion}`) > -1,
      "URL does not have expected version"
    );
  });

  it("sends an authorization request with an unmodified resource name", async () => {
    const authDetails = await sendCredentialRequests({
      scopes: ["someResource"],
      credential: new ManagedIdentityCredential(),
      insecureResponses: [
        { response: createResponse(200) }, // IMDS Endpoint ping
        {
          response: createResponse(
            200,
            JSON.stringify({
              token: "token",
              expires_on: "06/20/2019 02:57:58 +00:00"
            })
          )
        }
      ]
    });

    // The first request is the IMDS ping.
    // The second one tries to authenticate against IMDS once we know the endpoint is available.
    const authRequest = authDetails.insecureRequestOptions[1];

    const query = qs.parse(authRequest.path!.split("?")[1]);

    assert.equal(query.client_id, undefined);
    assert.equal(decodeURIComponent(query.resource as string), "someResource");
  });

  it("returns error when no MSI is available", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";

    await assertRejects(
      sendCredentialRequests({
        scopes: ["scopes"],
        credential: new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID),
        insecureResponses: [
          {
            error: new RestError("Request Timeout", { code: "REQUEST_SEND_ERROR", statusCode: 408 })
          }
        ]
      }),
      (error: AuthenticationError) => error.message.indexOf("No MSI credential available") > -1
    );
  });

  it("an unexpected error bubbles all the way up", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";
    const errorMessage = "ManagedIdentityCredential authentication failed.";

    await assertRejects(
      sendCredentialRequests({
        scopes: ["scopes"],
        credential: new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID),
        insecureResponses: [
          { response: createResponse(200) }, // IMDS Endpoint ping
          { error: new RestError(errorMessage, { statusCode: 500 }) }
        ]
      }),
      (error: AuthenticationError) => error.message.indexOf(errorMessage) > -1
    );
  });

  it("returns expected error when the network was unreachable", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";

    const netError: RestError = new RestError("Request Timeout", {
      code: "ENETUNREACH",
      statusCode: 408
    });

    await assertRejects(
      sendCredentialRequests({
        scopes: ["scopes"],
        credential: new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID),
        insecureResponses: [
          { response: createResponse(200) }, // IMDS Endpoint ping
          { error: netError }
        ]
      }),
      (error: AuthenticationError) => error.message.indexOf("Network unreachable.") > -1
    );
  });

  it("returns expected error when the host was unreachable", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";

    const hostError: RestError = new RestError("Request Timeout", {
      code: "EHOSTUNREACH",
      statusCode: 408
    });

    await assertRejects(
      sendCredentialRequests({
        scopes: ["scopes"],
        credential: new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID),
        insecureResponses: [
          { response: createResponse(200) }, // IMDS Endpoint ping
          { error: hostError }
        ]
      }),
      (error: AuthenticationError) =>
        error.message.indexOf("No managed identity endpoint found.") > -1
    );
  });

  it("IMDS MSI retries also retries on 503s", async function() {
    const authDetails = await sendCredentialRequests({
      scopes: ["scopes"],
      credential: new ManagedIdentityCredential("errclient"),
      insecureResponses: [
        { response: createResponse(503, "", { "Retry-After": "2" }) },
        { response: createResponse(503, "", { "Retry-After": "2" }) },
        { response: createResponse(503, "", { "Retry-After": "2" }) },
        // The ThrottlingRetryPolicy of core-http will retry up to 3 times, an extra retry would make this fail (meaning a 503 response would be considered the result)
        // { status: 503, headers: createHttpHeaders({ "Retry-After": "2" }) },
        { response: createResponse(200) },
        { response: createResponse(503, "", { "Retry-After": "2" }) },
        { response: createResponse(503, "", { "Retry-After": "2" }) },
        { response: createResponse(503, "", { "Retry-After": "2" }) },
        { response: createResponse(200, JSON.stringify({ access_token: "token" })) }
      ]
    });

    assert.equal(authDetails.result!.token, "token");
  });

  it("IMDS MSI skips verification if the AZURE_POD_IDENTITY_AUTHORITY_HOST environment variable is available", async function() {
    process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST = "token URL";

    assert.ok(await imdsMsi.isAvailable());
  });

  // Unavailable exception throws while IMDS endpoint is unavailable. This test not valid.
  // it("can extend timeout for IMDS endpoint", async function() {
  //   // Mock a timeout so that the endpoint ping fails
  //   const authDetails = await getMsiTokenAuthRequest(
  //     ["https://service/.default"],
  //     "client",
  //     { mockTimeout: true },
  //     5000
  //   ); // Set the timeout higher

  //   assert.strictEqual(authDetails.requests[0].timeout, 5000);
  //   assert.strictEqual(authDetails.token, null);
  // });

  // unavailable exception throws while IMDS endpoint is unavailable. This test not valid.
  // it("doesn't try IMDS endpoint again once it can't be detected", async function() {
  //   const mockHttpClient = new MockAuthHttpClient({ mockTimeout: true });
  //   const credential = new ManagedIdentityCredential("client", {
  //     ...mockHttpClient.tokenCredentialOptions
  //   });

  //   // Run getToken twice and verify that an auth request is only
  //   // attempted the first time.  It should be skipped the second
  //   // time after no IMDS endpoint was found.

  //   const firstGetToken = await credential.getToken("scopes");
  //   const secondGetToken = await credential.getToken("scopes");

  //   assert.strictEqual(firstGetToken, null);
  //   assert.strictEqual(secondGetToken, null);
  //   assert.strictEqual(mockHttpClient.requests.length, 1);
  // });

  it("sends an authorization request correctly in an App Service environment", async () => {
    // Trigger App Service behavior by setting environment variables
    process.env.MSI_ENDPOINT = "https://endpoint";
    process.env.MSI_SECRET = "secret";

    const authDetails = await sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential("client"),
      secureResponses: [
        {
          response: createResponse(
            200,
            JSON.stringify({
              access_token: "token",
              expires_on: "06/20/2019 02:57:58 +00:00"
            })
          )
        }
      ]
    });

    const authRequest = authDetails.secureRequestOptions[0];
    const query = qs.parse(authRequest.path!.split("?")[1]);

    assert.equal(authRequest.method, "GET");
    assert.equal(query.clientid, "client");
    assert.equal(decodeURIComponent(query.resource as string), "https://service");
    assert.equal(
      `https://${authRequest.hostname}`,
      process.env.MSI_ENDPOINT,
      "URL does not start with expected host and path"
    );
    assert.equal(authRequest.headers!.secret, process.env.MSI_SECRET);
    assert.ok(
      authRequest.path!.indexOf(`api-version=2017-09-01`) > -1,
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
      secureResponses: [
        { response: createResponse(200, JSON.stringify({ access_token: "token" })) }
      ]
    });

    const authRequest = authDetails.secureRequestOptions[0];
    assert.equal(authRequest.method, "POST");
    assert.equal(authDetails.result!.token, "token");
  });

  it("sends an authorization request correctly in an Azure Arc environment", async () => {
    // Trigger Azure Arc behavior by setting environment variables

    process.env.IMDS_ENDPOINT = "http://endpoint";
    process.env.IDENTITY_ENDPOINT = "http://endpoint";

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mockFs = require("mock-fs");
    const filePath = "path/to/file";
    const key = "challenge key";

    mockFs({
      [`${filePath}`]: key
    });

    const authDetails = await sendCredentialRequests({
      scopes: ["https://service/.default"],
      credential: new ManagedIdentityCredential(),
      insecureResponses: [
        {
          response: createResponse(401, "", {
            "www-authenticate": `we don't pay much attention about this format=${filePath}`
          })
        },
        {
          response: createResponse(
            200,
            JSON.stringify({
              access_token: "token",
              expires_in: 1
            })
          )
        }
      ]
    });

    // File request
    const validationRequest = authDetails.insecureRequestOptions[0];
    let query = qs.parse(validationRequest.path!.split("?")[1]);

    assert.equal(validationRequest.method, "GET");
    assert.equal(decodeURIComponent(query.resource as string), "https://service");

    assert.ok(
      `http://${validationRequest.hostname}`.startsWith(process.env.IDENTITY_ENDPOINT),
      "URL does not start with expected host and path"
    );

    // Authorization request, which comes after getting the file path, for now at least.
    const authRequest = authDetails.insecureRequestOptions[1];
    query = qs.parse(validationRequest.path!.split("?")[1]);

    assert.equal(authRequest.method, "GET");
    assert.equal(decodeURIComponent(query.resource as string), "https://service");

    assert.ok(
      `http://${validationRequest.hostname}`.startsWith(process.env.IDENTITY_ENDPOINT),
      "URL does not start with expected host and path"
    );

    assert.equal(authRequest.headers!.authorization, `Basic ${key}`);
    if (authDetails.result!.token) {
      // We use Date.now underneath.
      assert.ok(authDetails.result!.expiresOnTimestamp);
    } else {
      assert.fail("No token was returned!");
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
        {
          response: createResponse(
            200,
            JSON.stringify({
              token: "token",
              expires_on: 1
            })
          )
        }
      ]
    });

    // Authorization request, which comes after validating again, for now at least.
    const authRequest = authDetails.secureRequestOptions[0];

    const query = qs.parse(authRequest.path!.split("?")[1]);

    assert.equal(authRequest.method, "GET");
    assert.equal(query.client_id, "client");
    assert.equal(decodeURIComponent(query.resource as string), "https://service");
    assert.ok(
      `https://${authRequest.hostname}`.startsWith(process.env.IDENTITY_ENDPOINT),
      "URL does not start with expected host and path"
    );

    assert.equal(authRequest.headers!.secret, process.env.IDENTITY_HEADER);

    if (authDetails.result!.token) {
      // We use Date.now underneath.
      assert.equal(authDetails.result!.expiresOnTimestamp, 1);
    } else {
      assert.fail("No token was returned!");
    }
  });
});
