// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all resource providers for a subscription.
 *
 * @summary Gets all resource providers for a subscription.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/GetProviders.json
 */

const { ResourceManagementClient } = require("@azure/arm-resources");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function getProviders() {
  const subscriptionId =
    process.env["RESOURCES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.providers.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getProviders();
}

main().catch(console.error);
