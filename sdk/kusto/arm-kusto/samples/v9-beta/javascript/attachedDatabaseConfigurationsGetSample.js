// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns an attached database configuration.
 *
 * @summary returns an attached database configuration.
 * x-ms-original-file: 2025-02-14/KustoAttachedDatabaseConfigurationsGet.json
 */
async function attachedDatabaseConfigurationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.attachedDatabaseConfigurations.get(
    "kustorptest",
    "kustoCluster2",
    "attachedDatabaseConfigurationsTest",
  );
  console.log(result);
}

async function main() {
  await attachedDatabaseConfigurationsGet();
}

main().catch(console.error);
