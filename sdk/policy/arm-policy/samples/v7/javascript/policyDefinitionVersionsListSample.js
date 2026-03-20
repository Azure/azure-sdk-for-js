// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves a list of all the policy definition versions for the given policy definition.
 *
 * @summary this operation retrieves a list of all the policy definition versions for the given policy definition.
 * x-ms-original-file: 2025-03-01/listPolicyDefinitionVersions.json
 */
async function listPolicyDefinitionVersionsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policyDefinitionVersions.list("ResourceNaming")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPolicyDefinitionVersionsBySubscription();
}

main().catch(console.error);
