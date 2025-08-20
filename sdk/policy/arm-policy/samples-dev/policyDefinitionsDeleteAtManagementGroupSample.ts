// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation deletes the policy definition in the given management group with the given name.
 *
 * @summary This operation deletes the policy definition in the given management group with the given name.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/deletePolicyDefinitionAtManagementGroup.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAPolicyDefinitionAtManagementGroupLevel(): Promise<void> {
  const managementGroupId = "MyManagementGroup";
  const policyDefinitionName = "ResourceNaming";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyDefinitions.deleteAtManagementGroup(
    managementGroupId,
    policyDefinitionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAPolicyDefinitionAtManagementGroupLevel();
}

main().catch(console.error);
