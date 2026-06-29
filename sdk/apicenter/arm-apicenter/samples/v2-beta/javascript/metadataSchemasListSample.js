// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a collection of metadata schemas.
 *
 * @summary returns a collection of metadata schemas.
 * x-ms-original-file: 2024-06-01-preview/MetadataSchemas_List.json
 */
async function metadataSchemasListByService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metadataSchemas.list("contoso-resources", "contoso")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await metadataSchemasListByService();
}

main().catch(console.error);
