// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the alerts that are associated with the resource group that are stored in a specific location
 *
 * @summary list all the alerts that are associated with the resource group that are stored in a specific location
 * x-ms-original-file: 2022-01-01/Alerts/GetAlertsResourceGroupLocation_example.json
 */
async function getSecurityAlertsOnAResourceGroupFromASecurityDataLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alerts.listResourceGroupLevelByRegion("myRg1", "westeurope")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getSecurityAlertsOnAResourceGroupFromASecurityDataLocation();
}

main().catch(console.error);
