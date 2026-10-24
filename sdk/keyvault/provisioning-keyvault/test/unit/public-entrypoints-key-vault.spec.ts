// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type Expression, type Stack } from "@azure/provisioning-core";
import {
  AccessPolicy,
  KeyVault,
  Secret,
  VaultKey,
  VaultPrivateEndpointConnection,
  Version,
} from "@azure/provisioning-keyvault";
import type * as keyVault from "@azure/provisioning-keyvault";
import type { AccessPolicyEntryInput } from "@azure/provisioning-keyvault/types";
import { describe, expect, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../utils/index.js";

const tenantId = "11111111-1111-1111-1111-111111111111";
const objectId = "22222222-2222-2222-2222-222222222222";

function vaultAccessPolicy(): AccessPolicyEntryInput {
  return {
    tenantId,
    objectId,
    permissions: {
      certificates: ["get"],
      keys: ["encrypt"],
      secrets: ["get"],
    },
  };
}

function addCoreOutputs(
  stack: Stack,
  resource: { name: Expression<string>; id: Expression<string> },
) {
  stack.outputs.add("name", "string", resource.name);
  stack.outputs.add("resourceId", "string", resource.id);
}

/*
 * Primary resource type: Microsoft.KeyVault/vaults
 * Primary schema key: Microsoft.KeyVault/vaults
 * Also covers: Microsoft.KeyVault/vaults/accessPolicies, Microsoft.KeyVault/vaults/privateEndpointConnections, Microsoft.KeyVault/vaults/secrets, Microsoft.KeyVault/vaults/keys, Microsoft.KeyVault/vaults/keys/versions
 * Scenario: public entrypoint shard for KeyVault root graph
 * provisioning API: KeyVault, AccessPolicy, VaultPrivateEndpointConnection, Secret, VaultKey, Version
 * Source: packages\cdk\keyvault\src\index.ts
 * Runtime baseline: public-entrypoints-key-vault.test.baseline.*
 * Gap/reduction: read-only key version is covered through existing() and a deployment output.
 * provisioning API/shard map: KeyVault root -> AccessPolicy, VaultPrivateEndpointConnection, Secret, VaultKey, Version
 */
describe("public entrypoints key vault", () => {
  it("renders through the public package entrypoint", () => {
    const stack = createResourceGroupStack();
    const vault = new KeyVault(stack, {
      name: "kvpublic",
      location: "eastus",
      properties: {
        tenantId,
        sku: {
          family: "A",
          name: "standard",
        },
        accessPolicies: [vaultAccessPolicy()],
        enableSoftDelete: true,
        enableRbacAuthorization: false,
      },
    });
    new AccessPolicy(vault, {
      name: "add",
      properties: {
        accessPolicies: [vaultAccessPolicy()],
      },
    });
    new VaultPrivateEndpointConnection(vault, {
      name: "sample-pec",
      properties: {
        privateLinkServiceConnectionState: {
          status: "Approved",
          description: "Approved by public entrypoints test.",
        },
      },
    });
    const secret = new Secret(vault, {
      name: "samplesecret",
      properties: {
        value: "secret-value",
        contentType: "text/plain",
      },
    });
    const key = new VaultKey(vault, {
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
    const version = new Version(key, { name: "v1", existing: true });
    addCoreOutputs(stack, vault);
    stack.outputs.add("secretName", "string", secret.name);
    stack.outputs.add("keyName", "string", key.name);
    stack.outputs.add("keyVersion", "object", version.properties);

    const rendered = renderStackArtifacts(stack);
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6kZZ-Y:
  // "VersionProps is exported as the resource props type, but Version only accepts ExistingResourceProps & { existing: true } in its constructor. The public interface is therefore not usable to construct this class. Align the interface with the constructor or stop exporting the unused type."
  it("does not export an unusable VersionProps interface", () => {
    // eslint-disable-next-line no-constant-condition
    if (false) {
      // @ts-expect-error Existing-only resources do not expose deployable props.
      type _VersionProps = keyVault.VersionProps;
    }
  });
});
