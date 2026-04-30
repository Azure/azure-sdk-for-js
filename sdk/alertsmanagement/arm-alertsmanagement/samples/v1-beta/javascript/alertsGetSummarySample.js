// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AlertsManagementClient } = require("@azure/arm-alertsmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a summarized count of your alerts grouped by various parameters (e.g. grouping by 'Severity' returns the count of alerts for each severity).
 *
 * @summary get a summarized count of your alerts grouped by various parameters (e.g. grouping by 'Severity' returns the count of alerts for each severity).
 * x-ms-original-file: 2025-05-25-preview/Alerts_Summary.json
 */
async function summary() {
  const credential = new DefaultAzureCredential();
  const client = new AlertsManagementClient(credential);
  const result = await client.alerts.getSummary(
    "subscriptions/1e3ff1c0-771a-4119-a03b-be82a51e232d",
    "severity,alertState",
  );
  console.log(result);
}

async function main() {
  await summary();
}

main().catch(console.error);
