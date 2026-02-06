// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation deletes the policy set definition version in the given subscription with the given name and version.
 *
 * @summary this operation deletes the policy set definition version in the given subscription with the given name and version.
 * x-ms-original-file: 2025-03-01/deletePolicySetDefinitionVersion.json
 */
async function deleteAPolicySetDefinitionVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  await client.policySetDefinitionVersions.delete("CostManagement", "1.2.1");
}

async function main() {
  await deleteAPolicySetDefinitionVersion();
}

main().catch(console.error);
