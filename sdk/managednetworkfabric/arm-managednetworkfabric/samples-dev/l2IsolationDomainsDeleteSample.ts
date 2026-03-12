// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes layer 2 connectivity between compute nodes by managed by named L2 Isolation name.
 *
 * @summary Deletes layer 2 connectivity between compute nodes by managed by named L2 Isolation name.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/L2IsolationDomains_Delete_MaximumSet_Gen.json
 */

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function l2IsolationDomainsDeleteMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const l2IsolationDomainName = "example-l2Domain";
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.l2IsolationDomains.beginDeleteAndWait(
    resourceGroupName,
    l2IsolationDomainName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await l2IsolationDomainsDeleteMaximumSetGen();
}

main().catch(console.error);
