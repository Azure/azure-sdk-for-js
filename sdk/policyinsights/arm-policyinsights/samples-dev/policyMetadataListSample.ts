// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Get a list of the policy metadata resources.
 *
 * @summary Get a list of the policy metadata resources.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyMetadata_List.json
 */

import type { PolicyMetadataListOptionalParams } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

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
 * This sample demonstrates how to Get a list of the policy metadata resources.
 *
 * @summary Get a list of the policy metadata resources.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyMetadata_List_WithTop.json
 */
async function getCollectionOfPolicyMetadataResourcesUsingTopQueryParameter(): Promise<void> {
  const top = 1;
  const options: PolicyMetadataListOptionalParams = { queryOptions: { top } };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyMetadataOperations.list(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getCollectionOfPolicyMetadataResources();
  await getCollectionOfPolicyMetadataResourcesUsingTopQueryParameter();
}

main().catch(console.error);
