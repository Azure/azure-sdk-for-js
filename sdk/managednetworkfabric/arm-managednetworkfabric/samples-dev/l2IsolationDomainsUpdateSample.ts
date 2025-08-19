// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { L2IsolationDomainPatch } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to API to update certain properties of the L2 Isolation Domain resource.
 *
 * @summary API to update certain properties of the L2 Isolation Domain resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/L2IsolationDomains_Update_MaximumSet_Gen.json
 */
async function l2IsolationDomainsUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const l2IsolationDomainName = "example-l2Domain";
  const body: L2IsolationDomainPatch = {
    annotation: "annotation1",
    mtu: 6000,
    tags: { keyID: "keyValue" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.l2IsolationDomains.beginUpdateAndWait(
    resourceGroupName,
    l2IsolationDomainName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await l2IsolationDomainsUpdateMaximumSetGen();
}

main().catch(console.error);
