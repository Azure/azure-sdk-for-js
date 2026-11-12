// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the SVM Peer
 *
 * @summary get the SVM Peer
 * x-ms-original-file: 2026-08-15-preview/SvmPeers_Get.json
 */
async function svmPeersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.svmPeers.get(
    "contosoNetAppRg",
    "contoso-external-cluster",
    "peerA",
    "contoso-svm-peer-a",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await svmPeersGet();
}

main().catch(console.error);
