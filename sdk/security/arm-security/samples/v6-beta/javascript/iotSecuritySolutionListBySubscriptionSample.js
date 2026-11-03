// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to use this method to get the list of IoT Security solutions by subscription.
 *
 * @summary use this method to get the list of IoT Security solutions by subscription.
 * x-ms-original-file: 2019-08-01/IoTSecuritySolutions/GetIoTSecuritySolutionsList.json
 */
async function listIoTSecuritySolutionsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotSecuritySolution.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to use this method to get the list of IoT Security solutions by subscription.
 *
 * @summary use this method to get the list of IoT Security solutions by subscription.
 * x-ms-original-file: 2019-08-01/IoTSecuritySolutions/GetIoTSecuritySolutionsListByIotHub.json
 */
async function listIoTSecuritySolutionsByIoTHub() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotSecuritySolution.listBySubscription({
    filter:
      'properties.iotHubs/any(i eq "/subscriptions/075423e9-7d33-4166-8bdf-3920b04e3735/resourceGroups/myRg/providers/Microsoft.Devices/IotHubs/FirstIotHub")',
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listIoTSecuritySolutionsBySubscription();
  await listIoTSecuritySolutionsByIoTHub();
}

main().catch(console.error);
