// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves a list of all the built-in policy set definition versions for the given built-in policy set definition.
 *
 * @summary this operation retrieves a list of all the built-in policy set definition versions for the given built-in policy set definition.
 * x-ms-original-file: 2025-03-01/listBuiltInPolicySetDefinitionVersions.json
 */
async function listBuiltInPolicySetDefinitions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const resArray = new Array();
  for await (const item of client.policySetDefinitionVersions.listBuiltIn(
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listBuiltInPolicySetDefinitions();
}

main().catch(console.error);
