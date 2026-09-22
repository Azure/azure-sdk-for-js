// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a list of language extensions that can run within KQL queries.
 *
 * @summary returns a list of language extensions that can run within KQL queries.
 * x-ms-original-file: 2025-02-14/KustoClusterListLanguageExtensions.json
 */
async function kustoClusterListLanguageExtensions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listLanguageExtensions("kustorptest", "kustoCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await kustoClusterListLanguageExtensions();
}

main().catch(console.error);
