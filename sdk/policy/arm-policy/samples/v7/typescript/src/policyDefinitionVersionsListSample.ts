// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves a list of all the policy definition versions for the given policy definition.
 *
 * @summary this operation retrieves a list of all the policy definition versions for the given policy definition.
 * x-ms-original-file: 2025-03-01/listPolicyDefinitionVersions.json
 */
async function listPolicyDefinitionVersionsBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policyDefinitionVersions.list("ResourceNaming")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPolicyDefinitionVersionsBySubscription();
}

main().catch(console.error);
