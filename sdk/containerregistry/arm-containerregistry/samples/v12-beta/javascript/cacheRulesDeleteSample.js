// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes a cache rule resource from a container registry.
 *
 * @summary Deletes a cache rule resource from a container registry.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/stable/2025-11-01/examples/CacheRuleDelete.json
 */
async function cacheRuleDelete() {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const cacheRuleName = "myCacheRule";
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.cacheRules.beginDeleteAndWait(
    resourceGroupName,
    registryName,
    cacheRuleName,
  );
  console.log(result);
}

async function main() {
  await cacheRuleDelete();
}

main().catch(console.error);
