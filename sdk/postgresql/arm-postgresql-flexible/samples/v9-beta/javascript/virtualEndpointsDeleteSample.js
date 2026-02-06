// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a pair of virtual endpoints.
 *
 * @summary deletes a pair of virtual endpoints.
 * x-ms-original-file: 2026-01-01-preview/VirtualEndpointDelete.json
 */
async function deleteAPairOfVirtualEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.virtualEndpoints.delete("exampleresourcegroup", "exampleserver", "examplebasename");
}

async function main() {
  await deleteAPairOfVirtualEndpoints();
}

main().catch(console.error);
