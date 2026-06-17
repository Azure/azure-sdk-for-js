// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list of all metadata
 *
 * @summary list of all metadata
 * x-ms-original-file: 2025-07-01-preview/metadata/GetAllMetadata.json
 */
async function getAllMetadata() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metadata.list("myRg", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list of all metadata
 *
 * @summary list of all metadata
 * x-ms-original-file: 2025-07-01-preview/metadata/GetAllMetadataOData.json
 */
async function getAllMetadataWithODataFilterOrOrderbyOrSkipOrTop() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metadata.list("myRg", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllMetadata();
  await getAllMetadataWithODataFilterOrOrderbyOrSkipOrTop();
}

main().catch(console.error);
