// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the billingSpecs for the specified subscription and location.
 *
 * @summary lists the billingSpecs for the specified subscription and location.
 * x-ms-original-file: 2025-01-15-preview/HDI_Locations_ListBillingSpecs.json
 */
async function getTheSubscriptionBillingSpecsForTheSpecifiedLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.locations.listBillingSpecs("East US 2");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheSubscriptionBillingSpecsForTheSpecifiedLocation();
}

main().catch(console.error);
