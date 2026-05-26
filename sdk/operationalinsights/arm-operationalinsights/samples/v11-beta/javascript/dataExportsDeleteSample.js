// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified data export in a given workspace..
 *
 * @summary deletes the specified data export in a given workspace..
 * x-ms-original-file: 2025-07-01/DataExportDelete.json
 */
async function dataExportDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.dataExports.delete("RgTest1", "DeWnTest1234", "export1");
}

async function main() {
  await dataExportDelete();
}

main().catch(console.error);
