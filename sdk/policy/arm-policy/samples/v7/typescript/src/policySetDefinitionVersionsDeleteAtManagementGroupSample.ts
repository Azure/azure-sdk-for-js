// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation deletes the policy set definition version in the given management group with the given name and version.
 *
 * @summary this operation deletes the policy set definition version in the given management group with the given name and version.
 * x-ms-original-file: 2025-03-01/deletePolicySetDefinitionVersionAtManagementGroup.json
 */
async function deleteAPolicySetDefinitionVersionAtManagementGroupLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  await client.policySetDefinitionVersions.deleteAtManagementGroup(
    "MyManagementGroup",
    "CostManagement",
    "1.2.1",
  );
}

async function main(): Promise<void> {
  await deleteAPolicySetDefinitionVersionAtManagementGroupLevel();
}

main().catch(console.error);
