// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PurviewManagementClient } = require("@azure/arm-purview");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a privately linkable resources for an account with given group identifier
 *
 * @summary gets a privately linkable resources for an account with given group identifier
 * x-ms-original-file: 2024-04-01-preview/PrivateLinkResources_GetByGroupId.json
 */
async function privateLinkResourcesGetByGroupId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.getByGroupId(
    "SampleResourceGroup",
    "account1",
    "group1",
  );
  console.log(result);
}

async function main() {
  await privateLinkResourcesGetByGroupId();
}

main().catch(console.error);
