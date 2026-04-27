// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves the policy definition in the given subscription with the given name.
 *
 * @summary this operation retrieves the policy definition in the given subscription with the given name.
 * x-ms-original-file: 2025-03-01/getPolicyDefinition.json
 */
async function retrieveAPolicyDefinition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policyDefinitions.get("ResourceNaming");
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveAPolicyDefinition();
}

main().catch(console.error);
