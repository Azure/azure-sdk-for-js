// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { UpdateAdministrativeState } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Enables racks for this Isolation Domain.
 *
 * @summary Enables racks for this Isolation Domain.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/L3IsolationDomains_updateAdministrativeState_MaximumSet_Gen.json
 */
async function l3IsolationDomainsUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const l3IsolationDomainName = "example-l3domain";
  const body: UpdateAdministrativeState = {
    resourceIds: [""],
    state: "Enable",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.l3IsolationDomains.beginUpdateAdministrativeStateAndWait(
    resourceGroupName,
    l3IsolationDomainName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await l3IsolationDomainsUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
