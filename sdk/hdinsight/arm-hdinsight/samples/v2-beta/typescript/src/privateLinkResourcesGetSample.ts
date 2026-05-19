// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specific private link resource.
 *
 * @summary gets the specific private link resource.
 * x-ms-original-file: 2025-01-15-preview/GetPrivateLinkResource.json
 */
async function getSpecificPrivateLinkResourceInASpecificHDInsightCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get("rg1", "cluster1", "gateway");
  console.log(result);
}

async function main(): Promise<void> {
  await getSpecificPrivateLinkResourceInASpecificHDInsightCluster();
}

main().catch(console.error);
