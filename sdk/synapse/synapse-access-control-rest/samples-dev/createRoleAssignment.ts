// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how create a role assignment
 *
 * @summary creates a role assignment
 * @azsdk-weight 10
 */

import AccessControl, { isUnexpected } from "@azure-rest/synapse-access-control";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "@azure/core-util";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";

async function main(): Promise<void> {
  const client = AccessControl(endpoint, new DefaultAzureCredential());
  const roleAssignmentId = randomUUID();
  // Id of the principal to give aassing the tole to.
  const principalId = "<principal id>";
  // Id of the role to assing
  const roleId = "<role id>";
  // Workspace scope
  const scope = "workspaces/<worskpaceName>";

  const result = await client
    .path("/roleAssignments/{roleAssignmentId}", roleAssignmentId)
    .put({ body: { principalId, roleId, scope } });

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  console.log(`Created Role Assignment: ${result.body.id}`);
}

main().catch(console.error);
