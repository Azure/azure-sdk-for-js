// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, namingRequiredPolicy } from "@azure/provisioning-core";
import { DeletedManagedHsm } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import { expectRenderedOutputsToMatchBaselines, renderStackArtifacts } from "../utils/index.js";

/*
 * Primary resource type: Microsoft.KeyVault/locations/deletedManagedHSMs
 * Primary schema key: Microsoft.KeyVault/locations/deletedManagedHSMs
 * Also covers: none
 * Scenario: public entrypoint shard for DeletedManagedHsm
 * provisioning API: DeletedManagedHsm
 * Source: packages\cdk\keyvault\src\index.ts
 * Runtime baseline: public-entrypoints-deleted-managed-hsm.test.baseline.*
 * Gap/reduction: read-only proxy resource is covered through existing() and a deployment output.
 * provisioning API/shard map: DeletedManagedHsm -> public-entrypoints-deleted-managed-hsm
 */
describe("public entrypoints deleted managed hsm", () => {
  it("renders through the public package entrypoint", () => {
    const stack = new Stack("infra", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });
    const deleted = new DeletedManagedHsm(stack, {
      name: "eastus/deletedmhsm",
      existing: true,
    });
    stack.outputs.add("deletedManagedHsm", "object", deleted.properties);

    const rendered = renderStackArtifacts(stack);
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
