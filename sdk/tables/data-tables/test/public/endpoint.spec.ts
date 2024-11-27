// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TableClient } from "../../src/TableClient";
import { TableServiceClient } from "../../src/TableServiceClient";
import { assert } from "chai";
import type { TokenCredential } from "@azure/core-auth";
import { COSMOS_SCOPE } from "../../src/utils/constants";

export class FakeCredential implements TokenCredential {
  public lastScopes?: string | string[];

  getToken(scopes: string | string[]): Promise<null> {
    this.lastScopes = scopes;
    return Promise.resolve(null);
  }
}

describe(`Cosmos endpoint tests`, function () {
  describe("TableServiceClient", function () {
    it("Sets the scope correctly on the auth policy", async function () {
      const credential = new FakeCredential();
      const fakeEndpointUrl = "https://localhost/";
      const client = new TableServiceClient(fakeEndpointUrl, credential);
      try {
        await client.createTable("Test");
      } catch {
        // this will throw because the fake credential doesn't return a valid token,
        // but we'll still invoke it with the right scope first.
      }
      assert.deepEqual(credential.lastScopes, [COSMOS_SCOPE]);
    });
  });

  describe("TableClient", function () {
    it("Sets the scope correctly on the auth policy", async function () {
      const credential = new FakeCredential();
      const fakeEndpointUrl = "https://localhost/";
      const client = new TableClient(fakeEndpointUrl, "Test", credential);
      try {
        await client.createTable();
      } catch {
        // this will throw because the fake credential doesn't return a valid token,
        // but we'll still invoke it with the right scope first.
      }
      assert.deepEqual(credential.lastScopes, [COSMOS_SCOPE]);
    });
  });
});
