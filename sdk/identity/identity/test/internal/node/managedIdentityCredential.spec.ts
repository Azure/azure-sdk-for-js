// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import qs from "qs";
import assert from "assert";
import { ManagedIdentityCredential, AuthenticationError } from "../../../src";
import {
  imdsEndpoint,
  imdsApiVersion
} from "../../../src/credentials/managedIdentityCredential/constants";
import { MockAuthHttpClient, MockAuthHttpClientOptions, assertRejects } from "../../authTestUtils";
import { WebResource, AccessToken, HttpHeaders, RestError } from "@azure/core-http";
import { OAuthErrorResponse } from "../../../src/client/errors";

interface AuthRequestDetails {
  requests: WebResource[];
  token: AccessToken | null;
}

describe("ManagedIdentityCredential", function() {
  afterEach(() => {
    delete process.env.IDENTITY_ENDPOINT;
    delete process.env.IDENTITY_HEADER;
    delete process.env.MSI_ENDPOINT;
    delete process.env.MSI_SECRET;
    delete process.env.IDENTITY_SERVER_THUMBPRINT;
  });

  it("sends an authorization request with a modified resource name", async function() {
    const authDetails = await getMsiTokenAuthRequest(["https://service/.default"], "client", {
      authResponse: [
        { status: 200 }, // Respond to IMDS isAvailable
        {
          status: 200,
          parsedBody: {
            token: "token",
            expires_on: "06/20/2019 02:57:58 +00:00"
          }
        }
      ]
    });

    const authRequest = authDetails.requests[0];

    assert.ok(authRequest.query, "No query string parameters on request");
    if (authRequest.query) {
      assert.equal(authRequest.method, "GET");
      assert.equal(authRequest.query["client_id"], "client");
      assert.equal(decodeURIComponent(authRequest.query["resource"]), "https://service");
      assert.ok(
        authRequest.url.startsWith(imdsEndpoint),
        "URL does not start with expected host and path"
      );
      assert.ok(
        authRequest.url.indexOf(`api-version=${imdsApiVersion}`) > -1,
        "URL does not have expected version"
      );
    }
  });

  it("sends an authorization request with an unmodified resource name", async () => {
    const authDetails = await getMsiTokenAuthRequest("someResource", undefined, {
      authResponse: [
        { status: 200 }, // Respond to IMDS isAvailable
        {
          status: 200,
          parsedBody: {
            token: "token",
            expires_on: "06/20/2019 02:57:58 +00:00"
          }
        }
      ]
    });

    // The first request is the IMDS ping.
    // The second one tries to authenticate against IMDS once we know the endpoint is available.
    const authRequest = authDetails.requests[1];

    assert.ok(authRequest.query, "No query string parameters on request");
    if (authRequest.query) {
      assert.equal(authRequest.query["client_id"], undefined);
      assert.equal(decodeURIComponent(authRequest.query["resource"]), "someResource");
    }
  });

  it("returns error when no MSI is available", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";

    const imdsError: RestError = new RestError("Request Timeout", "REQUEST_SEND_ERROR", 408);
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [{ error: imdsError }]
    });

    const credential = new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID, {
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
      error: "ManagedIdentityCredential authentication failed.",
      error_description: ""
    };

    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [{ status: 200 }, { status: 500, parsedBody: errResponse }]
    });

    const credential = new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID, {
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

    const credential = new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID, {
      ...mockHttpClient.tokenCredentialOptions
    });
    await assertRejects(
      credential.getToken("scopes"),
      (error: AuthenticationError) => error.message.indexOf("Network unreachable.") > -1
    );
  });

  it("returns expected error when the host was unreachable", async function() {
    process.env.AZURE_CLIENT_ID = "errclient";

    const hostError: RestError = new RestError("Request Timeout", "EHOSTUNREACH", 408);
    const mockHttpClient = new MockAuthHttpClient({
      authResponse: [{ status: 200 }, { error: hostError }]
    });

    const credential = new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID, {
      ...mockHttpClient.tokenCredentialOptions
    });
    await assertRejects(
      credential.getToken("scopes"),
      (error: AuthenticationError) =>
        error.message.indexOf("No managed identity endpoint found.") > -1
    );
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

    const authDetails = await getMsiTokenAuthRequest(["https://service/.default"], "client", {
      authResponse: {
        status: 200,
        parsedBody: {
          token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00"
        }
      }
    });

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

  it("sends an authorization request correctly in an Cloud Shell environment", async () => {
    // Trigger Cloud Shell behavior by setting environment variables
    process.env.MSI_ENDPOINT = "https://endpoint";

    const authDetails = await getMsiTokenAuthRequest(["https://service/.default"], "client");
    const authRequest = authDetails.requests[0];

    assert.ok(authRequest.body !== undefined, "No body on request");
    if (authRequest.body) {
      const bodyParams = qs.parse(authRequest.body);
      assert.equal(authRequest.method, "POST");
      assert.equal(bodyParams.client_id, "client");
      assert.equal(decodeURIComponent(bodyParams.resource as string), "https://service");
      assert.ok(
        authRequest.url.startsWith(process.env.MSI_ENDPOINT),
        "URL does not start with expected host and path"
      );
      assert.equal(authRequest.headers.get("secret"), undefined);
    }
  });

  it("sends an authorization request correctly in an Azure Arc environment", async () => {
    // Trigger Azure Arc behavior by setting environment variables

    process.env.IMDS_ENDPOINT = "https://endpoint";
    process.env.IDENTITY_ENDPOINT = "https://endpoint";

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mockFs = require("mock-fs");
    const filePath = "path/to/file";
    const key = "challenge key";

    mockFs({
      [`${filePath}`]: key
    });

    const authDetails = await getMsiTokenAuthRequest(["https://service/.default"], undefined, {
      authResponse: [
        {
          status: 401,
          headers: new HttpHeaders({
            "www-authenticate": `we don't pay much attention about this format=${filePath}`
          })
        },
        {
          status: 200,
          parsedBody: {
            token: "token",
            expires_in: 1
          }
        }
      ]
    });

    // File request
    const validationRequest = authDetails.requests[0];
    assert.ok(validationRequest.query, "No query string parameters on request");

    assert.equal(validationRequest.method, "GET");
    assert.equal(decodeURIComponent(validationRequest.query!["resource"]), "https://service");

    assert.ok(
      validationRequest.url.startsWith(process.env.IDENTITY_ENDPOINT),
      "URL does not start with expected host and path"
    );

    // Authorization request, which comes after getting the file path, for now at least.
    const authRequest = authDetails.requests[1];
    assert.ok(authRequest.query, "No query string parameters on request");

    assert.equal(authRequest.method, "GET");
    assert.equal(decodeURIComponent(authRequest.query!["resource"]), "https://service");

    assert.ok(
      authRequest.url.startsWith(process.env.IDENTITY_ENDPOINT),
      "URL does not start with expected host and path"
    );

    assert.equal(authRequest.headers.get("Authorization"), `Basic ${key}`);
    if (authDetails.token) {
      // We use Date.now underneath.
      assert.equal(
        Math.floor(authDetails.token.expiresOnTimestamp / 1000000),
        Math.floor(Date.now() / 1000000)
      );
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

    const authDetails = await getMsiTokenAuthRequest(["https://service/.default"], "client", {
      authResponse: [
        {
          status: 200,
          parsedBody: {
            token: "token",
            expires_on: 1
          }
        }
      ]
    });

    // Authorization request, which comes after validating again, for now at least.
    const authRequest = authDetails.requests[0];
    assert.ok(authRequest.query, "No query string parameters on request");

    assert.equal(authRequest.method, "GET");
    assert.equal(authRequest.query!["client_id"], "client");
    assert.equal(decodeURIComponent(authRequest.query!["resource"]), "https://service");
    assert.ok(
      authRequest.url.startsWith(process.env.IDENTITY_ENDPOINT),
      "URL does not start with expected host and path"
    );

    assert.equal(authRequest.headers.get("Secret"), process.env.IDENTITY_HEADER);

    if (authDetails.token) {
      // We use Date.now underneath.
      assert.equal(authDetails.token.expiresOnTimestamp, 1);
    } else {
      assert.fail("No token was returned!");
    }
  });

  async function getMsiTokenAuthRequest(
    scopes: string | string[],
    clientId?: string,
    mockAuthOptions?: MockAuthHttpClientOptions,
    timeout?: number
  ): Promise<AuthRequestDetails> {
    const mockHttpClient = new MockAuthHttpClient(mockAuthOptions);
    const credential = clientId
      ? new ManagedIdentityCredential(clientId, { ...mockHttpClient.tokenCredentialOptions })
      : new ManagedIdentityCredential({ ...mockHttpClient.tokenCredentialOptions });

    const token = await credential.getToken(scopes, { requestOptions: { timeout } });
    return {
      token,
      requests: mockHttpClient.requests
    };
  }
});
