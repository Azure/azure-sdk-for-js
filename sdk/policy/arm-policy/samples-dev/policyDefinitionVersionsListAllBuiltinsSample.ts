// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation lists all the built-in policy definition versions for all built-in policy definitions.
 *
 * @summary This operation lists all the built-in policy definition versions for all built-in policy definitions.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/listAllBuiltInPolicyDefinitionVersions.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

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
