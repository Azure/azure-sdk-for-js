// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists the billingSpecs for the specified subscription and location.
 *
 * @summary Lists the billingSpecs for the specified subscription and location.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/HDI_Locations_ListBillingSpecs.json
 */
async function getTheSubscriptionBillingSpecsForTheSpecifiedLocation(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const location = "East US 2";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.locations.listBillingSpecs(location);
  console.log(result);
}

async function main(): Promise<void> {
  await getTheSubscriptionBillingSpecsForTheSpecifiedLocation();
}

main().catch(console.error);
