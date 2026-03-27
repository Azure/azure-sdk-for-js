// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AlertsManagementClient } = require("@azure/arm-alertsmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all existing alerts, where the results can be filtered on the basis of multiple parameters (e.g. time range). The results can then be sorted on the basis specific fields, with the default being lastModifiedDateTime.
 *
 * @summary list all existing alerts, where the results can be filtered on the basis of multiple parameters (e.g. time range). The results can then be sorted on the basis specific fields, with the default being lastModifiedDateTime.
 * x-ms-original-file: 2025-05-25-preview/Alerts_List.json
 */
async function listAlerts() {
  const credential = new DefaultAzureCredential();
  const client = new AlertsManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.alerts.getAll(
    "subscriptions/3b540246-808d-4331-99aa-917b808a9166",
    { includeContext: true },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAlerts();
}

main().catch(console.error);
