// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an NSP Logging configuration.
 *
 * @summary deletes an NSP Logging configuration.
 * x-ms-original-file: 2025-05-01/NspLoggingConfigurationDelete.json
 */
async function nspLoggingConfigurationDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkSecurityPerimeterLoggingConfigurations.delete("rg1", "nsp1", "instance");
}

async function main() {
  await nspLoggingConfigurationDelete();
}

main().catch(console.error);
