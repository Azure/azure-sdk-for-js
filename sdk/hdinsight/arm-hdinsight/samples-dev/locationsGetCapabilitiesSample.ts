// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the capabilities for the specified location.
 *
 * @summary gets the capabilities for the specified location.
 * x-ms-original-file: 2025-01-15-preview/GetHDInsightCapabilities.json
 */
async function getTheSubscriptionCapabilitiesForSpecificLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.locations.getCapabilities("West US");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheSubscriptionCapabilitiesForSpecificLocation();
}

main().catch(console.error);
