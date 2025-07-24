// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get confluent connector by Name
 *
 * @summary get confluent connector by Name
 * x-ms-original-file: 2024-07-01/Organization_GetConnectorByName.json
 */
async function connectorGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.connector.get(
    "myResourceGroup",
    "myOrganization",
    "env-12132",
    "dlz-f3a90de",
    "connector-1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await connectorGet();
}

main().catch(console.error);
