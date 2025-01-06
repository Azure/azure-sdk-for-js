// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a Virtual Instance for SAP solutions resource
 *
 * @summary updates a Virtual Instance for SAP solutions resource
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_Update.json
 */
async function sAPVirtualInstancesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.update("test-rg", "X00", {
    identity: { type: "None" },
    properties: {},
    tags: { key1: "svi1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a Virtual Instance for SAP solutions resource
 *
 * @summary updates a Virtual Instance for SAP solutions resource
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_UpdateTrustedAccess.json
 */
async function sAPVirtualInstancesTrustedAccessEnableUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.update("test-rg", "X00", {
    identity: { type: "None" },
    properties: { managedResourcesNetworkAccessType: "Private" },
    tags: { key1: "svi1" },
  });
  console.log(result);
}

async function main() {
  sAPVirtualInstancesUpdate();
  sAPVirtualInstancesTrustedAccessEnableUpdate();
}

main().catch(console.error);
