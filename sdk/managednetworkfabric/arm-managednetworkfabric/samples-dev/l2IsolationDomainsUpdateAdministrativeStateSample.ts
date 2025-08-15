// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { UpdateAdministrativeState } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Enables isolation domain across the fabric or on specified racks.
 *
 * @summary Enables isolation domain across the fabric or on specified racks.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/L2IsolationDomains_updateAdministrativeState_MaximumSet_Gen.json
 */
async function l2IsolationDomainsUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const l2IsolationDomainName = "example-l2Domain";
  const body: UpdateAdministrativeState = {
    resourceIds: [""],
    state: "Enable",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.l2IsolationDomains.beginUpdateAdministrativeStateAndWait(
    resourceGroupName,
    l2IsolationDomainName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await l2IsolationDomainsUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
