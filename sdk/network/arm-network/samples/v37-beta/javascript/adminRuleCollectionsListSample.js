// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the rule collections in a security admin configuration, in a paginated format.
 *
 * @summary lists all the rule collections in a security admin configuration, in a paginated format.
 * x-ms-original-file: 2025-05-01/NetworkManagerAdminRuleCollectionList.json
 */
async function listSecurityAdminRuleCollections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.adminRuleCollections.list(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSecurityAdminRuleCollections();
}

main().catch(console.error);
