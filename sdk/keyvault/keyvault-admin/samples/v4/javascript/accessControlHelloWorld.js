// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Uses an AccessControlClient to list, create, and assign roles to users.
 */

const {
  KeyVaultAccessControlClient,
  KnownKeyVaultDataAction,
  KnownKeyVaultRoleScope,
} = require("@azure/keyvault-admin");
const { DefaultAzureCredential } = require("@azure/identity");
const uuid = require("uuid");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();
  const url = process.env["AZURE_MANAGEDHSM_URI"];
  if (!url) {
    throw new Error("Missing environment variable AZURE_MANAGEDHSM_URI.");
  }
  const client = new KeyVaultAccessControlClient(url, credential);

  for await (const roleAssignment of client.listRoleAssignments("/")) {
    console.log(roleAssignment);
  }

  const globalScope = KnownKeyVaultRoleScope.Global;
  const roleDefinitionName = uuid.v4();
  const permissions = [
    {
      dataActions: [
        KnownKeyVaultDataAction.StartHsmBackup,
        KnownKeyVaultDataAction.StartHsmRestore,
      ],
    },
  ];
  let roleDefinition = await client.setRoleDefinition(globalScope, {
    roleDefinitionName,
    roleName: "Backup Manager",
    permissions,
    description: "Allow backup actions",
  });
  console.log(roleDefinition);

  // This sample uses a custom role but you may assign one of the many built-in roles.
  // Please refer to https://docs.microsoft.com/azure/key-vault/managed-hsm/built-in-roles for more information.
  const roleAssignmentName = uuid.v4();
  const clientObjectId = process.env["CLIENT_OBJECT_ID"];
  if (!clientObjectId) {
    throw new Error("Missing environment variable CLIENT_OBJECT_ID.");
  }
  let assignment = await client.createRoleAssignment(
    globalScope,
    roleAssignmentName,
    roleDefinition.id,
    clientObjectId
  );
  console.log(assignment);

  assignment = await client.getRoleAssignment(globalScope, roleAssignmentName);
  console.log(assignment);

  await client.deleteRoleAssignment(globalScope, roleAssignmentName);

  await client.deleteRoleDefinition(globalScope, roleDefinition.name);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});

module.exports = { main };
