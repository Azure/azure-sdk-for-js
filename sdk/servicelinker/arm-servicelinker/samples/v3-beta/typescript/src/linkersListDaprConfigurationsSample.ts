// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the dapr configuration supported by Service Connector.
 *
 * @summary list the dapr configuration supported by Service Connector.
 * x-ms-original-file: 2024-07-01-preview/GetDaprConfigurations.json
 */
async function getDaprConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.linkers.listDaprConfigurations(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Web/sites/test-app",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getDaprConfigurations();
}

main().catch(console.error);
