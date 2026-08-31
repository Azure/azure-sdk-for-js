// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list of all metadata
 *
 * @summary list of all metadata
 * x-ms-original-file: 2025-07-01-preview/metadata/GetAllMetadata.json
 */
async function getAllMetadata(): Promise<void> {
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
async function getAllMetadataWithODataFilterOrOrderbyOrSkipOrTop(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metadata.list("myRg", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllMetadata();
  await getAllMetadataWithODataFilterOrOrderbyOrSkipOrTop();
}

main().catch(console.error);
