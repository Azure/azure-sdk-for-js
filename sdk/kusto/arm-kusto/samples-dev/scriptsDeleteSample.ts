// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a Kusto database script.
 *
 * @summary Deletes a Kusto database script.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2024-04-13/examples/KustoScriptsDelete.json
 */
async function kustoScriptsDelete(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const databaseName = "KustoDatabase8";
  const scriptName = "kustoScript";
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.scripts.beginDeleteAndWait(
    resourceGroupName,
    clusterName,
    databaseName,
    scriptName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoScriptsDelete();
}

main().catch(console.error);
