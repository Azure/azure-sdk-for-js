// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { VerifiedIdClient } = require("@azure/arm-verifiedid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Authority resources by subscription ID
 *
 * @summary list Authority resources by subscription ID
 * x-ms-original-file: 2024-01-26-preview/Authorities_ListBySubscription.json
 */
async function authoritiesListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new VerifiedIdClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authorities.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await authoritiesListBySubscription();
}

main().catch(console.error);
