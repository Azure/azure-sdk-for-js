// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists the NSP logging configuration.
 *
 * @summary Lists the NSP logging configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspLoggingConfigurationList.json
 */
async function nspLoggingConfigurationList() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterLoggingConfigurations.list(
    resourceGroupName,
    networkSecurityPerimeterName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await nspLoggingConfigurationList();
}

main().catch(console.error);
