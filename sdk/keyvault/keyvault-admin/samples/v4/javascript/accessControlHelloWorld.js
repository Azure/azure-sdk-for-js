// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses an AccessControlClient to list, create, and assign roles to users.
 */

// Load the .env file if it exists
require("dotenv/config");
const { randomUUID } = require("@azure/core-util");
const { DefaultAzureCredential } = require("@azure/identity");
const {
  KeyVaultAccessControlClient,
  KnownKeyVaultDataAction,
  KnownKeyVaultRoleScope,
} = require("@azure/keyvault-admin");
let client;

async function listRoleAssignments() {
  for await (const roleAssignment of client.listRoleAssignments("/")) {
    console.log("Role assignment: ", roleAssignment);
  }
}

async function listRoleDefinitions() {
  for await (const roleDefinition of client.listRoleDefinitions("/")) {
    console.log("Role definition: ", roleDefinition);
  }
}

async function getRoleDefinition() {
  const { value: firstRoleDefinition } = await client.listRoleDefinitions("/").next();
  const roleDefinition = await client.getRoleDefinition("/", firstRoleDefinition.name);
  console.log(roleDefinition);
}

async function setRoleDefinition() {
  const permissions = [{ dataActions: [KnownKeyVaultDataAction.BackupHsmKeys] }];
  const roleDefinitionName = randomUUID();
  const roleDefinition = await client.setRoleDefinition(KnownKeyVaultRoleScope.Global, {
    permissions,
    roleDefinitionName,
    roleName: "Backup Manager",
  });
  console.log(roleDefinition);

  await client.deleteRoleDefinition("/", roleDefinition.name);
}

async function deleteRoleDefinition() {
  const permissions = [{ dataActions: [KnownKeyVaultDataAction.BackupHsmKeys] }];
  const roleDefinitionName = randomUUID();
  const roleDefinition = await client.setRoleDefinition(KnownKeyVaultRoleScope.Global, {
    permissions,
    roleDefinitionName,
    roleName: "Backup Manager",
  });

  await client.deleteRoleDefinition("/", roleDefinition.name);
}

async function createRoleAssignment() {
  const { value: roleDefinition } = await client.listRoleDefinitions("/").next();

  const principalId = process.env["CLIENT_OBJECT_ID"] || "<client-object-id>";
  const result = await client.createRoleAssignment(
    "/",
    randomUUID(),
    roleDefinition.id,
    principalId,
  );

  await client.deleteRoleAssignment("/", result.name);
}

async function getRoleAssignment() {
  const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
  const principalId = process.env["CLIENT_OBJECT_ID"] || "<client-object-id>";

  let roleAssignment = await client.createRoleAssignment(
    "/",
    randomUUID(),
    roleDefinition.id,
    principalId,
  );

  roleAssignment = await client.getRoleAssignment(
    roleAssignment.properties.scope,
    roleAssignment.name,
  );
  console.log(roleAssignment);

  await client.deleteRoleAssignment("/", roleAssignment.name);
}

async function deleteRoleAssignment() {
  const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
  const principalId = process.env["CLIENT_OBJECT_ID"] || "<client-object-id>";

  const roleAssignment = await client.createRoleAssignment(
    "/",
    randomUUID(),
    roleDefinition.id,
    principalId,
  );

  await client.deleteRoleAssignment(roleAssignment.properties.scope, roleAssignment.name);
}

async function createAndManageRoleDefinitionIntegration() {
  const globalScope = KnownKeyVaultRoleScope.Global;
  const roleDefinitionName = randomUUID();
  const permissions = [
    {
      dataActions: [
        KnownKeyVaultDataAction.StartHsmBackup,
        KnownKeyVaultDataAction.StartHsmRestore,
      ],
    },
  ];
  const roleDefinition = await client.setRoleDefinition(globalScope, {
    roleDefinitionName,
    roleName: "Backup Manager",
    permissions,
    description: "Allow backup actions",
  });
  console.log(roleDefinition);
  // Clean up the role definition
  await client.deleteRoleDefinition(globalScope, roleDefinition.name);
}

async function createAndDeleteRoleAssignmentIntegration() {
  const globalScope = KnownKeyVaultRoleScope.Global;
  // First create a role definition to assign
  const roleDefinitionName = randomUUID();
  const permissions = [
    {
      dataActions: [
        KnownKeyVaultDataAction.StartHsmBackup,
        KnownKeyVaultDataAction.StartHsmRestore,
      ],
    },
  ];
  const roleDefinition = await client.setRoleDefinition(globalScope, {
    roleDefinitionName,
    roleName: "Backup Manager",
    permissions,
    description: "Allow backup actions",
  });
  // This sample uses a custom role but you may assign one of the many built-in roles.
  // Please refer to https://learn.microsoft.com/azure/key-vault/managed-hsm/built-in-roles for more information.
  const roleAssignmentName = randomUUID();
  const clientObjectId = process.env["CLIENT_OBJECT_ID"] || "<client-object-id>";
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

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  client = new KeyVaultAccessControlClient(
    process.env["AZURE_MANAGEDHSM_URI"] || "<managedhsm-url>",
    new DefaultAzureCredential(),
  );
  await listRoleAssignments();
  await listRoleDefinitions();
  await getRoleDefinition();
  await setRoleDefinition();
  await deleteRoleDefinition();
  await createRoleAssignment();
  await getRoleAssignment();
  await deleteRoleAssignment();
  await createAndManageRoleDefinitionIntegration();
  await createAndDeleteRoleAssignmentIntegration();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
