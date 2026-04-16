// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a network security perimeter configuration.
 *
 * @summary Gets a network security perimeter configuration.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/NSPForWorkspaces_Get.json
 */
async function getNspConfigByNameForScheduledQueryRule() {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "exampleRG";
  const workspaceName = "someWorkspace";
  const networkSecurityPerimeterConfigurationName = "somePerimeterConfiguration";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.workspaces.getNSP(
    resourceGroupName,
    workspaceName,
    networkSecurityPerimeterConfigurationName,
  );
  console.log(result);
}

async function main() {
  await getNspConfigByNameForScheduledQueryRule();
}

main().catch(console.error);
