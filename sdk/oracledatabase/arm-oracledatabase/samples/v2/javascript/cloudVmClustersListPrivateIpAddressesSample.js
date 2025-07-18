// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Private IP Addresses by the provided filter
 *
 * @summary list Private IP Addresses by the provided filter
 * x-ms-original-file: 2025-03-01/vmClusters_listPrivateIpAddresses.json
 */
async function cloudVmClustersListPrivateIpAddresses() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.listPrivateIpAddresses("rg000", "cluster1", {
    subnetId: "ocid1..aaaaaa",
    vnicId: "ocid1..aaaaa",
  });
  console.log(result);
}

async function main() {
  await cloudVmClustersListPrivateIpAddresses();
}

main().catch(console.error);
