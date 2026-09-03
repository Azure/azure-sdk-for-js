// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a network security perimeter configuration.
 *
 * @summary gets a network security perimeter configuration.
 * x-ms-original-file: 2025-07-01/NSPForWorkspaces_Get.json
 */
async function getNSPConfigByNameForScheduledQueryRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.workspaces.getNSP(
    "exampleRG",
    "someWorkspace",
    "somePerimeterConfiguration",
  );
  console.log(result);
}

async function main() {
  await getNSPConfigByNameForScheduledQueryRule();
}

main().catch(console.error);
