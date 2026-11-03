// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the extension properties for the specified HDInsight cluster extension.
 *
 * @summary gets the extension properties for the specified HDInsight cluster extension.
 * x-ms-original-file: 2025-01-15-preview/GetExtension.json
 */
async function getAnExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.extensions.get("rg1", "cluster1", "clustermonitoring");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnExtension();
}

main().catch(console.error);
