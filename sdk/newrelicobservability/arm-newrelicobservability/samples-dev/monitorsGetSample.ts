// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the properties and configuration details of a specific New Relic monitor resource, providing insight into its setup and status
 *
 * @summary retrieves the properties and configuration details of a specific New Relic monitor resource, providing insight into its setup and status
 * x-ms-original-file: 2025-05-01-preview/Monitors_Get_MaximumSet_Gen.json
 */
async function monitorsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.get("rgNewRelic", "cdlymktqw");
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsGetMaximumSetGen();
}

main().catch(console.error);
