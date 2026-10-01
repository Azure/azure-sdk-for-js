// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of all relevant governance rules over a scope
 *
 * @summary get a list of all relevant governance rules over a scope
 * x-ms-original-file: 2022-01-01-preview/GovernanceRules/ListByManagementGroupGovernanceRules_example.json
 */
async function listGovernanceRulesByManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.governanceRules.list(
    "providers/Microsoft.Management/managementGroups/contoso",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get a list of all relevant governance rules over a scope
 *
 * @summary get a list of all relevant governance rules over a scope
 * x-ms-original-file: 2022-01-01-preview/GovernanceRules/ListBySecurityConnectorGovernanceRules_example.json
 */
async function listGovernanceRulesBySecurityConnectorScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.governanceRules.list(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get a list of all relevant governance rules over a scope
 *
 * @summary get a list of all relevant governance rules over a scope
 * x-ms-original-file: 2022-01-01-preview/GovernanceRules/ListBySubscriptionGovernanceRules_example.json
 */
async function listGovernanceRulesBySubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.governanceRules.list(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listGovernanceRulesByManagementGroupScope();
  await listGovernanceRulesBySecurityConnectorScope();
  await listGovernanceRulesBySubscriptionScope();
}

main().catch(console.error);
