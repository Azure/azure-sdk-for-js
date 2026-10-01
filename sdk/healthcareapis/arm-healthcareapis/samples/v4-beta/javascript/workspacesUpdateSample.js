// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch workspace details.
 *
 * @summary patch workspace details.
 * x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_Patch.json
 */
async function updateAWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.workspaces.update("testRG", "workspace1", {
    tags: { tagKey: "tagValue" },
  });
  console.log(result);
}

async function main() {
  await updateAWorkspace();
}

main().catch(console.error);
