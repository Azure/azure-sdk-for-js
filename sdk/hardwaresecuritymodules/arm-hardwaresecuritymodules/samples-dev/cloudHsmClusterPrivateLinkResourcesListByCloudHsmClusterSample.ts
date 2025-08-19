// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private link resources supported for the Cloud Hsm Cluster.
 *
 * @summary gets the private link resources supported for the Cloud Hsm Cluster.
 * x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateLinkResource_ListByCloudHsmCluster_MaximumSet_Gen.json
 */
async function cloudHsmClusterPrivateLinkResourcesListByResourceMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (const item of client.cloudHsmClusterPrivateLinkResources.listByCloudHsmCluster(
    "rgcloudhsm",
    "chsm1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cloudHsmClusterPrivateLinkResourcesListByResourceMaximumSetGen();
}

main().catch(console.error);
