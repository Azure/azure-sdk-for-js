// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves the built-in policy definition version with the given name.
 *
 * @summary this operation retrieves the built-in policy definition version with the given name.
 * x-ms-original-file: 2025-03-01/getBuiltinPolicyDefinitionVersion.json
 */
async function retrieveABuiltInPolicyDefinitionVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyDefinitionVersions.getBuiltIn(
    "7433c107-6db4-4ad1-b57a-a76dce0154a1",
    "1.2.1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveABuiltInPolicyDefinitionVersion();
}

main().catch(console.error);
