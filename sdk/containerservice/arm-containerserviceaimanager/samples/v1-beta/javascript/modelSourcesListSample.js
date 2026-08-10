// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ModelSource resources by AIManager
 *
 * @summary list ModelSource resources by AIManager
 * x-ms-original-file: 2026-05-02-preview/ModelSources_List.json
 */
async function modelSourcesListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.modelSources.list("rgaimanagers", "aimanager1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await modelSourcesListMaximumSet();
}

main().catch(console.error);
