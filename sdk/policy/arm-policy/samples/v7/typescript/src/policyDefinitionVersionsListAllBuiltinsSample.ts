// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation lists all the built-in policy definition versions for all built-in policy definitions.
 *
 * @summary this operation lists all the built-in policy definition versions for all built-in policy definitions.
 * x-ms-original-file: 2025-03-01/listAllBuiltInPolicyDefinitionVersions.json
 */
async function listAllBuiltInPolicyDefinitionVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyDefinitionVersions.listAllBuiltins();
  console.log(result);
}

async function main(): Promise<void> {
  await listAllBuiltInPolicyDefinitionVersions();
}

main().catch(console.error);
