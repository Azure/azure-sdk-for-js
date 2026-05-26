// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the data export instances within a workspace.
 *
 * @summary lists the data export instances within a workspace.
 * x-ms-original-file: 2025-07-01/DataExportListByWorkspace.json
 */
async function dataExportGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataExports.listByWorkspace("RgTest1", "DeWnTest1234")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await dataExportGet();
}

main().catch(console.error);
