// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refreshes any information about the association.
 *
 * @summary refreshes any information about the association.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/NetworkSecurityPerimeterConfigurationReconcile.json
 */
async function networkSecurityPerimeterConfigurationList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.networkSecurityPerimeterConfigurations.reconcile(
    "SDK-ServiceBus-4794",
    "sdk-Namespace-5828",
    "resourceAssociation1",
  );
}

async function main() {
  await networkSecurityPerimeterConfigurationList();
}

main().catch(console.error);
