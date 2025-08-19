// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DatadogMonitorResourceUpdateParameters,
  MonitorsUpdateOptionalParams,
} from "@azure/arm-datadog";
import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update a monitor resource.
 *
 * @summary Update a monitor resource.
 * x-ms-original-file: specification/datadog/resource-manager/Microsoft.Datadog/stable/2023-01-01/examples/Monitors_Update.json
 */
async function monitorsUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DATADOG_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DATADOG_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const body: DatadogMonitorResourceUpdateParameters = {
    properties: { monitoringStatus: "Enabled" },
    tags: { environment: "Dev" },
  };
  const options: MonitorsUpdateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.monitors.beginUpdateAndWait(resourceGroupName, monitorName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsUpdate();
}

main().catch(console.error);
