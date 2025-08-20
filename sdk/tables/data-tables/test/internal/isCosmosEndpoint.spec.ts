// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { isCosmosEndpoint } from "$internal/utils/isCosmosEndpoint.js";

describe("isCosmosEndpoint", () => {
  it("returns true for cosmosdb.* host", () => {
    const result = isCosmosEndpoint("https://abc.table.cosmosdb.azure.com");
    assert.isTrue(result);
  });

  it("returns true for cosmos.* host", () => {
    const result = isCosmosEndpoint("https://abc.table.cosmos.azure.com");
    assert.isTrue(result);
  });

  it("returns true for localhost", () => {
    const result = isCosmosEndpoint("https://localhost:8092");
    assert.isTrue(result);
  });

  it("returns false for azurite default endpoint", () => {
    const result = isCosmosEndpoint("https://127.0.0.1:10002/devstoreaccount1");
    assert.isFalse(result);
  });

  it("returns false for azurite default endpoint with non-default port", () => {
    const result = isCosmosEndpoint("https://127.0.0.1:20002/devstoreaccount1");
    assert.isFalse(result);
  });

  it("returns false for azurite default localhost endpoint", () => {
    const result = isCosmosEndpoint("https://localhost:10002/devstoreaccount1");
    assert.isFalse(result);
  });

  it("returns false for azurite default localhost endpoint with non-default port", () => {
    const result = isCosmosEndpoint("https://localhost:20002/devstoreaccount1");
    assert.isFalse(result);
  });
});
