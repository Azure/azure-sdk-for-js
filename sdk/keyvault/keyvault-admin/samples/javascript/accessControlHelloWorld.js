// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { KeyVaultAccessControlClient } = require("@azure/keyvault-admin");
const { DefaultAzureCredential } = require("@azure/identity");
const uuid = require("uuid");
const uuidv4 = uuid.v4;

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  // - BLOB_STORAGE_URI: URI of the Blob Storage instance, with the name of the container where the Key Vault backups will be generated
  // - BLOB_STORAGE_SAS_TOKEN: URI of the Blob Storage instance, with the name of the container where the Key Vault backups will be generated
  // - CLIENT_OBJECT_ID: Object ID of the application, tenant or principal to whom the role will be assigned to
  const credential = new DefaultAzureCredential();
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const client = new KeyVaultAccessControlClient(url, credential);

  for await (const roleAssignment of client.listRoleAssignments("/")) {
    console.log(roleAssignment);
  }

  const globalScope = "/";
  const roleDefinition = (await client.listRoleDefinitions(globalScope).next()).value;

  const roleAssignmentName = uuidv4();
  let assignment = await client.createRoleAssignment(
    globalScope,
    roleAssignmentName,
    roleDefinition.id,
    process.env["CLIENT_OBJECT_ID"]
  );
  console.log(assignment);

  assignment = await client.getRoleAssignment(globalScope, roleAssignmentName);
  console.log(assignment);

  assignment = await client.deleteRoleAssignment(globalScope, roleAssignmentName);
  console.log(assignment);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
