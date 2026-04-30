// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation deletes the policy set definition in the given management group with the given name.
 *
 * @summary this operation deletes the policy set definition in the given management group with the given name.
 * x-ms-original-file: 2025-03-01/deletePolicySetDefinitionAtManagementGroup.json
 */
async function deleteAPolicySetDefinitionAtManagementGroupLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  await client.policySetDefinitions.deleteAtManagementGroup("MyManagementGroup", "CostManagement");
}

async function main(): Promise<void> {
  await deleteAPolicySetDefinitionAtManagementGroupLevel();
}

main().catch(console.error);
