// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to return a NetworkSecurityPerimeterConfigurations resourceAssociationName
 *
 * @summary return a NetworkSecurityPerimeterConfigurations resourceAssociationName
 * x-ms-original-file: 2026-01-01/NameSpaces/NetworkSecurityPerimeterConfigurationAssociationproxy.json
 */
async function networkSecurityPerimeterConfigurationassociationProxyName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.getResourceAssociationName(
    "SDK-EventHub-4794",
    "sdk-Namespace-5828",
    "resourceAssociation1",
  );
  console.log(result);
}

async function main() {
  await networkSecurityPerimeterConfigurationassociationProxyName();
}

main().catch(console.error);
