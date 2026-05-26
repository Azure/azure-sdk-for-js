// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources possible under private access resource
 *
 * @summary gets the private link resources possible under private access resource
 * x-ms-original-file: 2026-05-01-preview/PrivateAccesses_GetPrivateLinkResources.json
 */
async function listAllPossiblePrivateLinkResourcesUnderPrivateAccessResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.privateAccesses.getPrivateLinkResources(
    "myResourceGroup",
    "myPrivateAccess",
  );
  console.log(result);
}

async function main() {
  await listAllPossiblePrivateLinkResourcesUnderPrivateAccessResource();
}

main().catch(console.error);
