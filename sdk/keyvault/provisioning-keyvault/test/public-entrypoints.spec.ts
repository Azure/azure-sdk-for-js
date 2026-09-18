// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack } from "@azure/provisioning-core";
import {
  AccessPolicy,
  DeletedVault,
  KeyVault,
  Secret,
  Version,
  VaultKey,
} from "@azure/provisioning-keyvault";
import { describe, expect, it } from "vitest";

const tenantId = "11111111-1111-1111-1111-111111111111";
const objectId = "22222222-2222-2222-2222-222222222222";

describe("public entrypoints", () => {
  it("constructs a key vault and child resources", () => {
    const stack = new Stack("keyvault-test", {
      targetScope: "resourceGroup",
      location: "eastus",
    });
    const vault = new KeyVault(stack, {
      name: "kvpublictest",
      properties: {
        tenantId,
        sku: { family: "A", name: "standard" },
      },
    });

    new AccessPolicy(vault, {
      name: "add",
      properties: {
        accessPolicies: [
          {
            tenantId,
            objectId,
            permissions: { secrets: ["get"] },
          },
        ],
      },
    });
    new Secret(vault, {
      name: "sample-secret",
      properties: { value: "secret-value" },
    });
    const key = new VaultKey(vault, {
      name: "sample-key",
      properties: { kty: "RSA" },
    });
    new Version(key, { name: "v1", existing: true });
    new DeletedVault(stack, { name: "deleted-vault", existing: true });

    expect(stack.getResources(KeyVault)).toEqual([vault]);
    expect(stack.getResources()).toHaveLength(6);
    expect(KeyVault.apiVersion).toBe("2026-03-01-preview");
  });
});
