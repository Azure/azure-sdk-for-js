// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountEnableAD.json
 */
async function storageAccountEnableAD(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res9407", "sto8596", {
    azureFilesIdentityBasedAuthentication: {
      activeDirectoryProperties: {
        accountType: "User",
        azureStorageSid: "S-1-5-21-2400535526-2334094090-2402026252-0012",
        domainGuid: "aebfc118-9fa9-4732-a21f-d98e41a77ae1",
        domainName: "adtest.com",
        domainSid: "S-1-5-21-2400535526-2334094090-2402026252",
        forestName: "adtest.com",
        netBiosDomainName: "adtest.com",
        samAccountName: "sam12498",
      },
      directoryServiceOptions: "AD",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountEnableCMK.json
 */
async function storageAccountEnableCMK(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res9407", "sto8596", {
    encryption: {
      keySource: "Microsoft.Keyvault",
      keyVaultProperties: {
        keyName: "wrappingKey",
        keyVaultUri: "https://myvault8569.vault.azure.net",
        keyVersion: "",
      },
      services: {
        blob: { enabled: true, keyType: "Account" },
        file: { enabled: true, keyType: "Account" },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountEnableSmbOAuth.json
 */
async function storageAccountEnableSmbOAuth(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res9407", "sto8596", {
    azureFilesIdentityBasedAuthentication: {
      directoryServiceOptions: "None",
      smbOAuthSettings: { isSmbOAuthEnabled: true },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountLeverageIPv6Ability.json
 */
async function storageAccountUpdateEnableIpv6Features(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res9407", "sto8596", {
    dualStackEndpointPreference: { publishIpv6Endpoint: true },
    networkRuleSet: {
      defaultAction: "Deny",
      ipv6Rules: [{ action: "Allow", iPAddressOrRange: "2001:0db8:85a3::/64" }],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountUpdate.json
 */
async function storageAccountUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a3f7c2b9-4e1d-4c8a-9d6f-8b2a5e41c7f3";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res9407", "sto8596", {
    allowBlobPublicAccess: false,
    allowSharedKeyAccess: true,
    defaultToOAuthAuthentication: false,
    enableExtendedGroups: true,
    encryption: {
      keySource: "Microsoft.Storage",
      services: {
        blob: { enabled: true, keyType: "Account" },
        file: { enabled: true, keyType: "Account" },
      },
    },
    isLocalUserEnabled: true,
    isSftpEnabled: true,
    keyPolicy: { keyExpirationPeriodInDays: 20 },
    minimumTlsVersion: "TLS1_2",
    networkRuleSet: {
      defaultAction: "Allow",
      resourceAccessRules: [
        {
          resourceId:
            "/subscriptions/a7e99807-abbf-4642-bdec-2c809a96a8bc/resourceGroups/res9407/providers/Microsoft.Synapse/workspaces/testworkspace",
          tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
        },
      ],
    },
    routingPreference: {
      publishInternetEndpoints: true,
      publishMicrosoftEndpoints: true,
      routingChoice: "MicrosoftRouting",
    },
    sasPolicy: { expirationAction: "Log", sasExpirationPeriod: "1.15:59:59" },
    geoPriorityReplicationStatus: { isBlobEnabled: true },
    allowSharedKeyAccessForServices: {
      blob: { enabled: true },
      file: { enabled: false },
      queue: { enabled: true },
      table: { enabled: false },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountUpdateAccessTierToSmart.json
 */
async function storageAccountUpdateAccessTierToSmart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res9407", "sto8596", {
    accessTier: "Smart",
    allowBlobPublicAccess: false,
    allowSharedKeyAccess: true,
    defaultToOAuthAuthentication: false,
    enableExtendedGroups: true,
    encryption: {
      keySource: "Microsoft.Storage",
      services: {
        blob: { enabled: true, keyType: "Account" },
        file: { enabled: true, keyType: "Account" },
      },
    },
    isLocalUserEnabled: true,
    isSftpEnabled: true,
    keyPolicy: { keyExpirationPeriodInDays: 20 },
    minimumTlsVersion: "TLS1_2",
    networkRuleSet: {
      defaultAction: "Allow",
      resourceAccessRules: [
        {
          resourceId:
            "/subscriptions/a7e99807-abbf-4642-bdec-2c809a96a8bc/resourceGroups/res9407/providers/Microsoft.Synapse/workspaces/testworkspace",
          tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
        },
      ],
    },
    routingPreference: {
      publishInternetEndpoints: true,
      publishMicrosoftEndpoints: true,
      routingChoice: "MicrosoftRouting",
    },
    sasPolicy: { expirationAction: "Log", sasExpirationPeriod: "1.15:59:59" },
    geoPriorityReplicationStatus: { isBlobEnabled: true },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountUpdateAllowedCopyScopeToAAD.json
 */
async function storageAccountUpdateAllowedCopyScopeToAAD(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res9407", "sto8596", {
    allowBlobPublicAccess: false,
    allowSharedKeyAccess: true,
    allowedCopyScope: "AAD",
    encryption: {
      keySource: "Microsoft.Storage",
      services: {
        blob: { enabled: true, keyType: "Account" },
        file: { enabled: true, keyType: "Account" },
      },
    },
    keyPolicy: { keyExpirationPeriodInDays: 20 },
    minimumTlsVersion: "TLS1_2",
    networkRuleSet: {
      defaultAction: "Allow",
      resourceAccessRules: [
        {
          resourceId:
            "/subscriptions/a7e99807-abbf-4642-bdec-2c809a96a8bc/resourceGroups/res9407/providers/Microsoft.Synapse/workspaces/testworkspace",
          tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
        },
      ],
    },
    routingPreference: {
      publishInternetEndpoints: true,
      publishMicrosoftEndpoints: true,
      routingChoice: "MicrosoftRouting",
    },
    sasPolicy: { expirationAction: "Log", sasExpirationPeriod: "1.15:59:59" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountUpdateDisablePublicNetworkAccess.json
 */
async function storageAccountUpdateDisablePublicNetworkAccess(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res9407", "sto8596", {
    allowBlobPublicAccess: false,
    allowSharedKeyAccess: true,
    encryption: {
      keySource: "Microsoft.Storage",
      services: {
        blob: { enabled: true, keyType: "Account" },
        file: { enabled: true, keyType: "Account" },
      },
    },
    keyPolicy: { keyExpirationPeriodInDays: 20 },
    minimumTlsVersion: "TLS1_2",
    networkRuleSet: {
      defaultAction: "Allow",
      resourceAccessRules: [
        {
          resourceId:
            "/subscriptions/a7e99807-abbf-4642-bdec-2c809a96a8bc/resourceGroups/res9407/providers/Microsoft.Synapse/workspaces/testworkspace",
          tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
        },
      ],
    },
    publicNetworkAccess: "Disabled",
    routingPreference: {
      publishInternetEndpoints: true,
      publishMicrosoftEndpoints: true,
      routingChoice: "MicrosoftRouting",
    },
    sasPolicy: { expirationAction: "Log", sasExpirationPeriod: "1.15:59:59" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountUpdateUserAssignedEncryptionIdentityWithCMK.json
 */
async function storageAccountUpdateUserAssignedEncryptionIdentityWithCMK(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res9101", "sto4445", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/{subscription-id}/resourceGroups/res9101/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{managed-identity-name}":
          {},
      },
    },
    kind: "Storage",
    encryption: {
      encryptionIdentity: {
        encryptionUserAssignedIdentity:
          "/subscriptions/{subscription-id}/resourceGroups/res9101/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{managed-identity-name}",
      },
      keySource: "Microsoft.Keyvault",
      keyVaultProperties: {
        keyName: "wrappingKey",
        keyVaultUri: "https://myvault8569.vault.azure.net",
        keyVersion: "",
      },
      services: {
        blob: { enabled: true, keyType: "Account" },
        file: { enabled: true, keyType: "Account" },
      },
    },
    sku: { name: "Standard_LRS" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountUpdateUserAssignedIdentityWithFederatedIdentityClientId.json
 */
async function storageAccountUpdateUserAssignedIdentityWithFederatedIdentityClientId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res131918", "sto131918", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/{subscription-id}/resourceGroups/res9101/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{managed-identity-name}":
          {},
      },
    },
    kind: "Storage",
    encryption: {
      encryptionIdentity: {
        encryptionFederatedIdentityClientId: "3109d1c4-a5de-4d84-8832-feabb916a4b6",
        encryptionUserAssignedIdentity:
          "/subscriptions/{subscription-id}/resourceGroups/res9101/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{managed-identity-name}",
      },
      keySource: "Microsoft.Keyvault",
      keyVaultProperties: {
        keyName: "wrappingKey",
        keyVaultUri: "https://myvault8569.vault.azure.net",
        keyVersion: "",
      },
      services: {
        blob: { enabled: true, keyType: "Account" },
        file: { enabled: true, keyType: "Account" },
      },
    },
    sku: { name: "Standard_LRS" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountUpdateWithDataCollaborationPolicy.json
 */
async function storageAccountUpdateWithDataCollaborationPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res9407", "sto8596", {
    dataCollaborationPolicyProperties: {
      allowStorageConnectors: true,
      allowStorageDataShares: true,
      allowCrossTenantDataSharing: false,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountUpdateWithImmutabilityPolicy.json
 */
async function storageAccountUpdateWithImmutabilityPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res9407", "sto8596", {
    immutableStorageWithVersioning: {
      enabled: true,
      immutabilityPolicy: {
        allowProtectedAppendWrites: true,
        immutabilityPeriodSinceCreationInDays: 15,
        state: "Locked",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountUpdate_placement.json
 */
async function storageAccountUpdatePlacement(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res9407", "sto8596", {
    placement: { zonePlacementPolicy: "Any" },
    allowBlobPublicAccess: false,
    allowSharedKeyAccess: true,
    defaultToOAuthAuthentication: false,
    enableExtendedGroups: true,
    encryption: {
      keySource: "Microsoft.Storage",
      services: {
        blob: { enabled: true, keyType: "Account" },
        file: { enabled: true, keyType: "Account" },
      },
    },
    isLocalUserEnabled: true,
    isSftpEnabled: true,
    keyPolicy: { keyExpirationPeriodInDays: 20 },
    minimumTlsVersion: "TLS1_2",
    networkRuleSet: {
      defaultAction: "Allow",
      resourceAccessRules: [
        {
          resourceId:
            "/subscriptions/a7e99807-abbf-4642-bdec-2c809a96a8bc/resourceGroups/res9407/providers/Microsoft.Synapse/workspaces/testworkspace",
          tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
        },
      ],
    },
    routingPreference: {
      publishInternetEndpoints: true,
      publishMicrosoftEndpoints: true,
      routingChoice: "MicrosoftRouting",
    },
    sasPolicy: { expirationAction: "Log", sasExpirationPeriod: "1.15:59:59" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary the update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: 2025-08-01/StorageAccountUpdate_zones.json
 */
async function storageAccountUpdateZones(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update("res9407", "sto8596", {
    allowBlobPublicAccess: false,
    allowSharedKeyAccess: true,
    defaultToOAuthAuthentication: false,
    enableExtendedGroups: true,
    encryption: {
      keySource: "Microsoft.Storage",
      services: {
        blob: { enabled: true, keyType: "Account" },
        file: { enabled: true, keyType: "Account" },
      },
    },
    isLocalUserEnabled: true,
    isSftpEnabled: true,
    keyPolicy: { keyExpirationPeriodInDays: 20 },
    minimumTlsVersion: "TLS1_2",
    networkRuleSet: {
      defaultAction: "Allow",
      resourceAccessRules: [
        {
          resourceId:
            "/subscriptions/a7e99807-abbf-4642-bdec-2c809a96a8bc/resourceGroups/res9407/providers/Microsoft.Synapse/workspaces/testworkspace",
          tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
        },
      ],
    },
    routingPreference: {
      publishInternetEndpoints: true,
      publishMicrosoftEndpoints: true,
      routingChoice: "MicrosoftRouting",
    },
    sasPolicy: { expirationAction: "Log", sasExpirationPeriod: "1.15:59:59" },
    zones: ["1"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountEnableAD();
  await storageAccountEnableCMK();
  await storageAccountEnableSmbOAuth();
  await storageAccountUpdateEnableIpv6Features();
  await storageAccountUpdate();
  await storageAccountUpdateAccessTierToSmart();
  await storageAccountUpdateAllowedCopyScopeToAAD();
  await storageAccountUpdateDisablePublicNetworkAccess();
  await storageAccountUpdateUserAssignedEncryptionIdentityWithCMK();
  await storageAccountUpdateUserAssignedIdentityWithFederatedIdentityClientId();
  await storageAccountUpdateWithDataCollaborationPolicy();
  await storageAccountUpdateWithImmutabilityPolicy();
  await storageAccountUpdatePlacement();
  await storageAccountUpdateZones();
}

main().catch(console.error);
