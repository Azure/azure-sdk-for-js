// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the private links in the specified subscription. private links enable secure, private connectivity to Microsoft Defender for Cloud services without exposing traffic to the public internet. Use the 'nextLink' property in the response to get the next page of private links for the specified subscription.
 *
 * @summary lists all the private links in the specified subscription. private links enable secure, private connectivity to Microsoft Defender for Cloud services without exposing traffic to the public internet. Use the 'nextLink' property in the response to get the next page of private links for the specified subscription.
 * x-ms-original-file: 2026-01-01/PrivateLinks/PrivateLinks_ListBySubscription.json
 */
async function listPrivateLinksBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinks.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateLinksBySubscription();
}

main().catch(console.error);
