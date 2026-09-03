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
 * @param keyVaultResourceId - Resource ID of the Key Vault (used to build the scope resource ID)
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
 * Grants the "Key Vault Administrator" role to a principal on the specified Key Vault.
 * This is a convenience wrapper around assignRoleToKeyVault.
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
 * Creates a key in an Azure Key Vault and returns the key and its URL.
 * @param keyVaultUrl - The URL of the Key Vault (e.g., https://myvault.vault.azure.net/)
 * @param keyName - The name for the new key
 * @param keyOptions - Optional parameters for key creation
 * @returns An object containing the created key and its full URL
 */
export async function createKeyInKeyVaultAndGetUrl(
  keyVaultUrl: string,
  keyName: string,
  keyOptions?: CreateKeyOptions,
): Promise<{ key: KeyVaultKey; keyUrl: string }> {
  const keyClient = new KeyClient(keyVaultUrl, createTestCredential());

  const key = await keyClient.createKey(keyName, "RSA", keyOptions);
  if (!key.id) {
    throw new Error(`Created key '${keyName}' does not have an ID`);
  }

  return { key, keyUrl: key.id };
}

/**
 * Deletes a Key Vault by name.
 * @param keyVaultName - Name of the Key Vault to delete.
 */
export async function deleteKeyVault(keyVaultName: string): Promise<void> {
  const keyVaultClient = new KeyVaultManagementClient(createTestCredential(), getSubscriptionId());
  try {
    await keyVaultClient.vaults.delete(getResourceGroupName(), keyVaultName);
  } catch (err) {
    if (err instanceof RestError && err.statusCode === 404) {
      // Key Vault not found, nothing to delete
      return;
    }
    console.error("Error deleting Key Vault:", err);
    throw err;
  }
}
