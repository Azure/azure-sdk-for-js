// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the available Namespaces within a subscription, irrespective of the resource groups.
 *
 * @summary lists all the available Namespaces within a subscription, irrespective of the resource groups.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceList.json
 */
async function namespacesListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "SampleSubscription";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await namespacesListBySubscription();
}

main().catch(console.error);
