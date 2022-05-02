// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how create a role assignment
 *
 * @summary creates a role assignment
 */

const AccessControl = require("@azure-rest/synapse-access-control").default;
const { DefaultAzureCredential } = require("@azure/identity");
const { v4 } = require("uuid");
require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  const client = AccessControl(endpoint, new DefaultAzureCredential());
  const roleAssignmentId = v4();
  // Id of the principal to give aassing the tole to.
  const principalId = "<principal id>";
  // Id of the role to assing
  const roleId = "<role id>";
  // Workspace scope
  const scope = "workspaces/<worskpaceName>";

  const result = await client
    .path("/roleAssignments/{roleAssignmentId}", roleAssignmentId)
    .put({ body: { principalId, roleId, scope } });

  if (result.status !== "200") {
    throw result.body.error;
  }

  console.log(`Created Role Assignment: ${result.body.id}`);
}

main().catch(console.error);
