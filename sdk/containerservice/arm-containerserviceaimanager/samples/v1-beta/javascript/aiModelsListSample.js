// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AIModel resources by SubscriptionLocationResource
 *
 * @summary list AIModel resources by SubscriptionLocationResource
 * x-ms-original-file: 2026-05-02-preview/AIModels_List.json
 */
async function aiModelsListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiModels.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await aiModelsListMaximumSet();
}

main().catch(console.error);
