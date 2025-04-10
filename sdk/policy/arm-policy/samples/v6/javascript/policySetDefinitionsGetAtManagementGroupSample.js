/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to This operation retrieves the policy set definition in the given management group with the given name.
 *
 * @summary This operation retrieves the policy set definition in the given management group with the given name.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/getPolicySetDefinitionAtManagementGroup.json
 */
async function retrieveAPolicySetDefinitionAtManagementGroupLevel() {
  const managementGroupId = "MyManagementGroup";
  const policySetDefinitionName = "CostManagement";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitions.getAtManagementGroup(
    managementGroupId,
    policySetDefinitionName,
  );
  console.log(result);
}

async function main() {
  await retrieveAPolicySetDefinitionAtManagementGroupLevel();
}

main().catch(console.error);
