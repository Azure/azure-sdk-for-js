// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an existing Metadata.
 *
 * @summary update an existing Metadata.
 * x-ms-original-file: 2025-07-01-preview/metadata/PatchMetadata.json
 */
async function updateMetadata() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.metadata.update("myRg", "myWorkspace", "metadataName", {
    author: { name: "User Name", email: "email@microsoft.com" },
  });
  console.log(result);
}

async function main() {
  await updateMetadata();
}

main().catch(console.error);
