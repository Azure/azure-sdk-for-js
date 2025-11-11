// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list dryrun jobs
 *
 * @summary list dryrun jobs
 * x-ms-original-file: 2024-07-01-preview/ConnectorDryrunList.json
 */
async function connectorDryrunList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connector.listDryrun("test-rg", "westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await connectorDryrunList();
}

main().catch(console.error);
