// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available operations from Microsoft.Insights provider.
 *
 * @summary Lists all of the available operations from Microsoft.Insights provider.
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2015-04-01/examples/OperationList.json
 */

import { MonitorClient } from "@azure/arm-monitor-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAListOfOperationsForAResourceProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.operations.list();
  console.log(result);
}

async function main(): Promise<void> {
  await getAListOfOperationsForAResourceProvider();
}

main().catch(console.error);
