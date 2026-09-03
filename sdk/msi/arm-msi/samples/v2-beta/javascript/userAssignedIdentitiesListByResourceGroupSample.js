// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedServiceIdentityClient } = require("@azure/arm-msi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the userAssignedIdentities available under the specified ResourceGroup.
 *
 * @summary lists all the userAssignedIdentities available under the specified ResourceGroup.
 * x-ms-original-file: 2025-05-31-preview/IdentityListByResourceGroup.json
 */
async function identityListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-5678-9012-123456789012";
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.userAssignedIdentities.listByResourceGroup("rgName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await identityListByResourceGroup();
}

main().catch(console.error);
