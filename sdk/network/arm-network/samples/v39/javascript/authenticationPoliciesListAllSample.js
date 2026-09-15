// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the authentication policies in a subscription.
 *
 * @summary gets all the authentication policies in a subscription.
 * x-ms-original-file: 2026-01-01/AuthenticationPolicyListAll.json
 */
async function listsJWTValidationAndUserSignInAuthenticationPoliciesInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authenticationPolicies.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsJWTValidationAndUserSignInAuthenticationPoliciesInASubscription();
}

main().catch(console.error);
