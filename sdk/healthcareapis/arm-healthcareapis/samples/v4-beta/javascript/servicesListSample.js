// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all the service instances in a subscription.
 *
 * @summary get all the service instances in a subscription.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServiceList.json
 */
async function listAllServicesInSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.services.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllServicesInSubscription();
}

main().catch(console.error);
