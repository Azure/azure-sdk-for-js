// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation deletes the policy set definition in the given subscription with the given name.
 *
 * @summary this operation deletes the policy set definition in the given subscription with the given name.
 * x-ms-original-file: 2025-03-01/deletePolicySetDefinition.json
 */
async function deleteAPolicySetDefinition() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  await client.policySetDefinitions.delete("CostManagement");
}

async function main() {
  await deleteAPolicySetDefinition();
}

main().catch(console.error);
