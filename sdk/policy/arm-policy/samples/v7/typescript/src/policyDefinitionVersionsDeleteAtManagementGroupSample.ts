// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation deletes the policy definition in the given management group with the given name.
 *
 * @summary this operation deletes the policy definition in the given management group with the given name.
 * x-ms-original-file: 2025-03-01/deletePolicyDefinitionVersionAtManagementGroup.json
 */
async function deleteAPolicyDefinitionVersionAtManagementGroupLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  await client.policyDefinitionVersions.deleteAtManagementGroup(
    "MyManagementGroup",
    "ResourceNaming",
    "1.2.1",
  );
}

async function main(): Promise<void> {
  await deleteAPolicyDefinitionVersionAtManagementGroupLevel();
}

main().catch(console.error);
