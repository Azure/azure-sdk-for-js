// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  NspLoggingConfiguration} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates NSP logging configuration.
 *
 * @summary Creates or updates NSP logging configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspLoggingConfigurationPut.json
 */
async function nspLoggingConfigurationPut(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const loggingConfigurationName = "instance";
  const parameters: NspLoggingConfiguration = {
    enabledLogCategories: [
      "NspPublicInboundPerimeterRulesDenied",
      "NspPublicOutboundPerimeterRulesDenied",
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.networkSecurityPerimeterLoggingConfigurations.createOrUpdate(
      resourceGroupName,
      networkSecurityPerimeterName,
      loggingConfigurationName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await nspLoggingConfigurationPut();
}

main().catch(console.error);
