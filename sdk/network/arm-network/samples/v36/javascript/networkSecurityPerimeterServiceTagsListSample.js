// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the list of service tags supported by NSP. These service tags can be used to create access rules in NSP.
 *
 * @summary Gets the list of service tags supported by NSP. These service tags can be used to create access rules in NSP.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspServiceTagsList.json
 */
async function nspServiceTagsList() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const location = "westus";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterServiceTags.list(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await nspServiceTagsList();
}

main().catch(console.error);
