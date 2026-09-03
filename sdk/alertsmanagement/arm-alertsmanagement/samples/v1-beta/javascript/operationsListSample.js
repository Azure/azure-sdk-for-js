// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AlertsManagementClient } = require("@azure/arm-alertsmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all operations available through Azure Alerts Management Resource Provider.
 *
 * @summary list all operations available through Azure Alerts Management Resource Provider.
 * x-ms-original-file: 2025-05-25-preview/Operations_List.json
 */
async function listOperations() {
  const credential = new DefaultAzureCredential();
  const client = new AlertsManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOperations();
}

main().catch(console.error);
