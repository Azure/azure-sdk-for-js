// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new partner registration with the specified parameters.
 *
 * @summary creates a new partner registration with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/PartnerRegistrations_CreateOrUpdate.json
 */
async function partnerRegistrationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerRegistrations.createOrUpdate(
    "examplerg",
    "examplePartnerRegistrationName1",
    { location: "global", tags: { key1: "value1", key2: "Value2", key3: "Value3" } },
  );
  console.log(result);
}

async function main() {
  await partnerRegistrationsCreateOrUpdate();
}

main().catch(console.error);
