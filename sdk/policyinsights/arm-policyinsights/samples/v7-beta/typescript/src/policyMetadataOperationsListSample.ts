// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of the policy metadata resources.
 *
 * @summary get a list of the policy metadata resources.
 * x-ms-original-file: 2024-10-01/PolicyMetadata_List.json
 */
async function getCollectionOfPolicyMetadataResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyMetadataOperations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get a list of the policy metadata resources.
 *
 * @summary get a list of the policy metadata resources.
 * x-ms-original-file: 2024-10-01/PolicyMetadata_List_WithTop.json
 */
async function getCollectionOfPolicyMetadataResourcesUsingTopQueryParameter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyMetadataOperations.list({ queryOptions: { top: 1 } })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getCollectionOfPolicyMetadataResources();
  await getCollectionOfPolicyMetadataResourcesUsingTopQueryParameter();
}

main().catch(console.error);
