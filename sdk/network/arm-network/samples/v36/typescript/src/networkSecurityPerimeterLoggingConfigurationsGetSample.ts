// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the NSP logging configuration.
 *
 * @summary Gets the NSP logging configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspLoggingConfigurationGet.json
 */
async function nspLoggingConfigurationGet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const loggingConfigurationName = "instance";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterLoggingConfigurations.get(
    resourceGroupName,
    networkSecurityPerimeterName,
    loggingConfigurationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nspLoggingConfigurationGet();
}

main().catch(console.error);
