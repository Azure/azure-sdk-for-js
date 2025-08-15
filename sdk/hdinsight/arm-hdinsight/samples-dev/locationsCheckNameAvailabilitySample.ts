// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NameAvailabilityCheckRequestParameters } from "@azure/arm-hdinsight";
import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Check the cluster name is available or not.
 *
 * @summary Check the cluster name is available or not.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/HDI_Locations_CheckClusterNameAvailability.json
 */
async function getTheSubscriptionUsagesForSpecificLocation(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const location = "westus";
  const parameters: NameAvailabilityCheckRequestParameters = {
    name: "test123",
    type: "clusters",
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.locations.checkNameAvailability(location, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await getTheSubscriptionUsagesForSpecificLocation();
}

main().catch(console.error);
