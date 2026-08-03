// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @summary creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 * x-ms-original-file: 2026-06-16-preview/privateLinkScope/PrivateLinkScopes_Create.json
 */
async function privateLinkScopeCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.privateLinkScopes.createOrUpdate(
    "my-resource-group",
    "my-privatelinkscope",
    { location: "westus" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @summary creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 * x-ms-original-file: 2026-06-16-preview/privateLinkScope/PrivateLinkScopes_Update.json
 */
async function privateLinkScopeUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.privateLinkScopes.createOrUpdate(
    "my-resource-group",
    "my-privatelinkscope",
    { location: "westus", tags: { Tag1: "Value1" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkScopeCreate();
  await privateLinkScopeUpdate();
}

main().catch(console.error);
