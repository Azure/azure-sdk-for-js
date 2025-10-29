// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a scope map with the specified parameters.
 *
 * @summary updates a scope map with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ScopeMapUpdate.json
 */
async function scopeMapUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.scopeMaps.update("myResourceGroup", "myRegistry", "myScopeMap", {
    properties: {
      description: "Developer Scopes",
      actions: ["repositories/myrepository/contentWrite", "repositories/myrepository/contentRead"],
    },
  });
  console.log(result);
}

async function main() {
  await scopeMapUpdate();
}

main().catch(console.error);
