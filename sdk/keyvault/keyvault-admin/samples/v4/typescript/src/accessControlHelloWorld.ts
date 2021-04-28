// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Uses an AccessControlClient to list, create, and assign roles to users.
 */
import { KeyVaultAccessControlClient, KeyVaultPermission } from "@azure/keyvault-admin";
import { DefaultAzureCredential } from "@azure/identity";
import * as uuid from "uuid";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
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

  const globalScope = "/";

  const roleDefinitionName = uuid.v4();
  const permissions: KeyVaultPermission[] = [
    {
      dataActions: [
        "Microsoft.KeyVault/managedHsm/backup/start/action",
        "Microsoft.KeyVault/managedHsm/backup/status/action"
      ]
    }
  ];
  let roleDefinition = await client.upsertRoleDefinition(
    globalScope,
    roleDefinitionName,
    permissions,
    "Allow backup actions"
  );
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

  assignment = await client.deleteRoleAssignment(globalScope, roleAssignmentName);
  console.log(assignment);

  roleDefinition = await client.deleteRoleDefinition(globalScope, roleDefinition.name);
  console.log(roleDefinition);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
