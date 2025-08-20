// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation retrieves a list of all the built-in policy set definitions that match the optional given $filter. If $filter='category -eq {value}' is provided, the returned list only includes all built-in policy set definitions whose category match the {value}.
 *
 * @summary This operation retrieves a list of all the built-in policy set definitions that match the optional given $filter. If $filter='category -eq {value}' is provided, the returned list only includes all built-in policy set definitions whose category match the {value}.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/listBuiltInPolicySetDefinitions.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listBuiltInPolicySetDefinitions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const resArray = new Array();
  for await (const item of client.policySetDefinitions.listBuiltIn()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listBuiltInPolicySetDefinitions();
}

main().catch(console.error);
