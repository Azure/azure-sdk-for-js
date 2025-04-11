// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TableClient } from "../../src/TableClient.js";
import { TableServiceClient } from "../../src/TableServiceClient.js";
import type { TokenCredential } from "@azure/core-auth";
import { COSMOS_SCOPE, STORAGE_SCOPE } from "../../src/utils/constants.js";
import { describe, it, assert } from "vitest";

export class FakeCredential implements TokenCredential {
  public lastScopes?: string | string[];

  getToken(scopes: string | string[]): Promise<null> {
    this.lastScopes = scopes;
    return Promise.resolve(null);
  }
}

describe(`Endpoint tests`, () => {
  describe("TableServiceClient", () => {
    it("Sets the scope correctly for Cosmos endpoints", async () => {
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

    it("Sets the scope correctly for Storage endpoints", async () => {
      const credential = new FakeCredential();
      // Storage account URL pattern
      const fakeStorageEndpointUrl = "https://myaccount.table.core.windows.net/";
      const client = new TableServiceClient(fakeStorageEndpointUrl, credential);
      try {
        await client.createTable("Test");
      } catch {
        // this will throw because the fake credential doesn't return a valid token,
        // but we'll still invoke it with the right scope first.
      }
      assert.deepEqual(credential.lastScopes, [STORAGE_SCOPE]);
    });

    it("Uses the custom audience option when provided", async () => {
      const credential = new FakeCredential();
      const fakeEndpointUrl = "https://localhost/";
      const customAudience = "https://custom.audience/.default";
      const client = new TableServiceClient(fakeEndpointUrl, credential, {
        audience: customAudience,
      });
      try {
        await client.createTable("Test");
      } catch {
        // this will throw because the fake credential doesn't return a valid token,
        // but we'll still invoke it with the right audience first.
      }
      assert.deepEqual(credential.lastScopes, [customAudience]);
    });
  });

  describe("TableClient", () => {
    it("Sets the scope correctly for Cosmos endpoints", async () => {
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

    it("Sets the scope correctly for Storage endpoints", async () => {
      const credential = new FakeCredential();
      // Storage account URL pattern
      const fakeStorageEndpointUrl = "https://myaccount.table.core.windows.net/";
      const client = new TableClient(fakeStorageEndpointUrl, "Test", credential);
      try {
        await client.createTable();
      } catch {
        // this will throw because the fake credential doesn't return a valid token,
        // but we'll still invoke it with the right scope first.
      }
      assert.deepEqual(credential.lastScopes, [STORAGE_SCOPE]);
    });

    it("Uses the custom audience option when provided", async () => {
      const credential = new FakeCredential();
      const fakeEndpointUrl = "https://localhost/";
      const customAudience = "https://custom.audience/.default";
      const client = new TableClient(fakeEndpointUrl, "Test", credential, {
        audience: customAudience,
      });
      try {
        await client.createTable();
      } catch {
        // this will throw because the fake credential doesn't return a valid token,
        // but we'll still invoke it with the right audience first.
      }
      assert.deepEqual(credential.lastScopes, [customAudience]);
    });
  });
});
