// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves a list of all the built-in policy definition versions for the given policy definition.
 *
 * @summary this operation retrieves a list of all the built-in policy definition versions for the given policy definition.
 * x-ms-original-file: 2025-03-01/listBuiltInPolicyDefinitionVersions.json
 */
async function listBuiltInPolicyDefinitionVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const resArray = new Array();
  for await (const item of client.policyDefinitionVersions.listBuiltIn(
    "06a78e20-9358-41c9-923c-fb736d382a12",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listBuiltInPolicyDefinitionVersions();
}

main().catch(console.error);
