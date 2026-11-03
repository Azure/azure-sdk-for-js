// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets provider operations metadata for all resource providers.
 *
 * @summary gets provider operations metadata for all resource providers.
 * x-ms-original-file: 2022-04-01/GetAllProviderOperations.json
 */
async function listProviderOperationsMetadataForAllResourceProviders() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.providerOperationsMetadata.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listProviderOperationsMetadataForAllResourceProviders();
}

main().catch(console.error);
