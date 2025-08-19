// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Commits the configuration of the given resources.
 *
 * @summary Commits the configuration of the given resources.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/RoutePolicies_CommitConfiguration_MaximumSet_Gen.json
 */
async function routePoliciesCommitConfigurationMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const routePolicyName = "example-routePolicy";
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.routePolicies.beginCommitConfigurationAndWait(
    resourceGroupName,
    routePolicyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await routePoliciesCommitConfigurationMaximumSetGen();
}

main().catch(console.error);
