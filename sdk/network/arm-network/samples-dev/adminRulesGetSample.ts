// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a network manager security configuration admin rule.
 *
 * @summary gets a network manager security configuration admin rule.
 * x-ms-original-file: 2025-05-01/NetworkManagerAdminRuleGet.json
 */
async function getsSecurityAdminRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.adminRules.get(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    "testRuleCollection",
    "SampleAdminRule",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a network manager security configuration admin rule.
 *
 * @summary gets a network manager security configuration admin rule.
 * x-ms-original-file: 2025-05-01/NetworkManagerDefaultAdminRuleGet.json
 */
async function getsSecurityDefaultAdminRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.adminRules.get(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    "testRuleCollection",
    "SampleDefaultAdminRule",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsSecurityAdminRule();
  await getsSecurityDefaultAdminRule();
}

main().catch(console.error);
