// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { UsernamePasswordCredential } from "../src";
import { MockAuthHttpClient } from "./authTestUtils";

describe("UsernamePasswordCredential", function() {
  it("sends an authorization request with the given username and password", async () => {
    const mockHttpClient = new MockAuthHttpClient();

    const credential = new UsernamePasswordCredential(
      "tenant",
      "client",
      "user@domain.com",
      "p4s$w0rd",
      mockHttpClient.tokenCredentialOptions
    );

    await credential.getToken("scope");

    const authRequest = await mockHttpClient.requests[0];
    if (!authRequest) {
      assert.fail("No authentication request was intercepted");
    } else {
      assert.strictEqual(
        authRequest.url.startsWith(`https://authority/tenant`),
        true,
        "Request body doesn't contain expected tenantId"
      );
      assert.strictEqual(
        authRequest.body.indexOf(`client_id=client`) > -1,
        true,
        "Request body doesn't contain expected clientId"
      );
      assert.strictEqual(
        authRequest.body.indexOf(`username=user%40domain.com`) > -1,
        true,
        "Request body doesn't contain expected username"
      );
      assert.strictEqual(
        authRequest.body.indexOf(`password=p4s%24w0rd`) > -1,
        true,
        "Request body doesn't contain expected username"
      );
    }
  });
});
