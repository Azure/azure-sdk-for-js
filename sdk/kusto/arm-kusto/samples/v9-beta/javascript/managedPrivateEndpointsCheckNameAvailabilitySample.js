// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks that the managed private endpoints resource name is valid and is not already in use.
 *
 * @summary checks that the managed private endpoints resource name is valid and is not already in use.
 * x-ms-original-file: 2025-02-14/KustoManagedPrivateEndpointsCheckNameAvailability.json
 */
async function kustoManagedPrivateEndpointsCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.managedPrivateEndpoints.checkNameAvailability(
    "kustorptest",
    "kustoCluster",
    { name: "pme1", type: "Microsoft.Kusto/clusters/managedPrivateEndpoints" },
  );
  console.log(result);
}

async function main() {
  await kustoManagedPrivateEndpointsCheckNameAvailability();
}

main().catch(console.error);
