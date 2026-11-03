// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources
 *
 * @summary gets the private link resources
 * x-ms-original-file: 2018-06-01/GetPrivateLinkResources.json
 */
async function getPrivateLinkResourcesOfASite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "exampleResourceGroup",
    "exampleFactoryName",
  );
  console.log(result);
}

async function main() {
  await getPrivateLinkResourcesOfASite();
}

main().catch(console.error);
