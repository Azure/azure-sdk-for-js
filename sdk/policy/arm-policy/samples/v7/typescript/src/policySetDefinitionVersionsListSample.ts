// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves a list of all the policy set definition versions for the given policy set definition.
 *
 * @summary this operation retrieves a list of all the policy set definition versions for the given policy set definition.
 * x-ms-original-file: 2025-03-01/listPolicySetDefinitionVersions.json
 */
async function listPolicySetDefinitions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policySetDefinitionVersions.list("CostManagement")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPolicySetDefinitions();
}

main().catch(console.error);
