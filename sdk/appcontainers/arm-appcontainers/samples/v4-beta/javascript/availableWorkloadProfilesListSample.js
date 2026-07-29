// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all available workload profiles for a location.
 *
 * @summary get all available workload profiles for a location.
 * x-ms-original-file: 2025-10-02-preview/AvailableWorkloadProfiles_Get.json
 */
async function billingMetersGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availableWorkloadProfiles.list("East US")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await billingMetersGet();
}

main().catch(console.error);
