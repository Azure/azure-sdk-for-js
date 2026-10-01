// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to policies for protecting resources using Just-in-Time access control for the subscription, location
 *
 * @summary policies for protecting resources using Just-in-Time access control for the subscription, location
 * x-ms-original-file: 2020-01-01/JitNetworkAccessPolicies/GetJitNetworkAccessPoliciesResourceGroup_example.json
 */
async function getJITNetworkAccessPoliciesOnAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jitNetworkAccessPolicies.listByResourceGroup("myRg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getJITNetworkAccessPoliciesOnAResourceGroup();
}

main().catch(console.error);
