// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ModelDeployment resources by AIManagerNamespace
 *
 * @summary list ModelDeployment resources by AIManagerNamespace
 * x-ms-original-file: 2026-05-02-preview/ModelDeployments_ListByAIManagerNamespace.json
 */
async function modelDeploymentsListByAIManagerNamespaceMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.modelDeployments.listByAIManagerNamespace(
    "rgaimanagers",
    "aimanager1",
    "namespace-1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await modelDeploymentsListByAIManagerNamespaceMaximumSet();
}

main().catch(console.error);
