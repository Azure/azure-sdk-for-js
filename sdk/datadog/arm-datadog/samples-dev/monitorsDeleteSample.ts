// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a monitor resource.
 *
 * @summary Delete a monitor resource.
 * x-ms-original-file: specification/datadog/resource-manager/Microsoft.Datadog/stable/2023-01-01/examples/Monitors_Delete.json
 */

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function monitorsDelete(): Promise<void> {
  const subscriptionId =
    process.env["DATADOG_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DATADOG_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.monitors.beginDeleteAndWait(resourceGroupName, monitorName);
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsDelete();
}

main().catch(console.error);
