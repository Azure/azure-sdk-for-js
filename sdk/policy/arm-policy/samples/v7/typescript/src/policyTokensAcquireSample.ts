// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation acquires a policy token in the given subscription for the given request body.
 *
 * @summary this operation acquires a policy token in the given subscription for the given request body.
 * x-ms-original-file: 2025-03-01/acquirePolicyToken.json
 */
async function acquireAPolicyToken(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policyTokens.acquire({
    operation: {
      httpMethod: "delete",
      uri: "https://management.azure.com/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/testRG/providers/Microsoft.Compute/virtualMachines/testVM?api-version=2024-01-01",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await acquireAPolicyToken();
}

main().catch(console.error);
