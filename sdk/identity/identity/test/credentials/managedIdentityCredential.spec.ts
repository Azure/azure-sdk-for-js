// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { ManagedIdentityCredential } from "../../src";
import { MockAuthHttpClient } from "./authTestUtils";
import { WebResource } from "@azure/core-http";

describe("ManagedIdentityCredential", function () {
  it("sends an authorization request with a modified resource name", async () => {
    const authRequest = await getMsiTokenAuthRequest(["https://service/.default"], "client");
    assert.ok(authRequest.query, "No query string parameters on request");
    if (authRequest.query) {
      assert.equal(authRequest.query["client_id"], "client");
      assert.equal(decodeURIComponent(authRequest.query["resource"]), "https://service");
    }
  });

  it("sends an authorization request with an unmodified resource name", async () => {
    const authRequest = await getMsiTokenAuthRequest("someResource");
    assert.ok(authRequest.query, "No query string parameters on request");
    if (authRequest.query) {
      assert.equal(authRequest.query["client_id"], undefined);
      assert.equal(decodeURIComponent(authRequest.query["resource"]), "someResource");
    }
  });

  async function getMsiTokenAuthRequest(
    scopes: string | string[],
    clientId?: string
  ): Promise<WebResource> {
    const mockHttpClient = new MockAuthHttpClient();
    const credential = new ManagedIdentityCredential(
      clientId,
      mockHttpClient.identityClientOptions
    );

    await credential.getToken(scopes);
    return mockHttpClient.getAuthRequest();
  }
});
