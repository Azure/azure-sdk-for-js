// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a new metric configuration for a role.
 *
 * @summary deletes a new metric configuration for a role.
 * x-ms-original-file: 2023-12-01/DeleteMonitoringConfig.json
 */
async function deleteMonitoringConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.monitoringConfig.delete("testedgedevice", "testrole", "GroupForEdgeAutomation");
}

async function main() {
  await deleteMonitoringConfig();
}

main().catch(console.error);
