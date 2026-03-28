// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Metadata.
 *
 * @summary get a Metadata.
 * x-ms-original-file: 2025-07-01-preview/metadata/GetMetadata.json
 */
async function getSingleMetadataByName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2e1dc338-d04d-4443-b721-037eff4fdcac";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.metadata.get("myRg", "myWorkspace", "metadataName");
  console.log(result);
}

async function main() {
  await getSingleMetadataByName();
}

main().catch(console.error);
