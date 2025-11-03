// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves Alias(Disaster Recovery configuration) for primary or secondary namespace
 *
 * @summary retrieves Alias(Disaster Recovery configuration) for primary or secondary namespace
 * x-ms-original-file: 2025-05-01-preview/disasterRecoveryConfigs/SBAliasGet.json
 */
async function sbAliasGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.disasterRecoveryConfigs.get(
    "ardsouzatestRG",
    "sdk-Namespace-8860",
    "sdk-DisasterRecovery-3814",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sbAliasGet();
}

main().catch(console.error);
