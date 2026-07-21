// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the network security perimeter configurations for a private link scope.
 *
 * @summary lists the network security perimeter configurations for a private link scope.
 * x-ms-original-file: 2025-09-16-preview/networkSecurityPerimeterConfiguration/NetworkSecurityPerimeterConfigurationList.json
 */
async function getsTheListOfNetworkSecurityPerimeterConfigurationsOfThePrivateLinkScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterConfigurations.listByPrivateLinkScope(
    "my-resource-group",
    "my-privatelinkscope",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfNetworkSecurityPerimeterConfigurationsOfThePrivateLinkScope();
}

main().catch(console.error);
