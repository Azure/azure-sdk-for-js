// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountEnableAD.json
 */
async function storageAccountEnableAd() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const parameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update(resourceGroupName, accountName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountEnableCMK.json
 */
async function storageAccountEnableCmk() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const parameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update(resourceGroupName, accountName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountEnableSmbOAuth.json
 */
async function storageAccountEnableSmbOAuth() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const parameters = {
    azureFilesIdentityBasedAuthentication: {
      directoryServiceOptions: "None",
      smbOAuthSettings: { isSmbOAuthEnabled: true },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update(resourceGroupName, accountName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountUpdate.json
 */
async function storageAccountUpdate() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const parameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update(resourceGroupName, accountName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountUpdateAllowedCopyScopeToAAD.json
 */
async function storageAccountUpdateAllowedCopyScopeToAad() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const parameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update(resourceGroupName, accountName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountUpdateDisablePublicNetworkAccess.json
 */
async function storageAccountUpdateDisablePublicNetworkAccess() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const parameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update(resourceGroupName, accountName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountLeverageIPv6Ability.json
 */
async function storageAccountUpdateEnableIpv6Features() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const parameters = {
    dualStackEndpointPreference: { publishIpv6Endpoint: true },
    networkRuleSet: {
      defaultAction: "Deny",
      ipv6Rules: [{ action: "Allow", iPAddressOrRange: "2001:0db8:85a3::/64" }],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update(resourceGroupName, accountName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountUpdateUserAssignedEncryptionIdentityWithCMK.json
 */
async function storageAccountUpdateUserAssignedEncryptionIdentityWithCmk() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9101";
  const accountName = "sto4445";
  const parameters = {
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
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/{subscriptionId}/resourceGroups/res9101/providers/MicrosoftManagedIdentity/userAssignedIdentities/{managedIdentityName}":
          {},
      },
    },
    kind: "Storage",
    sku: { name: "Standard_LRS" },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update(resourceGroupName, accountName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountUpdateUserAssignedIdentityWithFederatedIdentityClientId.json
 */
async function storageAccountUpdateUserAssignedIdentityWithFederatedIdentityClientId() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res131918";
  const accountName = "sto131918";
  const parameters = {
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
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/{subscriptionId}/resourceGroups/res9101/providers/MicrosoftManagedIdentity/userAssignedIdentities/{managedIdentityName}":
          {},
      },
    },
    kind: "Storage",
    sku: { name: "Standard_LRS" },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update(resourceGroupName, accountName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountUpdateWithImmutabilityPolicy.json
 */
async function storageAccountUpdateWithImmutabilityPolicy() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const parameters = {
    immutableStorageWithVersioning: {
      enabled: true,
      immutabilityPolicy: {
        allowProtectedAppendWrites: true,
        immutabilityPeriodSinceCreationInDays: 15,
        state: "Locked",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update(resourceGroupName, accountName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountUpdate_placement.json
 */
async function storageAccountUpdatePlacement() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const parameters = {
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
    placement: { zonePlacementPolicy: "Any" },
    routingPreference: {
      publishInternetEndpoints: true,
      publishMicrosoftEndpoints: true,
      routingChoice: "MicrosoftRouting",
    },
    sasPolicy: { expirationAction: "Log", sasExpirationPeriod: "1.15:59:59" },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update(resourceGroupName, accountName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @summary The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountUpdate_zones.json
 */
async function storageAccountUpdateZones() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9407";
  const accountName = "sto8596";
  const parameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update(resourceGroupName, accountName, parameters);
  console.log(result);
}

async function main() {
  await storageAccountEnableAd();
  await storageAccountEnableCmk();
  await storageAccountEnableSmbOAuth();
  await storageAccountUpdate();
  await storageAccountUpdateAllowedCopyScopeToAad();
  await storageAccountUpdateDisablePublicNetworkAccess();
  await storageAccountUpdateEnableIpv6Features();
  await storageAccountUpdateUserAssignedEncryptionIdentityWithCmk();
  await storageAccountUpdateUserAssignedIdentityWithFederatedIdentityClientId();
  await storageAccountUpdateWithImmutabilityPolicy();
  await storageAccountUpdatePlacement();
  await storageAccountUpdateZones();
}

main().catch(console.error);
