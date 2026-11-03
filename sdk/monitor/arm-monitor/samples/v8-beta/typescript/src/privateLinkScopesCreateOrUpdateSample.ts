// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates (or updates) a Azure Monitor PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @summary creates (or updates) a Azure Monitor PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 * x-ms-original-file: 2023-06-01-preview/PrivateLinkScopesCreate.json
 */
async function privateLinkScopeCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.privateLinkScopes.createOrUpdate(
    "my-resource-group",
    "my-privatelinkscope",
    {
      location: "Global",
      accessModeSettings: { exclusions: [], ingestionAccessMode: "Open", queryAccessMode: "Open" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates (or updates) a Azure Monitor PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @summary creates (or updates) a Azure Monitor PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 * x-ms-original-file: 2023-06-01-preview/PrivateLinkScopesUpdate.json
 */
async function privateLinkScopeUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.privateLinkScopes.createOrUpdate(
    "my-resource-group",
    "my-privatelinkscope",
    {
      location: "Global",
      accessModeSettings: { exclusions: [], ingestionAccessMode: "Open", queryAccessMode: "Open" },
      tags: { Tag1: "Value1" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkScopeCreate();
  await privateLinkScopeUpdate();
}

main().catch(console.error);
