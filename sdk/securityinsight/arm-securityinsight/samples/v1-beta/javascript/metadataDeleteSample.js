// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Metadata.
 *
 * @summary delete a Metadata.
 * x-ms-original-file: 2025-07-01-preview/metadata/DeleteMetadata.json
 */
async function deleteMetadata() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.metadata.delete("myRg", "myWorkspace", "metadataName");
}

async function main() {
  await deleteMetadata();
}

main().catch(console.error);
