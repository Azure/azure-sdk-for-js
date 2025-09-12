// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a virtual cluster.
 *
 * @summary Gets a virtual cluster.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-05-01-preview/examples/VirtualClusterGet.json
 */
async function getsAVirtualCluster() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "20d7082a-0fc7-4468-82bd-542694d5042b";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testrg";
  const virtualClusterName = "vc-f769ed71-b3ad-491a-a9d5-26eeceaa6be2";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.virtualClusters.get(resourceGroupName, virtualClusterName);
  console.log(result);
}

async function main() {
  await getsAVirtualCluster();
}

main().catch(console.error);
