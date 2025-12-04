// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the properties of the specified token.
 *
 * @summary Gets the properties of the specified token.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/stable/2025-11-01/examples/TokenGet.json
 */
async function tokenGet() {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const tokenName = "myToken";
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.tokens.get(resourceGroupName, registryName, tokenName);
  console.log(result);
}

async function main() {
  await tokenGet();
}

main().catch(console.error);
