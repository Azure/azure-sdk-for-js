// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all authorizations in an express route LAG.
 *
 * @summary gets all authorizations in an express route LAG.
 * x-ms-original-file: 2026-03-01/ExpressRouteLagAuthorizationList.json
 */
async function listExpressRouteLagAuthorization() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteLagAuthorizations.list(
    "rg1",
    "expressRouteLagName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listExpressRouteLagAuthorization();
}

main().catch(console.error);
