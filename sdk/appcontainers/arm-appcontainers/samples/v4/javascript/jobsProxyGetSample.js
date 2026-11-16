// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties for a given Container App Job.
 *
 * @summary get the properties for a given Container App Job.
 * x-ms-original-file: 2026-07-01/Job_ProxyGet.json
 */
async function getContainerAppJobByName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.proxyGet("rg", "testcontainerAppsJob0", "rootApi");
  console.log(result);
}

async function main() {
  await getContainerAppJobByName();
}

main().catch(console.error);
