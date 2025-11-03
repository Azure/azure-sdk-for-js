// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to invokes GEO DR failover and reconfigure the alias to point to the secondary namespace
 *
 * @summary invokes GEO DR failover and reconfigure the alias to point to the secondary namespace
 * x-ms-original-file: 2025-05-01-preview/disasterRecoveryConfigs/SBAliasFailOver.json
 */
async function sbAliasFailOver(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.disasterRecoveryConfigs.failOver(
    "ardsouzatestRG",
    "sdk-Namespace-8860",
    "sdk-DisasterRecovery-3814",
  );
}

async function main(): Promise<void> {
  await sbAliasFailOver();
}

main().catch(console.error);
