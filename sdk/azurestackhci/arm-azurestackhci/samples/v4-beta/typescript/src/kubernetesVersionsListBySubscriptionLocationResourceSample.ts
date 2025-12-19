// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all kubernetes versions.
 *
 * @summary list all kubernetes versions.
 * x-ms-original-file: 2025-12-01-preview/KubernetesVersions_ListBySubscriptionLocationResource_MaximumSet_Gen.json
 */
async function kubernetesVersionsListBySubscriptionLocationResourceMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ABB13722-6A68-4BFC-AE89-57B2EE91EA11";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.kubernetesVersions.listBySubscriptionLocationResource(
    "westus2",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await kubernetesVersionsListBySubscriptionLocationResourceMaximumSet();
}

main().catch(console.error);
