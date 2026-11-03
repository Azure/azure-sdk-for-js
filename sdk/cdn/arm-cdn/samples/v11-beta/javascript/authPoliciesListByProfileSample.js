// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists authorization policies associated with the profile.
 *
 * @summary lists authorization policies associated with the profile.
 * x-ms-original-file: 2026-09-01-preview/AuthPolicies_ListByProfile.json
 */
async function authPoliciesListByProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authPolicies.listByProfile("RG", "profile1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await authPoliciesListByProfile();
}

main().catch(console.error);
