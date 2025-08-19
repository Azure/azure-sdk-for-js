// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a Governance rule over a given scope
 *
 * @summary Delete a Governance rule over a given scope
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-01-01-preview/examples/GovernanceRules/DeleteManagementGroupGovernanceRule_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAGovernanceRuleOverManagementGroupScope(): Promise<void> {
  const scope = "providers/Microsoft.Management/managementGroups/contoso";
  const ruleId = "ad9a8e26-29d9-4829-bb30-e597a58cdbb8";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceRules.beginDeleteAndWait(scope, ruleId);
  console.log(result);
}

/**
 * This sample demonstrates how to Delete a Governance rule over a given scope
 *
 * @summary Delete a Governance rule over a given scope
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-01-01-preview/examples/GovernanceRules/DeleteSecurityConnectorGovernanceRule_example.json
 */
async function deleteAGovernanceRuleOverSecurityConnectorScope(): Promise<void> {
  const scope =
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector";
  const ruleId = "ad9a8e26-29d9-4829-bb30-e597a58cdbb8";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceRules.beginDeleteAndWait(scope, ruleId);
  console.log(result);
}

/**
 * This sample demonstrates how to Delete a Governance rule over a given scope
 *
 * @summary Delete a Governance rule over a given scope
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-01-01-preview/examples/GovernanceRules/DeleteGovernanceRule_example.json
 */
async function deleteAGovernanceRuleOverSubscriptionScope(): Promise<void> {
  const scope = "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const ruleId = "ad9a8e26-29d9-4829-bb30-e597a58cdbb8";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceRules.beginDeleteAndWait(scope, ruleId);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAGovernanceRuleOverManagementGroupScope();
  await deleteAGovernanceRuleOverSecurityConnectorScope();
  await deleteAGovernanceRuleOverSubscriptionScope();
}

main().catch(console.error);
