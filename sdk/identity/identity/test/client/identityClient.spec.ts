// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { assertRejects } from "../credentials/authTestUtils";
import { IdentityClient } from "../../src/client/identityClient";
import { MockAuthHttpClient } from "../credentials/authTestUtils";
import { AuthenticationError } from "../../src/";

function isExpectedError(expectedErrorName: string): (error: any) => boolean {
  return (error: any) => {
    if (!(error instanceof AuthenticationError)) {
      assert.ifError(error)
    }
    return error.errorResponse.error === expectedErrorName
  }
}

describe("IdentityClient", function () {
  it("throws an exception when an authentication request fails", async () => {
    const mockHttp = new MockAuthHttpClient({
      status: 400,
      bodyAsText: `{ "error": "test_error", "error_description": "This is a test error" }`
    });
    const client = new IdentityClient(mockHttp.identityClientOptions);

    await assertRejects(
      client.authenticateClientSecret("tenant", "client", "secret", "https://test/.default"),
      error => {
        assert.strictEqual(error.name, 'AuthenticationError')
        return true;
      }
    );
  });

  it("returns a usable error when the authentication response doesn't contain a body", async () => {
    const mockHttp = new MockAuthHttpClient({ status: 500, bodyAsText: '' });
    const client = new IdentityClient(mockHttp.identityClientOptions);
    await assertRejects(
      client.authenticateClientSecret("tenant", "client", "secret", "https://test/.default"),
      isExpectedError("unknown_error")
    );
  });
});
