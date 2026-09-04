// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all SandboxGroups for a subscription.
 *
 * @summary get all SandboxGroups for a subscription.
 * x-ms-original-file: 2026-07-01/SandboxGroups_ListBySubscription.json
 */
async function listSandboxGroupsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sandboxGroups.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSandboxGroupsBySubscription();
}

main().catch(console.error);
