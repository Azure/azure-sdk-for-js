// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation retrieves the built-in policy set definition with the given name.
 *
 * @summary This operation retrieves the built-in policy set definition with the given name.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/getBuiltInPolicySetDefinition.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function retrieveABuiltInPolicySetDefinition(): Promise<void> {
  const policySetDefinitionName = "1f3afdf9-d0c9-4c3d-847f-89da613e70a8";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitions.getBuiltIn(
    policySetDefinitionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveABuiltInPolicySetDefinition();
}

main().catch(console.error);
