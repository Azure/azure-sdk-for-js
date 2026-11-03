// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to initiate verification of DNS record.
 *
 * @summary initiate verification of DNS record.
 * x-ms-original-file: 2026-03-18/domains/initiateVerification.json
 */
async function initiateVerification() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  await client.domains.initiateVerification(
    "MyResourceGroup",
    "MyEmailServiceResource",
    "mydomain.com",
    { verificationType: "SPF" },
  );
}

async function main() {
  await initiateVerification();
}

main().catch(console.error);
