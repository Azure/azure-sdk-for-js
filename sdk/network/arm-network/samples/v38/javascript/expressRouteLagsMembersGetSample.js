// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the specified ExpressRouteLagMember resource.
 *
 * @summary retrieves the specified ExpressRouteLagMember resource.
 * x-ms-original-file: 2025-09-01/ExpressRouteLagMemberGet.json
 */
async function getExpressRouteLagMember() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteLags.membersGet(
    "rg1",
    "lagName",
    "linkName",
    "memberName",
  );
  console.log(result);
}

async function main() {
  await getExpressRouteLagMember();
}

main().catch(console.error);
