// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a partner registration with the specified parameters.
 *
 * @summary deletes a partner registration with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/PartnerRegistrations_Delete.json
 */
async function partnerRegistrationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.partnerRegistrations.delete("examplerg", "examplePartnerRegistrationName1");
}

async function main() {
  await partnerRegistrationsDelete();
}

main().catch(console.error);
