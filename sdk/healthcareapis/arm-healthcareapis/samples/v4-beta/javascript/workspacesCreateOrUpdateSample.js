// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a workspace resource with the specified parameters.
 *
 * @summary creates or updates a workspace resource with the specified parameters.
 * x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_Create.json
 */
async function createOrUpdateAWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("testRG", "workspace1", {
    location: "westus",
    properties: {},
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAWorkspace();
}

main().catch(console.error);
