// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists security policies associated with the profile
 *
 * @summary lists security policies associated with the profile
 * x-ms-original-file: 2025-12-01/SecurityPolicies_ListByProfile.json
 */
async function securityPoliciesListByProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityPolicies.listByProfile("RG", "profile1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await securityPoliciesListByProfile();
}

main().catch(console.error);
