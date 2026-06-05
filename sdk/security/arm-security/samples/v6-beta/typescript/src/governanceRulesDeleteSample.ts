// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Governance rule over a given scope
 *
 * @summary delete a Governance rule over a given scope
 * x-ms-original-file: 2022-01-01-preview/GovernanceRules/DeleteGovernanceRule_example.json
 */
async function deleteAGovernanceRuleOverSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.governanceRules.delete(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
}

/**
 * This sample demonstrates how to delete a Governance rule over a given scope
 *
 * @summary delete a Governance rule over a given scope
 * x-ms-original-file: 2022-01-01-preview/GovernanceRules/DeleteManagementGroupGovernanceRule_example.json
 */
async function deleteAGovernanceRuleOverManagementGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.governanceRules.delete(
    "providers/Microsoft.Management/managementGroups/contoso",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
}

/**
 * This sample demonstrates how to delete a Governance rule over a given scope
 *
 * @summary delete a Governance rule over a given scope
 * x-ms-original-file: 2022-01-01-preview/GovernanceRules/DeleteSecurityConnectorGovernanceRule_example.json
 */
async function deleteAGovernanceRuleOverSecurityConnectorScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.governanceRules.delete(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
  );
}

async function main(): Promise<void> {
  await deleteAGovernanceRuleOverSubscriptionScope();
  await deleteAGovernanceRuleOverManagementGroupScope();
  await deleteAGovernanceRuleOverSecurityConnectorScope();
}

main().catch(console.error);
