// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation deletes the policy set definition in the given management group with the given name.
 *
 * @summary This operation deletes the policy set definition in the given management group with the given name.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/deletePolicySetDefinitionAtManagementGroup.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAPolicySetDefinitionAtManagementGroupLevel(): Promise<void> {
  const managementGroupId = "MyManagementGroup";
  const policySetDefinitionName = "CostManagement";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitions.deleteAtManagementGroup(
    managementGroupId,
    policySetDefinitionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAPolicySetDefinitionAtManagementGroupLevel();
}

main().catch(console.error);
