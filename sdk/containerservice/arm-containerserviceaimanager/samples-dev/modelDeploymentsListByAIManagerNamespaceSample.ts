// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ModelDeployment resources by AIManagerNamespace
 *
 * @summary list ModelDeployment resources by AIManagerNamespace
 * x-ms-original-file: 2026-05-02-preview/ModelDeployments_ListByAIManagerNamespace.json
 */
async function modelDeploymentsListByAIManagerNamespaceMaximumSet(): Promise<void> {
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

async function main(): Promise<void> {
  await modelDeploymentsListByAIManagerNamespaceMaximumSet();
}

main().catch(console.error);
