// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the properties of the specified workspace.
 *
 * @summary gets the properties of the specified workspace.
 * x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_Get.json
 */
async function getWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("testRG", "workspace1");
  console.log(result);
}

async function main() {
  await getWorkspace();
}

main().catch(console.error);
