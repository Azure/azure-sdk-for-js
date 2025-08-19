// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available operations from Microsoft.Insights provider.
 *
 * @summary Lists all of the available operations from Microsoft.Insights provider.
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2015-04-01/examples/OperationList.json
 */

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAListOfOperationsForAResourceProvider(): Promise<void> {
  const subscriptionId =
    process.env["MONITOR_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.operations.list();
  console.log(result);
}

async function main(): Promise<void> {
  await getAListOfOperationsForAResourceProvider();
}

main().catch(console.error);
