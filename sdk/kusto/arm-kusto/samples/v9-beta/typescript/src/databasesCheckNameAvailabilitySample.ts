// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that the databases resource name is valid and is not already in use.
 *
 * @summary checks that the databases resource name is valid and is not already in use.
 * x-ms-original-file: 2025-02-14/KustoDatabasesCheckNameAvailability.json
 */
async function kustoDatabasesCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.databases.checkNameAvailability("kustorptest", "kustoCluster", {
    name: "database1",
    type: "Microsoft.Kusto/clusters/databases",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await kustoDatabasesCheckNameAvailability();
}

main().catch(console.error);
