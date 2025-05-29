import type { AccessControlClientOptions, CreateRoleAssignmentOptions, DeleteRoleAssignmentOptions, DeleteRoleDefinitionOptions, GetRoleAssignmentOptions, GetRoleDefinitionOptions, KeyVaultRoleAssignment, KeyVaultRoleDefinition, KeyVaultRoleScope, ListRoleAssignmentsOptions, ListRoleDefinitionsOptions, SetRoleDefinitionOptions } from "./accessControlModels.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { TokenCredential } from "@azure/core-auth";
/**
 * The KeyVaultAccessControlClient provides methods to manage
 * access control and role assignments in any given Azure Key Vault instance.
 * The client supports creating, retrieving and deleting roles.
 */
export declare class KeyVaultAccessControlClient {
    /**
     * The base URL to the vault
     */
    readonly vaultUrl: string;
    /**
     * A reference to the auto-generated Key Vault HTTP client.
     */
    private readonly client;
    /**
     * Creates an instance of the KeyVaultAccessControlClient.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleCreateAccessControlClient
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
     * ```
     * @param vaultUrl - the URL of the Key Vault. It should have this shape: `https://${your-key-vault-name}.vault.azure.net`. You should validate that this URL references a valid Key Vault or Managed HSM resource. See https://aka.ms/azsdk/blog/vault-uri for details.
     * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
     * @param options - Options used to configure Key Vault API requests. Omit this parameter to use the default configuration.
     */
    constructor(vaultUrl: string, credential: TokenCredential, options?: AccessControlClientOptions);
    /**
     * Creates a role assignment in an Azure Key Vault.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleCreateRoleAssignment
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
     *
     * const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
     *
     * const principalId = "4871f6a6-374f-4b6b-8b0c-f5d84db823f6";
     * const result = await client.createRoleAssignment(
     *   "/",
     *   "295c179b-9ad3-4117-99cd-b1aa66cf4517",
     *   roleDefinition.id,
     *   principalId,
     * );
     * ```
     * Creates a new role assignment.
     * @param roleScope - The scope of the role assignment.
     * @param name - The name of the role assignment. Must be a UUID.
     * @param roleDefinitionId - The role definition ID used in the role assignment.
     * @param principalId - The principal ID assigned to the role. This maps to the ID inside the Active Directory. It can point to a user, service principal, or security group.
     * @param options - The optional parameters.
     */
    createRoleAssignment(roleScope: KeyVaultRoleScope, name: string, roleDefinitionId: string, principalId: string, options?: CreateRoleAssignmentOptions): Promise<KeyVaultRoleAssignment>;
    /**
     * Deletes role assignments previously created in an Azure Key Vault.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleDeleteRoleAssignment
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
     *
     * const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
     * const principalId = "4871f6a6-374f-4b6b-8b0c-f5d84db823f6";
     *
     * const roleAssignment = await client.createRoleAssignment(
     *   "/",
     *   "295c179b-9ad3-4117-99cd-b1aa66cf4517",
     *   roleDefinition.id,
     *   principalId,
     * );
     *
     * await client.deleteRoleAssignment(roleAssignment.properties.scope, roleAssignment.name);
     * ```
     * Deletes an existing role assignment.
     * @param roleScope - The scope of the role assignment.
     * @param name - The name of the role assignment.
     * @param options - The optional parameters.
     */
    deleteRoleAssignment(roleScope: KeyVaultRoleScope, name: string, options?: DeleteRoleAssignmentOptions): Promise<void>;
    /**
     * Gets a role assignments previously created in an Azure Key Vault.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleGetRoleAssignment
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
     *
     * const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
     * const principalId = "4871f6a6-374f-4b6b-8b0c-f5d84db823f6";
     *
     * let roleAssignment = await client.createRoleAssignment(
     *   "/",
     *   "295c179b-9ad3-4117-99cd-b1aa66cf4517",
     *   roleDefinition.id,
     *   principalId,
     * );
     *
     * roleAssignment = await client.getRoleAssignment(
     *   roleAssignment.properties.scope,
     *   roleAssignment.name,
     * );
     * console.log(roleAssignment);
     * ```
     * Gets an existing role assignment.
     * @param roleScope - The scope of the role assignment.
     * @param name - The name of the role assignment.
     * @param options - The optional parameters.
     */
    getRoleAssignment(roleScope: KeyVaultRoleScope, name: string, options?: GetRoleAssignmentOptions): Promise<KeyVaultRoleAssignment>;
    /**
     * Iterates over all of the available role assignments in an Azure Key Vault.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleListRoleAssignments
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
     *
     * for await (const roleAssignment of client.listRoleAssignments("/")) {
     *   console.log("Role assignment: ", roleAssignment);
     * }
     * ```
     * Lists all of the role assignments in a given scope.
     * @param roleScope - The scope of the role assignments.
     * @param options - The optional parameters.
     */
    listRoleAssignments(roleScope: KeyVaultRoleScope, options?: ListRoleAssignmentsOptions): PagedAsyncIterableIterator<KeyVaultRoleAssignment>;
    /**
     * Iterates over all of the available role definitions in an Azure Key Vault.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleListRoleDefinitions
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
     *
     * for await (const roleDefinitions of client.listRoleDefinitions("/")) {
     *   console.log("Role definition: ", roleDefinitions);
     * }
     * ```
     * Lists all of the role definition in a given scope.
     * @param roleScope - The scope of the role definition.
     * @param options - The optional parameters.
     */
    listRoleDefinitions(roleScope: KeyVaultRoleScope, options?: ListRoleDefinitionsOptions): PagedAsyncIterableIterator<KeyVaultRoleDefinition>;
    /**
     * Gets a role definition from Azure Key Vault.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleGetRoleDefinition
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
     *
     * const roleDefinition = await client.getRoleDefinition("/", "b86a8fe4-44ce-4948-aee5-eccb2c155cd7");
     * console.log(roleDefinition);
     * ```
     * @param roleScope - The scope of the role definition.
     * @param name - The name of the role definition.
     * @param options - The optional parameters.
     */
    getRoleDefinition(roleScope: KeyVaultRoleScope, name: string, options?: GetRoleDefinitionOptions): Promise<KeyVaultRoleDefinition>;
    /**
     * Creates or updates a role definition in an Azure Key Vault.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleSetRoleDefinition
     * import { DefaultAzureCredential } from "@azure/identity";
     * import {
     *   KeyVaultAccessControlClient,
     *   KnownKeyVaultDataAction,
     *   KnownKeyVaultRoleScope,
     * } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
     *
     * const permissions = [{ dataActions: [KnownKeyVaultDataAction.BackupHsmKeys] }];
     * const roleDefinitionName = "23b8bb1a-39c0-4c89-a85b-dd3c99273a8a";
     * const roleDefinition = await client.setRoleDefinition(KnownKeyVaultRoleScope.Global, {
     *   permissions,
     *   roleDefinitionName,
     * });
     * console.log(roleDefinition);
     * ```
     * @param roleScope - The scope of the role definition.
     * @param options - The optional parameters.
     */
    setRoleDefinition(roleScope: KeyVaultRoleScope, options?: SetRoleDefinitionOptions): Promise<KeyVaultRoleDefinition>;
    /**
     * Deletes a custom role definition previously created in an Azure Key Vault.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleDeleteRoleDefinition
     * import { DefaultAzureCredential } from "@azure/identity";
     * import {
     *   KeyVaultAccessControlClient,
     *   KnownKeyVaultDataAction,
     *   KnownKeyVaultRoleScope,
     * } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
     *
     * const permissions = [{ dataActions: [KnownKeyVaultDataAction.BackupHsmKeys] }];
     * const roleDefinitionName = "23b8bb1a-39c0-4c89-a85b-dd3c99273a8a";
     * const roleDefinition = await client.setRoleDefinition(KnownKeyVaultRoleScope.Global, {
     *   permissions,
     *   roleDefinitionName,
     * });
     *
     * await client.deleteRoleDefinition("/", roleDefinition.name);
     * ```
     * @param roleScope - The scope of the role definition.
     * @param name - The name of the role definition to delete.
     * @param options - The optional parameters.
     */
    deleteRoleDefinition(roleScope: KeyVaultRoleScope, name: string, options?: DeleteRoleDefinitionOptions): Promise<void>;
}
//# sourceMappingURL=accessControlClient.d.ts.map