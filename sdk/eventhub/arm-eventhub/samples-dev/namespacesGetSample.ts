// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the description of the specified namespace.
 *
 * @summary gets the description of the specified namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceGet.json
 */
async function nameSpaceGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "SampleSubscription";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.get("ResurceGroupSample", "NamespaceSample");
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceGet();
}

main().catch(console.error);
