// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SecurityUserConfigurationsDeleteOptionalParams} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a network manager security user configuration.
 *
 * @summary Deletes a network manager security user configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerSecurityUserConfigurationDelete.json
 */
async function deleteNetworkManagerSecurityUserConfiguration(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestSecurityConfig";
  const force = false;
  const options: SecurityUserConfigurationsDeleteOptionalParams = { force };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityUserConfigurations.beginDeleteAndWait(
    resourceGroupName,
    networkManagerName,
    configurationName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteNetworkManagerSecurityUserConfiguration();
}

main().catch(console.error);
