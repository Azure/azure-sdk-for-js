// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation acquires a policy token in the given resource group for the given request body.
 *
 * @summary this operation acquires a policy token in the given resource group for the given request body.
 * x-ms-original-file: 2026-07-01/acquirePolicyTokenAtResourceGroup.json
 */
async function acquireAPolicyTokenAtResourceGroupLevel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policyTokens.acquireAtResourceGroup("testRG", {
    operation: {
      httpMethod: "delete",
      uri: "https://management.azure.com/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/testRG/providers/Microsoft.Compute/virtualMachines/testVM?api-version=2024-01-01",
    },
  });
  console.log(result);
}

async function main() {
  await acquireAPolicyTokenAtResourceGroupLevel();
}

main().catch(console.error);
