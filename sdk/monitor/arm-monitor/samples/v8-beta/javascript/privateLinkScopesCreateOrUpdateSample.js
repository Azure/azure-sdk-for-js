// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates (or updates) a Azure Monitor PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @summary creates (or updates) a Azure Monitor PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 * x-ms-original-file: 2023-06-01-preview/PrivateLinkScopesCreate.json
 */
async function privateLinkScopeCreate() {
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
async function privateLinkScopeUpdate() {
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

async function main() {
  await privateLinkScopeCreate();
  await privateLinkScopeUpdate();
}

main().catch(console.error);
