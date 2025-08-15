// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the list of all associated traffic filters for the given deployment.
 *
 * @summary Get the list of all associated traffic filters for the given deployment.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/AssociatedFiltersForDeployment_list.json
 */
async function listAssociatedTrafficFiltersList(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.listAssociatedTrafficFilters.list(resourceGroupName, monitorName);
  console.log(result);
}

async function main(): Promise<void> {
  await listAssociatedTrafficFiltersList();
}

main().catch(console.error);
