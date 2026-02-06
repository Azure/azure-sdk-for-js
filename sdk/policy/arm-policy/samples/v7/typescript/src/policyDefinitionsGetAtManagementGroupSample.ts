// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves the policy definition in the given management group with the given name.
 *
 * @summary this operation retrieves the policy definition in the given management group with the given name.
 * x-ms-original-file: 2025-03-01/getPolicyDefinitionAtManagementGroup.json
 */
async function retrieveAPolicyDefinitionAtManagementGroupLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyDefinitions.getAtManagementGroup(
    "MyManagementGroup",
    "ResourceNaming",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveAPolicyDefinitionAtManagementGroupLevel();
}

main().catch(console.error);
