// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific governance rule for the requested scope by ruleId
 *
 * @summary get a specific governance rule for the requested scope by ruleId
 * x-ms-original-file: 2022-01-01-preview/GovernanceRules/GetGovernanceRule_example.json
 */
async function getAGovernanceRuleOverSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceRules.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a specific governance rule for the requested scope by ruleId
 *
 * @summary get a specific governance rule for the requested scope by ruleId
 * x-ms-original-file: 2022-01-01-preview/GovernanceRules/GetManagementGroupGovernanceRule_example.json
 */
async function getAGovernanceRuleOverManagementGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceRules.get(
    "providers/Microsoft.Management/managementGroups/contoso",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a specific governance rule for the requested scope by ruleId
 *
 * @summary get a specific governance rule for the requested scope by ruleId
 * x-ms-original-file: 2022-01-01-preview/GovernanceRules/GetSecurityConnectorGovernanceRule_example.json
 */
async function getAGovernanceRuleOverSecurityConnectorScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceRules.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAGovernanceRuleOverSubscriptionScope();
  await getAGovernanceRuleOverManagementGroupScope();
  await getAGovernanceRuleOverSecurityConnectorScope();
}

main().catch(console.error);
