// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that the script name is valid and is not already in use.
 *
 * @summary checks that the script name is valid and is not already in use.
 * x-ms-original-file: 2025-02-14/KustoScriptsCheckNameAvailability.json
 */
async function kustoScriptsCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.scripts.checkNameAvailability("kustorptest", "kustoCluster", "db", {
    name: "kustoScriptName1",
    type: "Microsoft.Kusto/clusters/databases/scripts",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await kustoScriptsCheckNameAvailability();
}

main().catch(console.error);
