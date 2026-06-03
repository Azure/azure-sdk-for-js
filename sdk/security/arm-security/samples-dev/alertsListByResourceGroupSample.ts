// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the alerts that are associated with the resource group
 *
 * @summary list all the alerts that are associated with the resource group
 * x-ms-original-file: 2022-01-01/Alerts/GetAlertsResourceGroup_example.json
 */
async function getSecurityAlertsOnAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alerts.listByResourceGroup("myRg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getSecurityAlertsOnAResourceGroup();
}

main().catch(console.error);
