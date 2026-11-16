// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, namingRequiredPolicy } from "@azure/provisioning-core";
import { DeletedVault } from "@azure/provisioning-keyvault";
import type * as keyVault from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import { expectRenderedOutputsToMatchBaselines, renderStackArtifacts } from "../utils/index.js";

/*
 * Primary resource type: Microsoft.KeyVault/locations/deletedVaults
 * Primary schema key: Microsoft.KeyVault/locations/deletedVaults
 * Also covers: none
 * Scenario: public entrypoint shard for DeletedVault
 * provisioning API: DeletedVault
 * Source: packages\cdk\keyvault\src\index.ts
 * Runtime baseline: public-entrypoints-deleted-vault.test.baseline.*
 * Gap/reduction: read-only proxy resource is covered through existing() and a deployment output.
 * provisioning API/shard map: DeletedVault -> public-entrypoints-deleted-vault
 */
describe("public entrypoints deleted vault", () => {
  it("renders through the public package entrypoint", () => {
    const stack = new Stack("infra", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });
    const deleted = new DeletedVault(stack, {
      name: "eastus/deletedvault",
      existing: true,
    });
    stack.outputs.add("deletedVault", "object", deleted.properties);

    const rendered = renderStackArtifacts(stack);
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6kZZ9t:
  // "DeletedVaultProps is exported as the resource props type, but DeletedVault only accepts ExistingResourceProps & { existing: true } in its constructor. The public interface is therefore not usable to construct this class. Align the interface with the constructor or stop exporting the unused type."
  it("does not export an unusable DeletedVaultProps interface", () => {
    // eslint-disable-next-line no-constant-condition
    if (false) {
      // @ts-expect-error Existing-only resources do not expose deployable props.
      type _DeletedVaultProps = keyVault.DeletedVaultProps;
    }
  });
});
