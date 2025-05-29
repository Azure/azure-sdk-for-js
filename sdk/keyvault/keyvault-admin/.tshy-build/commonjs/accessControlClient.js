"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyVaultAccessControlClient = void 0;
const mappings_js_1 = require("./mappings.js");
const tracing_js_1 = require("./tracing.js");
const core_util_1 = require("@azure/core-util");
const createKeyVaultClient_js_1 = require("./createKeyVaultClient.js");
/**
 * The KeyVaultAccessControlClient provides methods to manage
 * access control and role assignments in any given Azure Key Vault instance.
 * The client supports creating, retrieving and deleting roles.
 */
class KeyVaultAccessControlClient {
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
    constructor(vaultUrl, credential, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        this.vaultUrl = vaultUrl;
        this.client = (0, createKeyVaultClient_js_1.createKeyVaultClient)(vaultUrl, credential, options);
    }
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
    createRoleAssignment(roleScope, name, roleDefinitionId, principalId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("KeyVaultAccessControlClient.createRoleAssignment", options, async (updatedOptions) => {
            const response = await this.client.roleAssignments.create(roleScope, name, {
                properties: {
                    roleDefinitionId,
                    principalId,
                },
            }, updatedOptions);
            return mappings_js_1.mappings.roleAssignment.generatedToPublic(response);
        });
    }
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
    deleteRoleAssignment(roleScope, name, options = {}) {
        return tracing_js_1.tracingClient.withSpan("KeyVaultAccessControlClient.deleteRoleAssignment", options, async (updatedOptions) => {
            try {
                await this.client.roleAssignments.delete(roleScope, name, updatedOptions);
            }
            catch (err) {
                // If the role assignment doesn't exist, we can consider it deleted.
                if (err.statusCode !== 404) {
                    throw err;
                }
            }
        });
    }
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
    getRoleAssignment(roleScope, name, options = {}) {
        return tracing_js_1.tracingClient.withSpan("KeyVaultAccessControlClient.getRoleAssignment", options, async (updatedOptions) => {
            const response = await this.client.roleAssignments.get(roleScope, name, updatedOptions);
            return mappings_js_1.mappings.roleAssignment.generatedToPublic(response);
        });
    }
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
    listRoleAssignments(roleScope, options = {}) {
        return (0, mappings_js_1.mapPagedAsyncIterable)(options, (mappedOptions) => this.client.roleAssignments.listForScope(roleScope, mappedOptions), mappings_js_1.mappings.roleAssignment.generatedToPublic);
    }
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
    listRoleDefinitions(roleScope, options = {}) {
        return (0, mappings_js_1.mapPagedAsyncIterable)(options, (mappedOptions) => this.client.roleDefinitions.list(roleScope, mappedOptions), mappings_js_1.mappings.roleDefinition.generatedToPublic);
    }
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
    getRoleDefinition(roleScope, name, options = {}) {
        return tracing_js_1.tracingClient.withSpan("KeyVaultAccessControlClient.getRoleDefinition", options, async (updatedOptions) => {
            const response = await this.client.roleDefinitions.get(roleScope, name, updatedOptions);
            return mappings_js_1.mappings.roleDefinition.generatedToPublic(response);
        });
    }
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
    setRoleDefinition(roleScope, options = {}) {
        return tracing_js_1.tracingClient.withSpan("KeyVaultAccessControlClient.setRoleDefinition", options, async (updatedOptions) => {
            const response = await this.client.roleDefinitions.createOrUpdate(roleScope, options.roleDefinitionName || (0, core_util_1.randomUUID)(), {
                properties: {
                    description: options.description,
                    permissions: options.permissions,
                    assignableScopes: [roleScope],
                    roleName: options.roleName,
                    roleType: "CustomRole",
                },
            }, updatedOptions);
            return mappings_js_1.mappings.roleDefinition.generatedToPublic(response);
        });
    }
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
    deleteRoleDefinition(roleScope, name, options = {}) {
        return tracing_js_1.tracingClient.withSpan("KeyVaultAccessControlClient.deleteRoleDefinition", options, async (updatedOptions) => {
            try {
                await this.client.roleDefinitions.delete(roleScope, name, updatedOptions);
            }
            catch (err) {
                // If the role definition doesn't exist, we can consider it deleted.
                if (err.statusCode !== 404) {
                    throw err;
                }
            }
        });
    }
}
exports.KeyVaultAccessControlClient = KeyVaultAccessControlClient;
//# sourceMappingURL=accessControlClient.js.map