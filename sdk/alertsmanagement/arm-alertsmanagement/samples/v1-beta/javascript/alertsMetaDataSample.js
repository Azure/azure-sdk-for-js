// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AlertsManagementClient } = require("@azure/arm-alertsmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list alerts meta data information based on value of identifier parameter.
 *
 * @summary list alerts meta data information based on value of identifier parameter.
 * x-ms-original-file: 2025-05-25-preview/AlertsMetaData_MonitorService.json
 */
async function monService() {
  const credential = new DefaultAzureCredential();
  const client = new AlertsManagementClient(credential);
  const result = await client.alerts.metaData("MonitorServiceList");
  console.log(result);
}

async function main() {
  await monService();
}

main().catch(console.error);
