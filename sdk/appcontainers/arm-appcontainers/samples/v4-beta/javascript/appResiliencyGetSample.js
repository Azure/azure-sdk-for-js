// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get container app resiliency policy.
 *
 * @summary get container app resiliency policy.
 * x-ms-original-file: 2025-10-02-preview/AppResiliency_Get.json
 */
async function getAppResiliency() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.appResiliency.get("rg", "testcontainerApp0", "resiliency-policy-1");
  console.log(result);
}

async function main() {
  await getAppResiliency();
}

main().catch(console.error);
