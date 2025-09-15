// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List of all metadata
 *
 * @summary List of all metadata
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/metadata/GetAllMetadataOData.json
 */

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAllMetadataWithODataFilterOrOrderbyOrSkipOrTop(): Promise<void> {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] || "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName = process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metadata.list(resourceGroupName, workspaceName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List of all metadata
 *
 * @summary List of all metadata
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/metadata/GetAllMetadata.json
 */
async function getAllMetadata(): Promise<void> {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] || "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName = process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metadata.list(resourceGroupName, workspaceName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllMetadataWithODataFilterOrOrderbyOrSkipOrTop();
  await getAllMetadata();
}

main().catch(console.error);
