// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation creates or updates a policy definition version in the given management group with the given name.
 *
 * @summary this operation creates or updates a policy definition version in the given management group with the given name.
 * x-ms-original-file: 2025-03-01/createOrUpdatePolicyDefinitionVersionAtManagementGroup.json
 */
async function createOrUpdateAPolicyDefinitionVersionAtManagementGroupLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyDefinitionVersions.createOrUpdateAtManagementGroup(
    "MyManagementGroup",
    "ResourceNaming",
    "1.2.1",
    {
      description:
        "Force resource names to begin with given 'prefix' and/or end with given 'suffix'",
      displayName: "Enforce resource naming convention",
      metadata: { category: "Naming" },
      mode: "All",
      parameters: {
        prefix: {
          type: "String",
          metadata: { description: "Resource name prefix", displayName: "Prefix" },
        },
        suffix: {
          type: "String",
          metadata: { description: "Resource name suffix", displayName: "Suffix" },
        },
      },
      policyRule: {
        if: {
          not: { field: "name", like: "[concat(parameters('prefix'), '*', parameters('suffix'))]" },
        },
        then: { effect: "deny" },
      },
      version: "1.2.1",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAPolicyDefinitionVersionAtManagementGroupLevel();
}

main().catch(console.error);
