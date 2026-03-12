// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation deletes the policy definition in the given subscription with the given name.
 *
 * @summary This operation deletes the policy definition in the given subscription with the given name.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/deletePolicyDefinition.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAPolicyDefinition(): Promise<void> {
  const subscriptionId =
    process.env["POLICY_SUBSCRIPTION_ID"] ||
    "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const policyDefinitionName = "ResourceNaming";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policyDefinitions.delete(policyDefinitionName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAPolicyDefinition();
}

main().catch(console.error);
