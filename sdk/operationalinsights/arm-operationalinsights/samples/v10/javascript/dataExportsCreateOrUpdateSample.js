// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update a data export.
 *
 * @summary Create or update a data export.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/DataExportCreateOrUpdate.json
 */
async function dataExportCreate() {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-00000000000";
  const resourceGroupName = process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "RgTest1";
  const workspaceName = "DeWnTest1234";
  const dataExportName = "export1";
  const parameters = {
    resourceId:
      "/subscriptions/192b9f85-a39a-4276-b96d-d5cd351703f9/resourceGroups/OIAutoRest1234/providers/Microsoft.EventHub/namespaces/test",
    tableNames: ["Heartbeat"],
  };
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.dataExports.createOrUpdate(
    resourceGroupName,
    workspaceName,
    dataExportName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await dataExportCreate();
}

main().catch(console.error);
