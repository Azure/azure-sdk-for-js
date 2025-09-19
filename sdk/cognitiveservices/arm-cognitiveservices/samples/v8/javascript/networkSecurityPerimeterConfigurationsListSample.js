// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of NSP configurations for an account.
 *
 * @summary Gets a list of NSP configurations for an account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ListNetworkSecurityPerimeterConfigurations.json
 */
async function listNetworkSecurityPerimeterConfigurations() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterConfigurations.list(
    resourceGroupName,
    accountName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listNetworkSecurityPerimeterConfigurations();
}

main().catch(console.error);
