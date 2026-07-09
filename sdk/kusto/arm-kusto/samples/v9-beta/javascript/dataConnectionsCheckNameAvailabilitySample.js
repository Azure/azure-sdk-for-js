// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks that the data connection name is valid and is not already in use.
 *
 * @summary checks that the data connection name is valid and is not already in use.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsCheckNameAvailability.json
 */
async function kustoDataConnectionsCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.checkNameAvailability(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    { name: "DataConnections8", type: "Microsoft.Kusto/clusters/databases/dataConnections" },
  );
  console.log(result);
}

async function main() {
  await kustoDataConnectionsCheckNameAvailability();
}

main().catch(console.error);
