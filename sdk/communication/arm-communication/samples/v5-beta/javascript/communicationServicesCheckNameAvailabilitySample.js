// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks that the CommunicationService name is valid and is not already in use.
 *
 * @summary checks that the CommunicationService name is valid and is not already in use.
 * x-ms-original-file: 2026-03-18/communicationServices/checkNameAvailabilityAvailable.json
 */
async function checkNameAvailabilityAvailable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.checkNameAvailability({
    name: "MyCommunicationService",
    type: "Microsoft.Communication/CommunicationServices",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to checks that the CommunicationService name is valid and is not already in use.
 *
 * @summary checks that the CommunicationService name is valid and is not already in use.
 * x-ms-original-file: 2026-03-18/communicationServices/checkNameAvailabilityUnavailable.json
 */
async function checkNameAvailabilityUnavailable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.communicationServices.checkNameAvailability({
    name: "MyCommunicationService",
    type: "Microsoft.Communication/CommunicationServices",
  });
  console.log(result);
}

async function main() {
  await checkNameAvailabilityAvailable();
  await checkNameAvailabilityUnavailable();
}

main().catch(console.error);
