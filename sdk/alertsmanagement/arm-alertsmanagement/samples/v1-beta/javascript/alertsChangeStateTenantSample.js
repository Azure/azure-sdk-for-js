// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AlertsManagementClient } = require("@azure/arm-alertsmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to change the state of an alert.
 *
 * @summary change the state of an alert.
 * x-ms-original-file: 2025-05-25-preview/Alerts_ChangeStateTenant.json
 */
async function resolve() {
  const credential = new DefaultAzureCredential();
  const client = new AlertsManagementClient(credential);
  const result = await client.alerts.changeStateTenant(
    "66114d64-d9d9-478b-95c9-b789d6502100",
    "Acknowledged",
    { comment: {} },
  );
  console.log(result);
}

async function main() {
  await resolve();
}

main().catch(console.error);
