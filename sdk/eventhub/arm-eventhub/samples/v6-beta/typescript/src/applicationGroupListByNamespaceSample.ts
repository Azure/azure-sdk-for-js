// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of application groups for a Namespace.
 *
 * @summary gets a list of application groups for a Namespace.
 * x-ms-original-file: 2026-01-01/ApplicationGroup/ApplicationGroupListByNamespace.json
 */
async function listApplicationGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationGroup.listByNamespace(
    "contosotest",
    "contoso-ua-test-eh-system-1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listApplicationGroups();
}

main().catch(console.error);
