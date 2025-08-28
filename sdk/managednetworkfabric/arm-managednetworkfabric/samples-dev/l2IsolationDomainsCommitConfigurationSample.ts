// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Commits the configuration of the given resources.
 *
 * @summary Commits the configuration of the given resources.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/L2IsolationDomains_CommitConfiguration_MaximumSet_Gen.json
 */

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function l2IsolationDomainsCommitConfigurationMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const l2IsolationDomainName = "example-l2domain";
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.l2IsolationDomains.beginCommitConfigurationAndWait(
    resourceGroupName,
    l2IsolationDomainName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await l2IsolationDomainsCommitConfigurationMaximumSetGen();
}

main().catch(console.error);
