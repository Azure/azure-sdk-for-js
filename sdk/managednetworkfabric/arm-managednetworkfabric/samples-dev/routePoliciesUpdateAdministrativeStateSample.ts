// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { UpdateAdministrativeState } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updated the admin state for this Route Policy.
 *
 * @summary Updated the admin state for this Route Policy.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/RoutePolicies_UpdateAdministrativeState_MaximumSet_Gen.json
 */
async function routePoliciesUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const routePolicyName = "example-routePolicy";
  const body: UpdateAdministrativeState = {
    resourceIds: [""],
    state: "Enable",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.routePolicies.beginUpdateAdministrativeStateAndWait(
    resourceGroupName,
    routePolicyName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await routePoliciesUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
