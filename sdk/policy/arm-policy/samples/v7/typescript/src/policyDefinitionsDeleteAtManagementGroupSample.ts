// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation deletes the policy definition in the given management group with the given name.
 *
 * @summary this operation deletes the policy definition in the given management group with the given name.
 * x-ms-original-file: 2025-03-01/deletePolicyDefinitionAtManagementGroup.json
 */
async function deleteAPolicyDefinitionAtManagementGroupLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  await client.policyDefinitions.deleteAtManagementGroup("MyManagementGroup", "ResourceNaming");
}

async function main(): Promise<void> {
  await deleteAPolicyDefinitionAtManagementGroupLevel();
}

main().catch(console.error);
