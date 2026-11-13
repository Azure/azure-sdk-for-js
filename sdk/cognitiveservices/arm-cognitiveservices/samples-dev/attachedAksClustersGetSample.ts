// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an AKS attachment and its current provisioning and health status.
 *
 * @summary gets an AKS attachment and its current provisioning and health status.
 * x-ms-original-file: 2026-11-15-preview/GetAttachedAksCluster.json
 */
async function getAttachedAksCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.attachedAksClusters.get(
    "rgcognitiveservices",
    "myAccount",
    "myAttachment",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAttachedAksCluster();
}

main().catch(console.error);
