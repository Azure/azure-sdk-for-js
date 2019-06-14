// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { IdentityClient } from "../../src/client/identityClient";
import { MockAuthHttpClient } from "../credentials/authTestUtils";
import { AuthenticationError } from "../../src/";

describe("IdentityClient", function () {
  it("throws an exception when an authentication request fails", async () => {
    const mockHttp = new MockAuthHttpClient({
      status: 400,
      bodyAsText: `{ "error": "test_error", "error_description": "This is a test error" }`
    });
    const client = new IdentityClient(mockHttp.identityClientOptions);

    await (assert as any).rejects(
      () => client.authenticateClientSecret("tenant", "client", "secret", "https://test/.default"),
      AuthenticationError
    );
  });

  it("returns a usable error when the authentication response body doesn't contain parseable JSON", async () => {
    const client = new IdentityClient({ authorityHost: "bogus" });
    await (assert as any).rejects(
      () => client.authenticateClientSecret("tenant", "client", "secret", "https://test/.default"),
      (err: AuthenticationError) => err.errorResponse.error === "authority_not_found"
    );
  });
});
