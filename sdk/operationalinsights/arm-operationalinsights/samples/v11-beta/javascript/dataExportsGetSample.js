// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a data export instance.
 *
 * @summary gets a data export instance.
 * x-ms-original-file: 2025-07-01/DataExportGet.json
 */
async function dataExportGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.dataExports.get("RgTest1", "DeWnTest1234", "export1");
  console.log(result);
}

async function main() {
  await dataExportGet();
}

main().catch(console.error);
