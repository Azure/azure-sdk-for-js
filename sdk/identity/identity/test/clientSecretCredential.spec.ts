// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientSecretCredential } from "../src";
import { MockAuthHttpClient, assertClientCredentials } from "./authTestUtils";

describe("ClientSecretCredential", function () {
  it("sends an authorization request with the given credentials", async () => {
    const mockHttpClient = new MockAuthHttpClient();

    const credential = new ClientSecretCredential(
      "tenant",
      "client",
      "secret",
      mockHttpClient.identityClientOptions
    );

    await credential.getToken("scope");

    const authRequest = mockHttpClient.requests[0];
    assertClientCredentials(authRequest, "tenant", "client", "secret");
  });
});
