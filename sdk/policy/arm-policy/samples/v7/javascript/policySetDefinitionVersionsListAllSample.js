// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation lists all the policy set definition versions for all policy set definitions within a subscription.
 *
 * @summary this operation lists all the policy set definition versions for all policy set definitions within a subscription.
 * x-ms-original-file: 2025-03-01/listAllPolicySetDefinitionVersions.json
 */
async function listAllPolicyDefinitionVersionsAtSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policySetDefinitionVersions.listAll();
  console.log(result);
}

async function main() {
  await listAllPolicyDefinitionVersionsAtSubscription();
}

main().catch(console.error);
