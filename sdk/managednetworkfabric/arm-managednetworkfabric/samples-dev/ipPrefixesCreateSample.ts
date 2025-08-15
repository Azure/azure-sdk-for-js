// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IpPrefix } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Implements IP Prefix PUT method.
 *
 * @summary Implements IP Prefix PUT method.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/IpPrefixes_Create_MaximumSet_Gen.json
 */
async function ipPrefixesCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const ipPrefixName = "example-ipPrefix";
  const body: IpPrefix = {
    annotation: "annotation",
    ipPrefixRules: [
      {
        action: "Permit",
        condition: "GreaterThanOrEqualTo",
        networkPrefix: "10.10.10.10/30",
        sequenceNumber: 4155123341,
        subnetMaskLength: "10",
      },
    ],
    location: "eastus",
    tags: { keyID: "KeyValue" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.ipPrefixes.beginCreateAndWait(resourceGroupName, ipPrefixName, body);
  console.log(result);
}

async function main(): Promise<void> {
  await ipPrefixesCreateMaximumSetGen();
}

main().catch(console.error);
