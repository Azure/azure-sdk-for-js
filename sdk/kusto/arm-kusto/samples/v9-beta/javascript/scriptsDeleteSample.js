// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Kusto database script.
 *
 * @summary deletes a Kusto database script.
 * x-ms-original-file: 2025-02-14/KustoScriptsDelete.json
 */
async function kustoScriptsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.scripts.delete("kustorptest", "kustoCluster", "KustoDatabase8", "kustoScript");
}

async function main() {
  await kustoScriptsDelete();
}

main().catch(console.error);
