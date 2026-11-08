// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Scenario: schema contract values for @azure/provisioning-keyvault.
 * provisioning API: @azure/provisioning-keyvault root types namespace.
 * Source contracts: Microsoft Learn, Azure REST API specs, and Azure quickstarts.
 * Typecheck command: pnpm run typecheck
 */

import type {
  AccessPolicyEntryInput,
  IpRuleInput,
  KeyPropertiesInput,
  ManagedHsmKeyPropertiesInput,
  ManagedHsmPropertiesInput,
  ManagedHsmSkuInput,
  MhsmNetworkRuleSetInput,
  MhsmPrivateEndpointConnectionPropertiesInput,
  MhsmipRuleInput,
  NetworkRuleSetInput,
  PrivateEndpointConnectionPropertiesInput,
  SecretPropertiesInput,
  VaultAccessPolicyPropertiesInput,
  VaultPropertiesInput,
  VirtualNetworkRuleInput,
} from "@azure/provisioning-keyvault/types";

// Source: arm-schema-ref\Microsoft.KeyVault\2026-02-01\vaults.md lines 207-247.
export const accessPolicyEntryFromLearn: AccessPolicyEntryInput = {
  tenantId: "11111111-1111-1111-1111-111111111111",
  objectId: "22222222-2222-2222-2222-222222222222",
  permissions: {
    certificates: ["get"],
    keys: ["encrypt"],
    secrets: ["get"],
  },
};

// Source: arm-schema-ref\Microsoft.KeyVault\2026-02-01\vaults.md lines 207-247.
export const vaultPropertiesFromLearn: VaultPropertiesInput = {
  tenantId: "11111111-1111-1111-1111-111111111111",
  sku: {
    family: "A",
    name: "standard",
  },
  accessPolicies: [accessPolicyEntryFromLearn],
  createMode: "default",
  enableRbacAuthorization: false,
  enableSoftDelete: true,
  enabledForDeployment: false,
  enabledForDiskEncryption: false,
  enabledForTemplateDeployment: false,
  publicNetworkAccess: "Enabled",
  softDeleteRetentionInDays: 7,
};

// Source: specification\keyvault\resource-manager\Microsoft.KeyVault\KeyVault\stable\2026-02-01\examples\createVaultWithNetworkAcls.json request body.
export const vaultNetworkRuleSetFromSwagger: NetworkRuleSetInput = {
  bypass: "AzureServices",
  defaultAction: "Deny",
  ipRules: [
    {
      value: "124.56.78.91",
    },
    {
      value: "'10.91.4.0/24'",
    },
  ],
  virtualNetworkRules: [
    {
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1",
    },
  ],
};

// Source: specification\keyvault\resource-manager\Microsoft.KeyVault\KeyVault\stable\2026-02-01\examples\createVaultWithNetworkAcls.json request body.
export const vaultPropertiesFromSwaggerNetworkAcls: VaultPropertiesInput = {
  tenantId: "00000000-0000-0000-0000-000000000000",
  sku: {
    family: "A",
    name: "standard",
  },
  enabledForDeployment: true,
  enabledForDiskEncryption: true,
  enabledForTemplateDeployment: true,
  networkAcls: vaultNetworkRuleSetFromSwagger,
};

// Source: specification\keyvault\resource-manager\Microsoft.KeyVault\KeyVault\stable\2026-02-01\examples\updateAccessPoliciesAdd.json request body.
export const vaultAccessPolicyPropertiesFromSwagger: VaultAccessPolicyPropertiesInput = {
  accessPolicies: [
    {
      tenantId: "00000000-0000-0000-0000-000000000000",
      objectId: "00000000-0000-0000-0000-000000000000",
      permissions: {
        certificates: ["get"],
        keys: ["encrypt"],
        secrets: ["get"],
      },
    },
  ],
};

// Source: specification\keyvault\resource-manager\Microsoft.KeyVault\KeyVault\stable\2026-02-01\examples\createSecret.json request body.
export const secretPropertiesFromSwagger: SecretPropertiesInput = {
  value: "secret-value",
};

// Source: arm-schema-ref\Microsoft.KeyVault\2026-02-01\vaults\secrets.md lines 110-134.
export const secretPropertiesFromLearn: SecretPropertiesInput = {
  value: "szechuan",
};

// Source: specification\keyvault\resource-manager\Microsoft.KeyVault\KeyVault\stable\2026-02-01\examples\createKey.json request body.
export const keyVaultKeyPropertiesFromSwagger: KeyPropertiesInput = {
  kty: "RSA",
};

// Source: arm-schema-ref\Microsoft.KeyVault\2026-02-01\vaults\keys.md lines 233-250.
export const keyVaultKeyPropertiesFromLearn: KeyPropertiesInput = {
  keyOps: ["encrypt", "decrypt", "sign", "verify", "wrapKey", "unwrapKey"],
  keySize: 2048,
  kty: "RSA",
};

// Source: specification\keyvault\resource-manager\Microsoft.KeyVault\KeyVault\stable\2026-02-01\examples\putPrivateEndpointConnection.json request body.
export const privateEndpointConnectionPropertiesFromSwagger: PrivateEndpointConnectionPropertiesInput =
  {
    privateLinkServiceConnectionState: {
      description: "Approved by provisioning test.",
      status: "Approved",
    },
  };

// Source: specification\keyvault\resource-manager\Microsoft.KeyVault\KeyVault\stable\2026-02-01\examples\ManagedHsm_CreateOrUpdate.json request body.
export const managedHsmSkuFromSwagger: ManagedHsmSkuInput = {
  family: "B",
  name: "Standard_B1",
};

// Source: specification\keyvault\resource-manager\Microsoft.KeyVault\KeyVault\stable\2026-02-01\examples\ManagedHsm_CreateOrUpdate.json request body.
export const managedHsmPropertiesFromSwagger: ManagedHsmPropertiesInput = {
  enablePurgeProtection: false,
  enableSoftDelete: true,
  initialAdminObjectIds: ["00000000-0000-0000-0000-000000000000"],
  softDeleteRetentionInDays: 90,
  tenantId: "00000000-0000-0000-0000-000000000000",
};

// Source: quickstarts\microsoft.keyvault\managed-hsm-create\main.bicep lines 18-37.
export const managedHsmNetworkRuleSetFromQuickstart: MhsmNetworkRuleSetInput = {
  bypass: "None",
  defaultAction: "Allow",
};

// Source: specification\keyvault\resource-manager\Microsoft.KeyVault\KeyVault\stable\2026-02-01\examples\managedHsmCreateKey.json request body.
export const keyVaultManagedHsmKeyPropertiesFromSwagger: ManagedHsmKeyPropertiesInput = {
  kty: "RSA",
};

// Source: specification\keyvault\resource-manager\Microsoft.KeyVault\KeyVault\stable\2026-02-01\examples\ManagedHsm_putPrivateEndpointConnection.json request body.
export const mhsmPrivateEndpointConnectionPropertiesFromSwagger: MhsmPrivateEndpointConnectionPropertiesInput =
  {
    privateLinkServiceConnectionState: {
      description: "Approved by provisioning test.",
      status: "Approved",
    },
  };

export const primitiveNetworkRuleContracts = {
  ipRule: {
    value: "124.56.78.91",
  } satisfies IpRuleInput,
  virtualNetworkRule: {
    id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1",
  } satisfies VirtualNetworkRuleInput,
  mhsmIpRule: {
    value: "10.0.0.0/24",
  } satisfies MhsmipRuleInput,
};
