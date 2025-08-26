// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation retrieves the built-in policy definition version with the given name.
 *
 * @summary This operation retrieves the built-in policy definition version with the given name.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/getBuiltinPolicyDefinitionVersion.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function retrieveABuiltInPolicyDefinitionVersion(): Promise<void> {
  const policyDefinitionName = "7433c107-6db4-4ad1-b57a-a76dce0154a1";
  const policyDefinitionVersion = "1.2.1";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyDefinitionVersions.getBuiltIn(
    policyDefinitionName,
    policyDefinitionVersion,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveABuiltInPolicyDefinitionVersion();
}

main().catch(console.error);
