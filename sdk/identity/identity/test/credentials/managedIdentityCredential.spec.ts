// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import qs from "qs";
import assert from "assert";
import { ManagedIdentityCredential } from "../../src";
import { ImdsEndpoint, ImdsApiVersion, AppServiceMsiApiVersion } from "../../src/client/identityClient";
import { MockAuthHttpClient, MockAuthResponse } from "./authTestUtils";
import { WebResource, AccessToken } from "@azure/core-http";

interface AuthRequestDetails {
  request: WebResource,
  token: AccessToken | null
};

describe("ManagedIdentityCredential", function () {
  afterEach(() => {
    delete process.env.MSI_ENDPOINT
    delete process.env.MSI_SECRET
  });

  it("sends an authorization request with a modified resource name", async () => {
    const authDetails = await getMsiTokenAuthRequest(["https://service/.default"], "client");
    const authRequest = authDetails.request;

    assert.ok(authRequest.query, "No query string parameters on request");
    if (authRequest.query) {
      assert.equal(authRequest.method, "GET");
      assert.equal(authRequest.query["client_id"], "client");
      assert.equal(decodeURIComponent(authRequest.query["resource"]), "https://service");
      assert.ok(authRequest.url.startsWith(ImdsEndpoint), "URL does not start with expected host and path");
      assert.ok(authRequest.url.indexOf(`api-version=${ImdsApiVersion}`) > -1, "URL does not have expected version");
    }
  });

  it("sends an authorization request with an unmodified resource name", async () => {
    const authDetails = await getMsiTokenAuthRequest("someResource");
    const authRequest = authDetails.request;

    assert.ok(authRequest.query, "No query string parameters on request");
    if (authRequest.query) {
      assert.equal(authRequest.query["client_id"], undefined);
      assert.equal(decodeURIComponent(authRequest.query["resource"]), "someResource");
    }
  });

  it("sends an authorization request correctly in an App Service environment", async () => {
    // Trigger App Service behavior by setting environment variables
    process.env.MSI_ENDPOINT = "https://endpoint";
    process.env.MSI_SECRET = "secret";

    const authDetails = await getMsiTokenAuthRequest(["https://service/.default"], "client", {
      status: 200,
      parsedBody: {
        token: "token",
        expires_on: "06/20/2019 02:57:58 +00:00"
      }
    });
    const authRequest = authDetails.request;

    assert.ok(authRequest.query, "No query string parameters on request");
    if (authRequest.query) {
      assert.equal(authRequest.method, "GET");
      assert.equal(authRequest.query["client_id"], "client");
      assert.equal(decodeURIComponent(authRequest.query["resource"]), "https://service");
      assert.ok(authRequest.url.startsWith(process.env.MSI_ENDPOINT), "URL does not start with expected host and path");
      assert.equal(authRequest.headers.get("secret"), process.env.MSI_SECRET);
      assert.ok(authRequest.url.indexOf(`api-version=${AppServiceMsiApiVersion}`) > -1, "URL does not have expected version");
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
    const authRequest = authDetails.request;

    assert.ok(authRequest.body !== undefined, "No body on request");
    if (authRequest.body) {
      const bodyParams = qs.parse(authRequest.body);
      assert.equal(authRequest.method, "POST");
      assert.equal(bodyParams.client_id, "client");
      assert.equal(decodeURIComponent(bodyParams.resource), "https://service");
      assert.ok(authRequest.url.startsWith(process.env.MSI_ENDPOINT), "URL does not start with expected host and path");
      assert.equal(authRequest.headers.get("secret"), undefined);
    }
  });

  async function getMsiTokenAuthRequest(
    scopes: string | string[],
    clientId?: string,
    mockAuthResponse?: MockAuthResponse
  ): Promise<AuthRequestDetails> {
    const mockHttpClient = new MockAuthHttpClient(mockAuthResponse);
    const credential = new ManagedIdentityCredential(
      clientId,
      mockHttpClient.identityClientOptions
    );

    const token = await credential.getToken(scopes);
    return {
      request: await mockHttpClient.getAuthRequest(),
      token
    };
  }
});
