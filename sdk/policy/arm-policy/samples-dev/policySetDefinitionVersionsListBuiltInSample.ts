// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation retrieves a list of all the built-in policy set definition versions for the given built-in policy set definition.
 *
 * @summary This operation retrieves a list of all the built-in policy set definition versions for the given built-in policy set definition.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/listBuiltInPolicySetDefinitionVersions.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listBuiltInPolicySetDefinitions(): Promise<void> {
  const policySetDefinitionName = "1f3afdf9-d0c9-4c3d-847f-89da613e70a8";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const resArray = new Array();
  for await (const item of client.policySetDefinitionVersions.listBuiltIn(
    policySetDefinitionName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listBuiltInPolicySetDefinitions();
}

main().catch(console.error);
