// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves the list of all variable values associated with the given variable that is at a subscription level.
 *
 * @summary this operation retrieves the list of all variable values associated with the given variable that is at a subscription level.
 * x-ms-original-file: 2026-01-01-preview/listVariableValuesForSubscription.json
 */
async function listVariableValuesThatApplyToAVariableAtSubscriptionLevel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.variableValues.list("DemoTestVariable")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVariableValuesThatApplyToAVariableAtSubscriptionLevel();
}

main().catch(console.error);
