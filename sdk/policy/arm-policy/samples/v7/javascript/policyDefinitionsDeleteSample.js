// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation deletes the policy definition in the given subscription with the given name.
 *
 * @summary this operation deletes the policy definition in the given subscription with the given name.
 * x-ms-original-file: 2025-03-01/deletePolicyDefinition.json
 */
async function deleteAPolicyDefinition() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  await client.policyDefinitions.delete("ResourceNaming");
}

async function main() {
  await deleteAPolicyDefinition();
}

main().catch(console.error);
