// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to remove a list of language extensions that can run within KQL queries.
 *
 * @summary remove a list of language extensions that can run within KQL queries.
 * x-ms-original-file: 2025-02-14/KustoClusterRemoveLanguageExtensions.json
 */
async function kustoClusterRemoveLanguageExtensions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.clusters.removeLanguageExtensions("kustorptest", "kustoCluster", {
    value: [{ languageExtensionName: "PYTHON" }, { languageExtensionName: "R" }],
  });
}

async function main(): Promise<void> {
  await kustoClusterRemoveLanguageExtensions();
}

main().catch(console.error);
