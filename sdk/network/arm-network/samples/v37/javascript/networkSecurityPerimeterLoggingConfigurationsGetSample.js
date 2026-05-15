// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the NSP logging configuration.
 *
 * @summary gets the NSP logging configuration.
 * x-ms-original-file: 2025-05-01/NspLoggingConfigurationGet.json
 */
async function nspLoggingConfigurationGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterLoggingConfigurations.get(
    "rg1",
    "nsp1",
    "instance",
  );
  console.log(result);
}

async function main() {
  await nspLoggingConfigurationGet();
}

main().catch(console.error);
