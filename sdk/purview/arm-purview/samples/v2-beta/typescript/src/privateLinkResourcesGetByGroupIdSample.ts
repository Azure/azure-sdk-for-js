// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a privately linkable resources for an account with given group identifier
 *
 * @summary gets a privately linkable resources for an account with given group identifier
 * x-ms-original-file: 2024-04-01-preview/PrivateLinkResources_GetByGroupId.json
 */
async function privateLinkResourcesGetByGroupId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.getByGroupId(
    "SampleResourceGroup",
    "account1",
    "group1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkResourcesGetByGroupId();
}

main().catch(console.error);
