// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of metadata entities.
 *
 * @summary gets the list of metadata entities.
 * x-ms-original-file: 2025-05-01/Metadata_List.json
 */
async function getMetadata() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const resArray = new Array();
  for await (const item of client.metadata.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getMetadata();
}

main().catch(console.error);
