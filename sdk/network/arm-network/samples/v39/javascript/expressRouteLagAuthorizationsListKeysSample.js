// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the authorization key associated with the specified express route LAG authorization.
 *
 * @summary gets the authorization key associated with the specified express route LAG authorization.
 * x-ms-original-file: 2026-03-01/ExpressRouteLagAuthorizationListKeys.json
 */
async function listExpressRouteLagAuthorizationKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteLagAuthorizations.listKeys(
    "rg1",
    "expressRouteLagName",
    "authorizationName",
  );
  console.log(result);
}

async function main() {
  await listExpressRouteLagAuthorizationKeys();
}

main().catch(console.error);
