// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as packageExports from "@azure/provisioning-keyvault";
import { describe, expect, it } from "vitest";

describe("public entrypoints", () => {
  it("exports generated resource classes", () => {
    expect(packageExports.DeletedManagedHsm).toBeDefined();
    expect(packageExports.DeletedVault).toBeDefined();
    expect(packageExports.ManagedHsm).toBeDefined();
    expect(packageExports.ManagedHsmKey).toBeDefined();
    expect(packageExports.KeyVaultManagedHsmKey).toBeDefined();
    expect(packageExports.ManagedHsmPrivateEndpointConnection).toBeDefined();
    expect(packageExports.KeyVault).toBeDefined();
    expect(packageExports.AccessPolicy).toBeDefined();
    expect(packageExports.VaultKey).toBeDefined();
    expect(packageExports.Version).toBeDefined();
    expect(packageExports.VaultPrivateEndpointConnection).toBeDefined();
    expect(packageExports.Secret).toBeDefined();
  });
});
