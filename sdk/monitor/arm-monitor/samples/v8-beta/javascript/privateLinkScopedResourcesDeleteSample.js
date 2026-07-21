// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an Azure monitor scoped resource with a given name.
 *
 * @summary deletes an Azure monitor scoped resource with a given name.
 * x-ms-original-file: 2023-06-01-preview/PrivateLinkScopedResourceDelete.json
 */
async function deletesAScopedResourceWithAGivenName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  await client.privateLinkScopedResources.delete(
    "MyResourceGroup",
    "MyPrivateLinkScope",
    "scoped-resource-name",
  );
}

async function main() {
  await deletesAScopedResourceWithAGivenName();
}

main().catch(console.error);
