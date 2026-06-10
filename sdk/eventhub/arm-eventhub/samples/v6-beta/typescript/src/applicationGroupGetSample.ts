// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an ApplicationGroup for a Namespace.
 *
 * @summary gets an ApplicationGroup for a Namespace.
 * x-ms-original-file: 2026-01-01/ApplicationGroup/ApplicationGroupGet.json
 */
async function applicationGroupGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.applicationGroup.get(
    "contosotest",
    "contoso-ua-test-eh-system-1",
    "appGroup1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await applicationGroupGet();
}

main().catch(console.error);
