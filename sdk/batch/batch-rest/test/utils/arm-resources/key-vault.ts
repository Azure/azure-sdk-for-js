// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getLocation, getResourceGroupName, getSubscriptionId, getTenantId } from "./env-const.js";
import type { Vault, VaultCreateOrUpdateParameters } from "@azure/arm-keyvault";
import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { AuthorizationManagementClient } from "@azure/arm-authorization";
import type { RoleAssignment } from "@azure/arm-authorization";
import { KeyClient } from "@azure/keyvault-keys";
import type { KeyVaultKey, CreateKeyOptions } from "@azure/keyvault-keys";
import { RestError } from "@azure/core-rest-pipeline";
import { createTestCredential } from "@azure-tools/test-credential";

/**
 * Creates a Key Vault suitable for a BYOS (Bring Your Own Subscription) Batch account scenario.
 * Requirements implemented (per user subscription mode guidance):
 * 1. Vault is created in the same subscription & region (using env-derived subscription/location).
 * 2. Permission model is RBAC (preferred)
 * 3. Resource access flags enabled: deployment, ARM template deployment, disk encryption.
 **/
export async function createKeyVaultForByosBatchAccount(keyVaultName: string): Promise<Vault> {
  const keyVaultClient = new KeyVaultManagementClient(createTestCredential(), getSubscriptionId());

  // Construct parameters honoring selected permission model.
  const keyVaultParams: VaultCreateOrUpdateParameters = {
    location: getLocation(),
    properties: {
      tenantId: getTenantId(),
      enableRbacAuthorization: true,
      enabledForDeployment: true,
      enabledForTemplateDeployment: true,
      enabledForDiskEncryption: true,
      networkAcls: {
        bypass: "AzureServices",
      },
      enableSoftDelete: false,
      sku: {
        family: "A",
        name: "standard",
      },
    },
  };

  let vault: Vault;
  try {
    vault = await keyVaultClient.vaults.beginCreateOrUpdateAndWait(
      getResourceGroupName(),
      keyVaultName,
      keyVaultParams,
    );
  } catch (err) {
    console.error("Error creating Key Vault:", err);
    throw err;
  }
  return vault;
}

/**
 * Assigns a role to a principal at the scope of the given Key Vault.
 * Fetches the role definition by its friendly role name (e.g., "Key Vault Secrets Officer") then creates the role assignment.
 *
 * NOTE: Role assignments require the principal's object (directory) ID, not the application (client) ID.
 * If you only have the client ID, you'll need to resolve the service principal object ID via Microsoft Graph beforehand.
 *
 * @param keyVaultName - Name of the Key Vault (used to build the scope resource ID)
 * @param roleName - Friendly role name to look up (case-sensitive match on roleName)
 * @param principalObjectId - Object ID of the target service principal, user, or managed identity
 * @param principalType - Type of the principal ("ServicePrincipal", "User", or "Group")
 * @returns The created RoleAssignment
 */
export async function assignRoleToKeyVault(
  keyVaultResourceId: string,
  roleName: string,
  principalObjectId: string,
  principalType: "ServicePrincipal" | "User" | "Group" = "ServicePrincipal",
): Promise<RoleAssignment> {
  const subscriptionId = getSubscriptionId();
  const authClient = new AuthorizationManagementClient(createTestCredential(), subscriptionId);

  // Retrieve the role definition matching the provided role name at the specified scope.
  const defs = [];
  for await (const d of authClient.roleDefinitions.list(keyVaultResourceId, {
    filter: `roleName eq '${roleName}'`,
  })) {
    defs.push(d);
  }
  if (defs.length === 0) {
    throw new Error(
      `Role definition with name '${roleName}' not found at scope ${keyVaultResourceId}`,
    );
  }
  const roleDef = defs[0];
  if (!roleDef.id) {
    throw new Error(`Resolved role definition for '${roleName}' has no id`);
  }

  const assignmentName = crypto.randomUUID();
  const assignment = await authClient.roleAssignments.create(keyVaultResourceId, assignmentName, {
    principalId: principalObjectId,
    roleDefinitionId: roleDef.id,
    principalType: principalType,
  });
  return assignment;
}

/**
 * Convenience helper specifically for assigning the Key Vault Secrets Officer role to a principal.
 * Requires that the caller provides the object ID of the principal (not the client/app ID).
 * @param keyVaultResourceId - Key Vault resource ID
 * @param principalObjectId - Object ID of the principal in the tenant
 * @param principalType - Type of the principal ("ServicePrincipal", "User", or "Group")
 */
export async function grantKeyVaultSecretsOfficer(
  keyVaultResourceId: string,
  principalObjectId: string,
  principalType: "ServicePrincipal" | "User" | "Group" = "ServicePrincipal",
): Promise<RoleAssignment> {
  return assignRoleToKeyVault(
    keyVaultResourceId,
    "Key Vault Secrets Officer",
    principalObjectId,
    principalType,
  );
}
/**
 * Grants the Key Vault Administrator role to a principal.
 * @param keyVaultResourceId - The resource ID of the Key Vault
 * @param principalObjectId - The object ID of the principal
 * @param principalType - The type of the principal ("ServicePrincipal", "User", or "Group")
 * @returns The created RoleAssignment
 */
export async function grantKeyVaultAdministrator(
  keyVaultResourceId: string,
  principalObjectId: string,
  principalType: "ServicePrincipal" | "User" | "Group" = "ServicePrincipal",
): Promise<RoleAssignment> {
  return assignRoleToKeyVault(
    keyVaultResourceId,
    "Key Vault Administrator",
    principalObjectId,
    principalType,
  );
}

export async function deleteKeyVault(keyVaultName: string): Promise<void> {
  const keyVaultClient = new KeyVaultManagementClient(createTestCredential(), getSubscriptionId());
  await keyVaultClient.vaults.delete(getResourceGroupName(), keyVaultName);
}

/**
 * Creates a new cryptographic key in the specified Key Vault.
 * This function creates an RSA key suitable for encryption operations.
 *
 * @param vaultUrl - The base URL of the Key Vault (e.g., "https://myvault.vault.azure.net")
 * @param keyName - The name of the key to create
 * @param options - Optional parameters for key creation
 * @returns The created KeyVaultKey object
 */
export async function createKeyInKeyVault(
  vaultUrl: string,
  keyName: string,
  options?: CreateKeyOptions,
  retryCnt: number = 3,
): Promise<KeyVaultKey> {
  const keyClient = new KeyClient(vaultUrl, createTestCredential());

  const defaultOptions: CreateKeyOptions = {
    keySize: 2048,
    keyOps: ["encrypt", "decrypt", "sign", "verify", "wrapKey", "unwrapKey"],
    ...options,
  };

  try {
    const key = await keyClient.createKey(keyName, "RSA", defaultOptions);
    return key;
  } catch (err) {
    if (err instanceof RestError && err.statusCode === 403) {
      if (retryCnt > 0) {
        console.log("Retrying key creation due to insufficient permissions...");
        return createKeyInKeyVault(vaultUrl, keyName, options, retryCnt - 1);
      }
    }
    console.error("Error creating key in Key Vault:", err);
    throw err;
  }
}

/**
 * Creates a new cryptographic key in the specified Key Vault and returns its URL.
 * This is a convenience function that combines key creation with URL generation,
 * which is commonly needed for encryption scenarios like Disk Encryption Sets.
 *
 * @param vaultUrl - The base URL of the Key Vault (e.g., "https://myvault.vault.azure.net")
 * @param keyName - The name of the key to create
 * @param options - Optional parameters for key creation
 * @returns An object containing both the created key and its URL
 */
export async function createKeyInKeyVaultAndGetUrl(
  vaultUrl: string,
  keyName: string,
  options?: CreateKeyOptions,
): Promise<{ key: KeyVaultKey; keyUrl: string }> {
  const key = await createKeyInKeyVault(vaultUrl, keyName, options);

  return {
    key,
    keyUrl: key.id || generateKeyVaultKeyUrl(vaultUrl, keyName),
  };
}

/**
 * Deletes a key from the specified Key Vault.
 *
 * @param vaultUrl - The base URL of the Key Vault (e.g., "https://myvault.vault.azure.net")
 * @param keyName - The name of the key to delete
 * @returns A promise that resolves when the key is deleted
 */
export async function deleteKeyFromKeyVault(vaultUrl: string, keyName: string): Promise<void> {
  const keyClient = new KeyClient(vaultUrl, createTestCredential());

  try {
    await keyClient.beginDeleteKey(keyName);
  } catch (err) {
    console.error("Error deleting key from Key Vault:", err);
    throw err;
  }
}

/**
 * Generates a Key Vault key URL for use with encryption scenarios.
 * This function creates a properly formatted key URL that can be used with
 * Disk Encryption Sets and other Azure services that require customer-managed keys.
 *
 * Note: This function generates a URL format but does not actually create the key.
 * The key would need to be created separately using the Key Vault data plane SDK
 * (\@azure/keyvault-keys) or through other means (Azure CLI, PowerShell, Portal).
 *
 * @param vaultUrl - The base URL of the Key Vault (e.g., "https://myvault.vault.azure.net")
 * @param keyName - The name of the key
 * @param keyVersion - Optional specific version of the key. If not provided, uses the latest version
 * @returns A properly formatted Key Vault key URL
 */
export function generateKeyVaultKeyUrl(
  vaultUrl: string,
  keyName: string,
  keyVersion?: string,
): string {
  // Remove trailing slash from vault URL if present
  const cleanVaultUrl = vaultUrl.endsWith("/") ? vaultUrl.slice(0, -1) : vaultUrl;

  if (keyVersion) {
    return `${cleanVaultUrl}/keys/${keyName}/${keyVersion}`;
  } else {
    return `${cleanVaultUrl}/keys/${keyName}`;
  }
}
