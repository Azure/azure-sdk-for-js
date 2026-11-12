// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type Expression, type Stack } from "@azure/provisioning-core";
import {
  KeyVaultManagedHsmKey,
  ManagedHsm,
  ManagedHsmKey,
  ManagedHsmPrivateEndpointConnection,
} from "@azure/provisioning-keyvault";
import type * as keyVault from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../utils/index.js";

function addCoreOutputs(
  stack: Stack,
  resource: { name: Expression<string>; id: Expression<string> },
) {
  stack.outputs.add("name", "string", resource.name);
  stack.outputs.add("resourceId", "string", resource.id);
}

/*
 * Primary resource type: Microsoft.KeyVault/managedHSMs
 * Primary schema key: Microsoft.KeyVault/managedHSMs
 * Also covers: Microsoft.KeyVault/managedHSMs/privateEndpointConnections, Microsoft.KeyVault/managedHSMs/keys, Microsoft.KeyVault/managedHSMs/keys/versions
 * Scenario: public entrypoint shard for ManagedHsm root graph
 * provisioning API: ManagedHsm, ManagedHsmPrivateEndpointConnection, ManagedHsmKey, KeyVaultManagedHsmKey
 * Source: packages\cdk\keyvault\src\index.ts
 * Runtime baseline: public-entrypoints-managed-hsm.test.baseline.*
 * Gap/reduction: read-only managed HSM key version is covered through existing() and a deployment output.
 * provisioning API/shard map: ManagedHsm root -> ManagedHsmPrivateEndpointConnection, ManagedHsmKey, KeyVaultManagedHsmKey
 */
describe("public entrypoints managed hsm", () => {
  it("renders through the public package entrypoint", () => {
    const stack = createResourceGroupStack();
    const hsm = new ManagedHsm(stack, {
      name: "mhsmpublic",
      location: "eastus",
      sku: {
        family: "B",
        name: "Standard_B1",
      },
      properties: {
        tenantId: "11111111-1111-1111-1111-111111111111",
        initialAdminObjectIds: ["22222222-2222-2222-2222-222222222222"],
        enableSoftDelete: true,
        enablePurgeProtection: false,
        softDeleteRetentionInDays: 90,
        publicNetworkAccess: "Enabled",
      },
    });
    new ManagedHsmPrivateEndpointConnection(hsm, {
      name: "sample-pec",
      properties: {
        privateLinkServiceConnectionState: {
          status: "Approved",
          description: "Approved by public entrypoints test.",
        },
      },
    });
    const key = new ManagedHsmKey(hsm, {
      name: "samplekey",
      properties: {
        kty: "RSA",
        keyOps: ["encrypt", "decrypt"],
        keySize: 2048,
      },
      tags: {
        scenario: "public-entrypoints",
      },
    });
    const version = new KeyVaultManagedHsmKey(key, {
      name: "0123456789abcdef0123456789abcdef",
      existing: true,
    });
    addCoreOutputs(stack, hsm);
    stack.outputs.add("managedHsmKeyName", "string", key.name);
    stack.outputs.add("managedHsmKeyVersion", "object", version.properties);

    const rendered = renderStackArtifacts(stack);
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6kZZ-7:
  // "KeyVaultManagedHsmKeyProps is exported as the resource props type, but KeyVaultManagedHsmKey only accepts ExistingResourceProps & { existing: true } in its constructor. The public interface is therefore not usable to construct this class. Align the interface with the constructor or stop exporting the unused type."
  it("does not export an unusable KeyVaultManagedHsmKeyProps interface", () => {
    // eslint-disable-next-line no-constant-condition
    if (false) {
      // @ts-expect-error Existing-only resources do not expose deployable props.
      type _KeyVaultManagedHsmKeyProps = keyVault.KeyVaultManagedHsmKeyProps;
    }
  });
});
