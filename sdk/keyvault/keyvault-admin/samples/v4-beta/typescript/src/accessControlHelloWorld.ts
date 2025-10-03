// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses an AccessControlClient to list, create, and assign roles to users.
 */

import {
  KeyVaultAccessControlClient,
  KeyVaultPermission,
  KnownKeyVaultDataAction,
  KnownKeyVaultRoleScope,
} from "@azure/keyvault-admin";
import { DefaultAzureCredential } from "@azure/identity";
import * as uuid from "uuid";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
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
  const permissions: KeyVaultPermission[] = [
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
  // Please refer to https://learn.microsoft.com/azure/key-vault/managed-hsm/built-in-roles for more information.
  const roleAssignmentName = uuid.v4();
  const clientObjectId = process.env["CLIENT_OBJECT_ID"];
  if (!clientObjectId) {
    throw new Error("Missing environment variable CLIENT_OBJECT_ID.");
  }
  let assignment = await client.createRoleAssignment(
    globalScope,
    roleAssignmentName,
    roleDefinition.id,
    clientObjectId,
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
