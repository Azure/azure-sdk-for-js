// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a partner registration with the specified parameters.
 *
 * @summary gets a partner registration with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/PartnerRegistrations_Get.json
 */
async function partnerRegistrationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerRegistrations.get(
    "examplerg",
    "examplePartnerRegistrationName1",
  );
  console.log(result);
}

async function main() {
  await partnerRegistrationsGet();
}

main().catch(console.error);
