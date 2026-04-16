// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the VM details that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance.
 *
 * @summary Update the VM details that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/VMCollection_Update.json
 */
async function vmCollectionUpdate(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.vMCollection.update(
    resourceGroupName,
    monitorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await vmCollectionUpdate();
}

main().catch(console.error);
