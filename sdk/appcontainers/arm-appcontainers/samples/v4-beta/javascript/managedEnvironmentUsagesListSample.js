// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the current usage information as well as the limits for environment.
 *
 * @summary gets the current usage information as well as the limits for environment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentUsages_List.json
 */
async function listManagedEnvironmentUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedEnvironmentUsages.list("examplerg", "jlaw-demo1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedEnvironmentUsages();
}

main().catch(console.error);
