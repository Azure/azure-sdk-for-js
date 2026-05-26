// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the security connectors in the specified subscription. Use the 'nextLink' property in the response to get the next page of security connectors for the specified subscription.
 *
 * @summary lists all the security connectors in the specified subscription. Use the 'nextLink' property in the response to get the next page of security connectors for the specified subscription.
 * x-ms-original-file: 2024-08-01-preview/SecurityConnectors/GetSecurityConnectorsSubscription_example.json
 */
async function listAllSecurityConnectorsOfASpecifiedSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5caac9c-5c04-49af-b3d0-e204f40345d5";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityConnectors.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllSecurityConnectorsOfASpecifiedSubscription();
}

main().catch(console.error);
