// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the capabilities for the specified location.
 *
 * @summary Gets the capabilities for the specified location.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/GetHDInsightCapabilities.json
 */

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getTheSubscriptionCapabilitiesForSpecificLocation(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const location = "West US";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.locations.getCapabilities(location);
  console.log(result);
}

async function main(): Promise<void> {
  await getTheSubscriptionCapabilitiesForSpecificLocation();
}

main().catch(console.error);
