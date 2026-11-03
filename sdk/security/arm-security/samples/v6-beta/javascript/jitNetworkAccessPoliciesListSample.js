// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to policies for protecting resources using Just-in-Time access control.
 *
 * @summary policies for protecting resources using Just-in-Time access control.
 * x-ms-original-file: 2020-01-01/JitNetworkAccessPolicies/GetJitNetworkAccessPoliciesSubscription_example.json
 */
async function getJITNetworkAccessPoliciesOnASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jitNetworkAccessPolicies.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getJITNetworkAccessPoliciesOnASubscription();
}

main().catch(console.error);
