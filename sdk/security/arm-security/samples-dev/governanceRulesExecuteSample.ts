// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Execute a governance rule
 *
 * @summary Execute a governance rule
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-01-01-preview/examples/GovernanceRules/PostGovernanceRule_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function executeGovernanceRuleOverSubscriptionScope(): Promise<void> {
  const scope = "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const ruleId = "ad9a8e26-29d9-4829-bb30-e597a58cdbb8";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceRules.beginExecuteAndWait(scope, ruleId);
  console.log(result);
}

/**
 * This sample demonstrates how to Execute a governance rule
 *
 * @summary Execute a governance rule
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-01-01-preview/examples/GovernanceRules/PostManagementGroupGovernanceRule_example.json
 */
async function executeGovernanceRuleOverManagementGroupScope(): Promise<void> {
  const scope = "providers/Microsoft.Management/managementGroups/contoso";
  const ruleId = "ad9a8e26-29d9-4829-bb30-e597a58cdbb8";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceRules.beginExecuteAndWait(scope, ruleId);
  console.log(result);
}

/**
 * This sample demonstrates how to Execute a governance rule
 *
 * @summary Execute a governance rule
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-01-01-preview/examples/GovernanceRules/PostSecurityConnectorGovernanceRule_example.json
 */
async function executeGovernanceRuleOverSecurityConnectorScope(): Promise<void> {
  const scope =
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector";
  const ruleId = "ad9a8e26-29d9-4829-bb30-e597a58cdbb8";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceRules.beginExecuteAndWait(scope, ruleId);
  console.log(result);
}

async function main(): Promise<void> {
  await executeGovernanceRuleOverSubscriptionScope();
  await executeGovernanceRuleOverManagementGroupScope();
  await executeGovernanceRuleOverSecurityConnectorScope();
}

main().catch(console.error);
