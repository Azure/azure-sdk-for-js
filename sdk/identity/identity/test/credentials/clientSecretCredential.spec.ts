// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ClientSecretCredential } from "../../src";
import { MockAuthHttpClient, assertClientCredentials } from "./authTestUtils";

describe("ClientSecretCredential", function() {
  it("sends an authorization request with the given credentials", async () => {
    const mockHttpClient = new MockAuthHttpClient();

    const credential = new ClientSecretCredential(
      "tenant",
      "client",
      "secret",
      mockHttpClient.identityClientOptions
    );

    await credential.getToken("scope");

    const authRequest = await mockHttpClient.getAuthRequest();
    assertClientCredentials(authRequest, "tenant", "client", "secret");
  });
});
