// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve an alert rule status.
 *
 * @summary retrieve an alert rule status.
 * x-ms-original-file: 2024-03-01-preview/getMetricAlertStatusByName.json
 */
async function getAnAlertRuleStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "009f6022-67ec-423e-9aa7-691182870588";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metricAlertsStatus.listByName(
    "EastUs",
    "custom1",
    "cmVzb3VyY2VJZD0vc3Vic2NyaXB0aW9ucy8xNGRkZjBjNS03N2M1LTRiNTMtODRmNi1lMWZhNDNhZDY4ZjcvcmVzb3VyY2VHcm91cHMvZ2lndGVzdC9wcm92aWRlcnMvTWljcm9zb2Z0LkNvbXB1dGUvdmlydHVhbE1hY2hpbmVzL2dpZ3dhZG1l",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAnAlertRuleStatus();
}

main().catch(console.error);
