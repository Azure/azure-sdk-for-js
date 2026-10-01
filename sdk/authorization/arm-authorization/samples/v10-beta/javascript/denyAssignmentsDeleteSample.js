// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a deny assignment by scope and name.
 *
 * @summary delete a deny assignment by scope and name.
 * x-ms-original-file: 2024-07-01-preview/DenyAssignments_Delete.json
 */
async function deleteDenyAssignment() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.denyAssignments.delete(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2",
    "64b75d79-7a26-4341-944e-4f1a19f0e6ca",
  );
}

async function main() {
  await deleteDenyAssignment();
}

main().catch(console.error);
