// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to add an Azure monitor scoped resource in the private link scope.
 *
 * @summary add an Azure monitor scoped resource in the private link scope.
 * x-ms-original-file: 2023-06-01-preview/PrivateLinkScopedResourceUpdate.json
 */
async function updateAScopedResourceInAPrivateLinkScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.privateLinkScopedResources.createOrUpdate(
    "MyResourceGroup",
    "MyPrivateLinkScope",
    "scoped-resource-name",
    {
      kind: "Resource",
      linkedResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/MyResourceGroup/providers/Microsoft.Insights/components/my-component",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to add an Azure monitor scoped resource in the private link scope.
 *
 * @summary add an Azure monitor scoped resource in the private link scope.
 * x-ms-original-file: 2023-06-01-preview/PrivateLinkScopedResourceUpdatePlatformMetrics.json
 */
async function updateAScopedPlatformMetricsSubscriptionInAPrivateLinkScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.privateLinkScopedResources.createOrUpdate(
    "MyResourceGroup",
    "MyPrivateLinkScope",
    "scoped-resource-name",
    {
      kind: "PlatformMetrics",
      linkedResourceId: "/subscriptions/00000000-1111-2222-3333-444444444444",
      subscriptionLocation: "eastus",
    },
  );
  console.log(result);
}

async function main() {
  await updateAScopedResourceInAPrivateLinkScope();
  await updateAScopedPlatformMetricsSubscriptionInAPrivateLinkScope();
}

main().catch(console.error);
