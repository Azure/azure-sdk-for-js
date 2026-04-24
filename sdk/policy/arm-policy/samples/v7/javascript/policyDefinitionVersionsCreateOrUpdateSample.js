// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation creates or updates a policy definition in the given subscription with the given name.
 *
 * @summary this operation creates or updates a policy definition in the given subscription with the given name.
 * x-ms-original-file: 2025-03-01/createOrUpdatePolicyDefinitionVersion.json
 */
async function createOrUpdateAPolicyDefinitionVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policyDefinitionVersions.createOrUpdate("ResourceNaming", "1.2.1", {
    description: "Force resource names to begin with given 'prefix' and/or end with given 'suffix'",
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
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAPolicyDefinitionVersion();
}

main().catch(console.error);
