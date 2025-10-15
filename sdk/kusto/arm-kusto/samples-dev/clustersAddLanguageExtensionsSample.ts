// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Add a list of language extensions that can run within KQL queries.
 *
 * @summary Add a list of language extensions that can run within KQL queries.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2023-08-15/examples/KustoClusterAddLanguageExtensions.json
 */

import type { LanguageExtensionsList } from "@azure/arm-kusto";
import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoClusterAddLanguageExtensions(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const languageExtensionsToAdd: LanguageExtensionsList = {
    value: [{ languageExtensionName: "PYTHON" }, { languageExtensionName: "R" }],
  };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginAddLanguageExtensionsAndWait(
    resourceGroupName,
    clusterName,
    languageExtensionsToAdd,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoClusterAddLanguageExtensions();
}

main().catch(console.error);
