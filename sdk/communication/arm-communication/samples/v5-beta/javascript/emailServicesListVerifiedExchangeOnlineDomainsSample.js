// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of domains that are fully verified in Exchange Online.
 *
 * @summary get a list of domains that are fully verified in Exchange Online.
 * x-ms-original-file: 2026-03-18/emailServices/getVerifiedExchangeOnlineDomains.json
 */
async function getVerifiedExchangeOnlineDomains() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.emailServices.listVerifiedExchangeOnlineDomains();
  console.log(result);
}

async function main() {
  await getVerifiedExchangeOnlineDomains();
}

main().catch(console.error);
