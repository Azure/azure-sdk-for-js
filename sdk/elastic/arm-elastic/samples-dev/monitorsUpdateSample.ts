// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a monitor resource.
 *
 * @summary Update a monitor resource.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_Update.json
 */

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function monitorsUpdate(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.monitors.update(resourceGroupName, monitorName);
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsUpdate();
}

main().catch(console.error);
