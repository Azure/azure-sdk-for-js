// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the ExpressRouteLagMember sub-resources of the specified ExpressRouteLagLink resource.
 *
 * @summary retrieve the ExpressRouteLagMember sub-resources of the specified ExpressRouteLagLink resource.
 * x-ms-original-file: 2025-09-01/ExpressRouteLagMemberList.json
 */
async function listExpressRouteLagMembers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteLags.membersList("rg1", "lagName", "linkName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listExpressRouteLagMembers();
}

main().catch(console.error);
