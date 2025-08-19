// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation retrieves a list of all the built-in policy definitions that match the optional given $filter. If $filter='policyType -eq {value}' is provided, the returned list only includes all built-in policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all built-in policy definitions whose category match the {value}.
 *
 * @summary This operation retrieves a list of all the built-in policy definitions that match the optional given $filter. If $filter='policyType -eq {value}' is provided, the returned list only includes all built-in policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all built-in policy definitions whose category match the {value}.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/listBuiltInPolicyDefinitions.json
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listBuiltInPolicyDefinitions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const resArray = new Array();
  for await (const item of client.policyDefinitions.listBuiltIn()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listBuiltInPolicyDefinitions();
}

main().catch(console.error);
