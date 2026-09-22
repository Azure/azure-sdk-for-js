// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the alerts that are associated with the subscription
 *
 * @summary list all the alerts that are associated with the subscription
 * x-ms-original-file: 2022-01-01/Alerts/GetAlertsSubscription_example.json
 */
async function getSecurityAlertsOnASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alerts.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getSecurityAlertsOnASubscription();
}

main().catch(console.error);
