// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  KeyVaultAccessControlClient,
  KeyVaultBackupClient,
  KeyVaultEkmClient,
  KeyVaultSettingsClient,
  KnownKeyVaultDataAction,
  KnownKeyVaultRoleScope,
} from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateAccessControlClient", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
  });

  it("ReadmeSampleCreateBackupClient", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultBackupClient(vaultUrl, credentials);
  });

  it("ReadmeSampleCreateSettingsClient", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultSettingsClient(vaultUrl, credentials);
  });

  it("ReadmeSampleCreateEkmClient", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.managedhsm.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultEkmClient(vaultUrl, credentials);
  });

  it("ReadmeSampleManageEkmPrivateEndpoint", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.managedhsm.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultEkmClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    // Private endpoint names must not be longer than 24 characters.
    const peName = "ekm-sample-pe";
    const privateLinkServiceId = "<private-link-service-id>";
    // @ts-preserve-whitespace
    const createPoller = client.createEkmPrivateEndpoint(peName, { privateLinkServiceId });
    const createOperation = await createPoller.pollUntilDone();
    console.log("Create status:", createOperation.status);
    // @ts-preserve-whitespace
    const privateEndpoint = await client.getEkmPrivateEndpoint(peName);
    console.log("Connection status:", privateEndpoint.privateLinkServiceConnectionState?.status);
    // @ts-preserve-whitespace
    const privateEndpoints = await client.listEkmPrivateEndpoints();
    for (const endpoint of privateEndpoints.value ?? []) {
      console.log("Private endpoint:", endpoint.name);
    }
    // @ts-preserve-whitespace
    const deletePoller = client.deleteEkmPrivateEndpoint(peName);
    await deletePoller.pollUntilDone();
  });

  it("ReadmeSampleCreateRoleAssignment", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
    // @ts-preserve-whitespace
    const principalId = "4871f6a6-374f-4b6b-8b0c-f5d84db823f6";
    const result = await client.createRoleAssignment(
      "/",
      "295c179b-9ad3-4117-99cd-b1aa66cf4517",
      roleDefinition.id,
      principalId,
    );
  });

  it("ReadmeSampleDeleteRoleAssignment", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
    const principalId = "4871f6a6-374f-4b6b-8b0c-f5d84db823f6";
    // @ts-preserve-whitespace
    const roleAssignment = await client.createRoleAssignment(
      "/",
      "295c179b-9ad3-4117-99cd-b1aa66cf4517",
      roleDefinition.id,
      principalId,
    );
    // @ts-preserve-whitespace
    await client.deleteRoleAssignment(roleAssignment.properties.scope, roleAssignment.name);
  });

  it("ReadmeSampleGetRoleAssignment", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
    const principalId = "4871f6a6-374f-4b6b-8b0c-f5d84db823f6";
    // @ts-preserve-whitespace
    let roleAssignment = await client.createRoleAssignment(
      "/",
      "295c179b-9ad3-4117-99cd-b1aa66cf4517",
      roleDefinition.id,
      principalId,
    );
    // @ts-preserve-whitespace
    roleAssignment = await client.getRoleAssignment(
      roleAssignment.properties.scope,
      roleAssignment.name,
    );
    console.log(roleAssignment);
  });

  it("ReadmeSampleListRoleAssignments", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    for await (const roleAssignment of client.listRoleAssignments("/")) {
      console.log("Role assignment: ", roleAssignment);
    }
  });

  it("ReadmeSampleListRoleDefinitions", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    for await (const roleDefinitions of client.listRoleDefinitions("/")) {
      console.log("Role definition: ", roleDefinitions);
    }
  });

  it("ReadmeSampleGetRoleDefinition", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const roleDefinition = await client.getRoleDefinition(
      "/",
      "b86a8fe4-44ce-4948-aee5-eccb2c155cd7",
    );
    console.log(roleDefinition);
  });

  it("ReadmeSampleSetRoleDefinition", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const permissions = [{ dataActions: [KnownKeyVaultDataAction.BackupHsmKeys] }];
    const roleDefinitionName = "23b8bb1a-39c0-4c89-a85b-dd3c99273a8a";
    const roleDefinition = await client.setRoleDefinition(KnownKeyVaultRoleScope.Global, {
      permissions,
      roleDefinitionName,
    });
    console.log(roleDefinition);
  });

  it("ReadmeSampleDeleteRoleDefinition", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultAccessControlClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const permissions = [{ dataActions: [KnownKeyVaultDataAction.BackupHsmKeys] }];
    const roleDefinitionName = "23b8bb1a-39c0-4c89-a85b-dd3c99273a8a";
    const roleDefinition = await client.setRoleDefinition(KnownKeyVaultRoleScope.Global, {
      permissions,
      roleDefinitionName,
    });
    // @ts-preserve-whitespace
    await client.deleteRoleDefinition("/", roleDefinition.name);
  });

  it("ReadmeSampleBeginPreBackup_SAS", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultBackupClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
    const sasToken = "<sas-token>";
    const poller = await client.beginPreBackup(blobStorageUri, sasToken);
    // @ts-preserve-whitespace
    // Serializing the poller
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginPreBackup(blobStorageUri, sasToken, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    const result = await poller.pollUntilDone();
    console.log(result);
  });

  it("ReadmeSampleBeginPreBackup_NonSAS", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultBackupClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
    const poller = await client.beginPreBackup(blobStorageUri);
    // @ts-preserve-whitespace
    // Serializing the poller
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginPreBackup(blobStorageUri, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    const result = await poller.pollUntilDone();
    console.log(result);
  });

  it("ReadmeSampleBeginBackup_SAS", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultBackupClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
    const sasToken = "<sas-token>";
    const poller = await client.beginBackup(blobStorageUri, sasToken);
    // @ts-preserve-whitespace
    // Serializing the poller
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginBackup(blobStorageUri, sasToken, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    const backupUri = await poller.pollUntilDone();
    console.log(backupUri);
  });

  it("ReadmeSampleBeginBackup_NonSAS", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultBackupClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
    const poller = await client.beginBackup(blobStorageUri);
    // @ts-preserve-whitespace
    // Serializing the poller
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginBackup(blobStorageUri, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    const backupUri = await poller.pollUntilDone();
    console.log(backupUri);
  });

  it("ReadmeSampleBeginRestore_SAS", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultBackupClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
    const sasToken = "<sas-token>";
    const poller = await client.beginRestore(blobStorageUri, sasToken);
    // @ts-preserve-whitespace
    // The poller can be serialized with:
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginRestore(blobStorageUri, sasToken, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    const backupUri = await poller.pollUntilDone();
    console.log(backupUri);
  });

  it("ReadmeSampleBeginRestore_NonSAS", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultBackupClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
    const poller = await client.beginRestore(blobStorageUri);
    // @ts-preserve-whitespace
    // The poller can be serialized with:
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginRestore(blobStorageUri, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    await poller.pollUntilDone();
  });

  it("ReadmeSampleBeginPreRestore_SAS", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultBackupClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
    const sasToken = "<sas-token>";
    const poller = await client.beginPreRestore(blobStorageUri, sasToken);
    // @ts-preserve-whitespace
    // The poller can be serialized with:
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginPreRestore(blobStorageUri, sasToken, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    await poller.pollUntilDone();
  });

  it("ReadmeSampleBeginPreRestore_NonSAS", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultBackupClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
    const poller = await client.beginPreRestore(blobStorageUri);
    // @ts-preserve-whitespace
    // The poller can be serialized with:
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginPreRestore(blobStorageUri, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    await poller.pollUntilDone();
  });

  it("ReadmeSampleBeginSelectiveKeyRestore_SAS", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultBackupClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const blobStorageUri = "<blob-storage-uri>";
    const sasToken = "<sas-token>";
    const keyName = "<key-name>";
    const poller = await client.beginSelectiveKeyRestore(keyName, blobStorageUri, sasToken);
    // @ts-preserve-whitespace
    // Serializing the poller
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginSelectiveKeyRestore(keyName, blobStorageUri, sasToken, {
      resumeFrom: serialized,
    });
    // @ts-preserve-whitespace
    // Waiting until it's done
    await poller.pollUntilDone();
  });

  it("ReadmeSampleBeginSelectiveKeyRestore_NonSAS", async () => {
    const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultBackupClient(vaultUrl, credentials);
    // @ts-preserve-whitespace
    const blobStorageUri = "<blob-storage-uri>";
    const keyName = "<key-name>";
    const poller = await client.beginSelectiveKeyRestore(keyName, blobStorageUri);
    // @ts-preserve-whitespace
    // Serializing the poller
    const serialized = poller.toString();
    // @ts-preserve-whitespace
    // A new poller can be created with:
    await client.beginSelectiveKeyRestore(keyName, blobStorageUri, { resumeFrom: serialized });
    // @ts-preserve-whitespace
    // Waiting until it's done
    await poller.pollUntilDone();
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
