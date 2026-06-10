// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a specified workspace.
 *
 * @summary deletes a specified workspace.
 * x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_Delete.json
 */
async function deleteAWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  await client.workspaces.delete("testRG", "workspace1");
}

async function main() {
  await deleteAWorkspace();
}

main().catch(console.error);
