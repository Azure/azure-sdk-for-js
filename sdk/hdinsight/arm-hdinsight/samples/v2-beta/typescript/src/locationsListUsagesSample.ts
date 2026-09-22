// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the usages for the specified location.
 *
 * @summary lists the usages for the specified location.
 * x-ms-original-file: 2025-01-15-preview/GetHDInsightUsages.json
 */
async function getTheSubscriptionUsagesForSpecificLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.locations.listUsages("West US");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheSubscriptionUsagesForSpecificLocation();
}

main().catch(console.error);
