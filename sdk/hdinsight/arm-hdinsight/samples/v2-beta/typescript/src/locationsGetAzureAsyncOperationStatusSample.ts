// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the async operation status.
 *
 * @summary get the async operation status.
 * x-ms-original-file: 2025-01-15-preview/HDI_Locations_GetAsyncOperationStatus.json
 */
async function getsTheAzureAsyncOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.locations.getAzureAsyncOperationStatus(
    "East US 2",
    "8a0348f4-8a85-4ec2-abe0-03b26104a9a0-0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheAzureAsyncOperationStatus();
}

main().catch(console.error);
