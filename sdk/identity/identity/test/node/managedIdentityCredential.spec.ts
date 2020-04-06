// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import qs from "qs";
import assert from "assert";
import { ManagedIdentityCredential } from "../../src";
import {
  ImdsEndpoint,
  ImdsApiVersion,
  AppServiceMsiApiVersion
} from "../../src/credentials/managedIdentityCredential";
import { MockAuthHttpClient, MockAuthHttpClientOptions } from "../authTestUtils";
import { WebResource, AccessToken } from "@azure/core-http";

interface AuthRequestDetails {
  requests: WebResource[];
  token: AccessToken | null;
}

describe("ManagedIdentityCredential", function() {
  afterEach(() => {
    delete process.env.MSI_ENDPOINT;
    delete process.env.MSI_SECRET;
  });

  it("sends an authorization request with a modified resource name", async function() {
    const authDetails = await getMsiTokenAuthRequest(["https://service/.default"], "client", {
      authResponse: [
        { status: 200 }, // Respond to IMDS ping
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
        authRequest.url.startsWith(ImdsEndpoint),
        "URL does not start with expected host and path"
      );
      assert.ok(
        authRequest.url.indexOf(`api-version=${ImdsApiVersion}`) > -1,
        "URL does not have expected version"
      );
    }
  });

  it("sends an authorization request with an unmodified resource name", async () => {
    const authDetails = await getMsiTokenAuthRequest("someResource", undefined, {
      authResponse: [
        { status: 200 }, // Respond to IMDS ping
        {
          status: 200,
          parsedBody: {
            token: "token",
            expires_on: "06/20/2019 02:57:58 +00:00"
          }
        }
      ]
    });

    const authRequest = authDetails.requests[1];
    assert.ok(authRequest.query, "No query string parameters on request");
    if (authRequest.query) {
      assert.equal(authRequest.query["client_id"], undefined);
      assert.equal(decodeURIComponent(authRequest.query["resource"]), "someResource");
    }
  });

  it("returns null when IMDS endpoint can't be detected", async function() {
    // Mock a timeout so that the endpoint ping fails
    const authDetails = await getMsiTokenAuthRequest(["https://service/.default"], "client", {
      mockTimeout: true
    });

    assert.strictEqual(authDetails.requests[0].timeout, 500);
    assert.strictEqual(authDetails.token, null);
  });

  it("can extend timeout for IMDS endpoint", async function() {
    // Mock a timeout so that the endpoint ping fails
    const authDetails = await getMsiTokenAuthRequest(
      ["https://service/.default"],
      "client",
      { mockTimeout: true },
      5000
    ); // Set the timeout higher

    assert.strictEqual(authDetails.requests[0].timeout, 5000);
    assert.strictEqual(authDetails.token, null);
  });

  it("doesn't try IMDS endpoint again once it can't be detected", async function() {
    const mockHttpClient = new MockAuthHttpClient({ mockTimeout: true });
    const credential = new ManagedIdentityCredential("client", {
      ...mockHttpClient.tokenCredentialOptions
    });

    // Run getToken twice and verify that an auth request is only
    // attempted the first time.  It should be skipped the second
    // time after no IMDS endpoint was found.
    const firstGetToken = await credential.getToken("scopes");
    const secondGetToken = await credential.getToken("scopes");

    assert.strictEqual(firstGetToken, null);
    assert.strictEqual(secondGetToken, null);
    assert.strictEqual(mockHttpClient.requests.length, 1);
  });

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
        authRequest.url.indexOf(`api-version=${AppServiceMsiApiVersion}`) > -1,
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
      assert.equal(decodeURIComponent(bodyParams.resource), "https://service");
      assert.ok(
        authRequest.url.startsWith(process.env.MSI_ENDPOINT),
        "URL does not start with expected host and path"
      );
      assert.equal(authRequest.headers.get("secret"), undefined);
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
