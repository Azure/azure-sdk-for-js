// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AIManager resources by resource group
 *
 * @summary list AIManager resources by resource group
 * x-ms-original-file: 2026-05-02-preview/AIManagers_ListByResourceGroup.json
 */
async function listsAIManagerResourcesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiManagers.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAIManagerResourcesByResourceGroup();
}

main().catch(console.error);
