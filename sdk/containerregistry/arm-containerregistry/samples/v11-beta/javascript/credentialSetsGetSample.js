// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the properties of the specified credential set resource.
 *
 * @summary gets the properties of the specified credential set resource.
 * x-ms-original-file: 2025-05-01-preview/CredentialSetGet.json
 */
async function credentialSetGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.credentialSets.get(
    "myResourceGroup",
    "myRegistry",
    "myCredentialSet",
  );
  console.log(result);
}

async function main() {
  await credentialSetGet();
}

main().catch(console.error);
