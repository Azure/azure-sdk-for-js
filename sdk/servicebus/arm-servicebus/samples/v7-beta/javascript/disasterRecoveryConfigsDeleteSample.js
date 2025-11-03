// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an Alias(Disaster Recovery configuration)
 *
 * @summary deletes an Alias(Disaster Recovery configuration)
 * x-ms-original-file: 2025-05-01-preview/disasterRecoveryConfigs/SBAliasDelete.json
 */
async function sbAliasDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.disasterRecoveryConfigs.delete(
    "SouthCentralUS",
    "sdk-Namespace-8860",
    "sdk-DisasterRecovery-3814",
  );
}

async function main() {
  await sbAliasDelete();
}

main().catch(console.error);
