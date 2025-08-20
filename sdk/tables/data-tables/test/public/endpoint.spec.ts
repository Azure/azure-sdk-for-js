// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TableClient } from "@azure/data-tables";
import { TableServiceClient } from "@azure/data-tables";
import type { TokenCredential } from "@azure/core-auth";
import { COSMOS_SCOPE } from "$internal/utils/constants.js";
import { describe, it, assert } from "vitest";

export class FakeCredential implements TokenCredential {
  public lastScopes?: string | string[];

  getToken(scopes: string | string[]): Promise<null> {
    this.lastScopes = scopes;
    return Promise.resolve(null);
  }
}

describe(`Cosmos endpoint tests`, () => {
  describe("TableServiceClient", () => {
    it("Sets the scope correctly on the auth policy", async () => {
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

  describe("TableClient", () => {
    it("Sets the scope correctly on the auth policy", async () => {
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
