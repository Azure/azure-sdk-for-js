// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves Alias(Disaster Recovery configuration) for primary or secondary namespace
 *
 * @summary retrieves Alias(Disaster Recovery configuration) for primary or secondary namespace
 * x-ms-original-file: 2025-05-01-preview/disasterRecoveryConfigs/SBAliasGet.json
 */
async function sbAliasGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.disasterRecoveryConfigs.get(
    "ardsouzatestRG",
    "sdk-Namespace-8860",
    "sdk-DisasterRecovery-3814",
  );
  console.log(result);
}

async function main() {
  await sbAliasGet();
}

main().catch(console.error);
