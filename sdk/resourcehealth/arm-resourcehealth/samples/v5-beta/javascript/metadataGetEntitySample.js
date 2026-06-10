// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of metadata entities.
 *
 * @summary gets the list of metadata entities.
 * x-ms-original-file: 2025-05-01/Metadata_GetEntity.json
 */
async function getMetadata() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const result = await client.metadata.getEntity("status");
  console.log(result);
}

async function main() {
  await getMetadata();
}

main().catch(console.error);
