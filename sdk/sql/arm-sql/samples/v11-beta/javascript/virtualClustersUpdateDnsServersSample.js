// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to synchronizes the DNS server settings used by the managed instances inside the given virtual cluster.
 *
 * @summary synchronizes the DNS server settings used by the managed instances inside the given virtual cluster.
 * x-ms-original-file: 2025-02-01-preview/UpdateVirtualClusterDnsServers.json
 */
async function performsUpdateOfDnsServersOnManagedInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.virtualClusters.updateDnsServers(
    "sqlcrudtest-7398",
    "VirtualCluster2b9a846b-2e37-43ef-a8e9-f2c6d645c1d7",
  );
  console.log(result);
}

async function main() {
  await performsUpdateOfDnsServersOnManagedInstance();
}

main().catch(console.error);
