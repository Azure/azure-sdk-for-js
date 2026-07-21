// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the network security perimeter configuration for a private link scope.
 *
 * @summary gets the network security perimeter configuration for a private link scope.
 * x-ms-original-file: 2025-09-16-preview/networkSecurityPerimeterConfiguration/NetworkSecurityPerimeterConfigurationGet.json
 */
async function getsTheNetworkSecurityPerimeterConfigurationOfThePrivateLinkScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.getByPrivateLinkScope(
    "my-resource-group",
    "my-privatelinkscope",
    "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.myAssociation",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheNetworkSecurityPerimeterConfigurationOfThePrivateLinkScope();
}

main().catch(console.error);
