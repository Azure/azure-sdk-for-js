// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to execute a governance rule
 *
 * @summary execute a governance rule
 * x-ms-original-file: 2022-01-01-preview/GovernanceRules/PostGovernanceRule_example.json
 */
async function executeGovernanceRuleOverSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.governanceRules.execute(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
}

/**
 * This sample demonstrates how to execute a governance rule
 *
 * @summary execute a governance rule
 * x-ms-original-file: 2022-01-01-preview/GovernanceRules/PostManagementGroupGovernanceRule_example.json
 */
async function executeGovernanceRuleOverManagementGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.governanceRules.execute(
    "providers/Microsoft.Management/managementGroups/contoso",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
}

/**
 * This sample demonstrates how to execute a governance rule
 *
 * @summary execute a governance rule
 * x-ms-original-file: 2022-01-01-preview/GovernanceRules/PostSecurityConnectorGovernanceRule_example.json
 */
async function executeGovernanceRuleOverSecurityConnectorScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.governanceRules.execute(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
}

async function main(): Promise<void> {
  await executeGovernanceRuleOverSubscriptionScope();
  await executeGovernanceRuleOverManagementGroupScope();
  await executeGovernanceRuleOverSecurityConnectorScope();
}

main().catch(console.error);
