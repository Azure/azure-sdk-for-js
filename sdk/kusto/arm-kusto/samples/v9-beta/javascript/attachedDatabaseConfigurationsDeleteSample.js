// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the attached database configuration with the given name.
 *
 * @summary deletes the attached database configuration with the given name.
 * x-ms-original-file: 2025-02-14/KustoAttachedDatabaseConfigurationsDelete.json
 */
async function attachedDatabaseConfigurationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.attachedDatabaseConfigurations.delete(
    "kustorptest",
    "kustoCluster",
    "attachedDatabaseConfigurationsTest",
  );
}

async function main() {
  await attachedDatabaseConfigurationsDelete();
}

main().catch(console.error);
