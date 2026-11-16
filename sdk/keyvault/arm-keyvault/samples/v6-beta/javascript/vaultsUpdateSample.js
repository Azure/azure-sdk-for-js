// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a key vault in the specified subscription.
 *
 * @summary update a key vault in the specified subscription.
 * x-ms-original-file: 2026-10-01-preview/removeVaultWithIdentity.json
 */
async function removeAllUserAssignedIdentitiesAndTheirCertificatesFromAVaultUsingPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.update("sample-resource-group", "sample-vault", {
    identity: { type: "None" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a key vault in the specified subscription.
 *
 * @summary update a key vault in the specified subscription.
 * x-ms-original-file: 2026-10-01-preview/updateVault.json
 */
async function updateAnExistingVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.update("sample-resource-group", "sample-vault", {
    properties: {
      accessPolicies: [
        {
          objectId: "00000000-0000-0000-0000-000000000000",
          permissions: {
            certificates: [
              "get",
              "list",
              "delete",
              "create",
              "import",
              "update",
              "managecontacts",
              "getissuers",
              "listissuers",
              "setissuers",
              "deleteissuers",
              "manageissuers",
              "recover",
              "purge",
            ],
            keys: [
              "encrypt",
              "decrypt",
              "wrapKey",
              "unwrapKey",
              "sign",
              "verify",
              "get",
              "list",
              "create",
              "update",
              "import",
              "delete",
              "backup",
              "restore",
              "recover",
              "purge",
            ],
            secrets: ["get", "list", "set", "delete", "backup", "restore", "recover", "purge"],
          },
          tenantId: "00000000-0000-0000-0000-000000000000",
        },
      ],
      enabledForDeployment: true,
      enabledForDiskEncryption: true,
      enabledForTemplateDeployment: true,
      publicNetworkAccess: "Enabled",
      sku: { name: "standard", family: "A" },
      tenantId: "00000000-0000-0000-0000-000000000000",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a key vault in the specified subscription.
 *
 * @summary update a key vault in the specified subscription.
 * x-ms-original-file: 2026-10-01-preview/updateVaultPreservingIdentity.json
 */
async function preserveExistingUserAssignedIdentitiesByOmittingIdentityFromPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.update("sample-resource-group", "sample-vault", {
    tags: { environment: "production" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a key vault in the specified subscription.
 *
 * @summary update a key vault in the specified subscription.
 * x-ms-original-file: 2026-10-01-preview/updateVaultRemoveIdentity.json
 */
async function removeOnlyTheSpecifiedUserAssignedIdentityUsingANullPatchEntry() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.update("sample-resource-group", "sample-vault", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/sample-resource-group/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity-to-remove":
          {},
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a key vault in the specified subscription.
 *
 * @summary update a key vault in the specified subscription.
 * x-ms-original-file: 2026-10-01-preview/updateVaultWithCrossTenantAccessProtection.json
 */
async function enableCrossTenantAccessProtectionOnAnExistingVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.update("sample-resource-group", "sample-vault", {
    properties: { enableCrossTenantAccessProtection: true },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a key vault in the specified subscription.
 *
 * @summary update a key vault in the specified subscription.
 * x-ms-original-file: 2026-10-01-preview/updateVaultWithIdentity.json
 */
async function addOrRetainAUserAssignedIdentityOnAVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.update("sample-resource-group", "sample-vault", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/sample-resource-group/providers/Microsoft.ManagedIdentity/userAssignedIdentities/sample-identity":
          {},
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a key vault in the specified subscription.
 *
 * @summary update a key vault in the specified subscription.
 * x-ms-original-file: 2026-10-01-preview/updateVaultWithProtectionKeyWrapping.json
 */
async function configureProtectionKeyWrappingOnAnExistingVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.update("sample-resource-group", "sample-vault", {
    properties: {
      protectionKeysWrappingKey: {
        keyValue: { url: "https://sample-hsm.managedhsm.azure.net/keys/wrapping-key", kty: "oct" },
        keyAuthenticationData: { authType: "ServiceIdentity" },
      },
    },
  });
  console.log(result);
}

async function main() {
  await removeAllUserAssignedIdentitiesAndTheirCertificatesFromAVaultUsingPatch();
  await updateAnExistingVault();
  await preserveExistingUserAssignedIdentitiesByOmittingIdentityFromPatch();
  await removeOnlyTheSpecifiedUserAssignedIdentityUsingANullPatchEntry();
  await enableCrossTenantAccessProtectionOnAnExistingVault();
  await addOrRetainAUserAssignedIdentityOnAVault();
  await configureProtectionKeyWrappingOnAnExistingVault();
}

main().catch(console.error);
