// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AIManager
 *
 * @summary get a AIManager
 * x-ms-original-file: 2026-09-02-preview/AIManagers_Get.json
 */
async function getsAnAIManagerResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagers.get("rg1", "aimanager1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a AIManager
 *
 * @summary get a AIManager
 * x-ms-original-file: 2026-09-02-preview/AIManagers_Get_BYO.json
 */
async function getsAnAIManagerResourceAttachedToAnExistingAKSClusterBringYourOwn() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagers.get("rg1", "aimanager1");
  console.log(result);
}

async function main() {
  await getsAnAIManagerResource();
  await getsAnAIManagerResourceAttachedToAnExistingAKSClusterBringYourOwn();
}

main().catch(console.error);
