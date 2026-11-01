// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified authorization from the specified express route LAG.
 *
 * @summary gets the specified authorization from the specified express route LAG.
 * x-ms-original-file: 2026-03-01/ExpressRouteLagAuthorizationGet.json
 */
async function getExpressRouteLagAuthorization() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteLagAuthorizations.get(
    "rg1",
    "expressRouteLagName",
    "authorizationName",
  );
  console.log(result);
}

async function main() {
  await getExpressRouteLagAuthorization();
}

main().catch(console.error);
