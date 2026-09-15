// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves the list of all variables associated with the given subscription.
 *
 * @summary this operation retrieves the list of all variables associated with the given subscription.
 * x-ms-original-file: 2026-01-01-preview/listVariablesForSubscription.json
 */
async function listVariablesThatApplyToASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.variables.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listVariablesThatApplyToASubscription();
}

main().catch(console.error);
