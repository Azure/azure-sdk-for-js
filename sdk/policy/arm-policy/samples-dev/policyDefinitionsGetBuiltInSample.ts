// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation retrieves the built-in policy definition with the given name.
 *
 * @summary This operation retrieves the built-in policy definition with the given name.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/getBuiltinPolicyDefinition.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function retrieveABuiltInPolicyDefinition(): Promise<void> {
  const policyDefinitionName = "7433c107-6db4-4ad1-b57a-a76dce0154a1";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result =
    await client.policyDefinitions.getBuiltIn(policyDefinitionName);
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveABuiltInPolicyDefinition();
}

main().catch(console.error);
