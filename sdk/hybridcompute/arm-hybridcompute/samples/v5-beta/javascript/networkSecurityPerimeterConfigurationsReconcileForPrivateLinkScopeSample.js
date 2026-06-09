// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to forces the network security perimeter configuration to refresh for a private link scope.
 *
 * @summary forces the network security perimeter configuration to refresh for a private link scope.
 * x-ms-original-file: 2025-09-16-preview/networkSecurityPerimeterConfiguration/NetworkSecurityPerimeterConfigurationReconcile.json
 */
async function reconcilesTheNetworkSecurityPerimeterConfigurationOfThePrivateLinkScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.reconcileForPrivateLinkScope(
    "my-resource-group",
    "my-privatelinkscope",
    "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.myAssociation",
  );
  console.log(result);
}

async function main() {
  await reconcilesTheNetworkSecurityPerimeterConfigurationOfThePrivateLinkScope();
}

main().catch(console.error);
