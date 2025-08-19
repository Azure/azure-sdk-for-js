// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a security user rule.
 *
 * @summary Creates or updates a security user rule.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/NetworkManagerSecurityUserRulePut.json
 */

import type { SecurityUserRule} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createASecurityUserRule(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestSecurityConfig";
  const ruleCollectionName = "testRuleCollection";
  const ruleName = "SampleUserRule";
  const securityUserRule: SecurityUserRule = {
    description: "Sample User Rule",
    destinationPortRanges: ["22"],
    destinations: [{ addressPrefix: "*", addressPrefixType: "IPPrefix" }],
    direction: "Inbound",
    sourcePortRanges: ["0-65535"],
    sources: [{ addressPrefix: "*", addressPrefixType: "IPPrefix" }],
    protocol: "Tcp",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityUserRules.createOrUpdate(
    resourceGroupName,
    networkManagerName,
    configurationName,
    ruleCollectionName,
    ruleName,
    securityUserRule,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createASecurityUserRule();
}

main().catch(console.error);
