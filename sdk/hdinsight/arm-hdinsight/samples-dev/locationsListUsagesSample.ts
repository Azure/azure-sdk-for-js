// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists the usages for the specified location.
 *
 * @summary Lists the usages for the specified location.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/GetHDInsightUsages.json
 */
async function getTheSubscriptionUsagesForSpecificLocation(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const location = "West US";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.locations.listUsages(location);
  console.log(result);
}

async function main(): Promise<void> {
  await getTheSubscriptionUsagesForSpecificLocation();
}

main().catch(console.error);
