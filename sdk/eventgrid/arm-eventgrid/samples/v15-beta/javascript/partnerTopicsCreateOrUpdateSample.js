// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to asynchronously creates a new partner topic with the specified parameters.
 *
 * @summary asynchronously creates a new partner topic with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/PartnerTopics_CreateOrUpdate.json
 */
async function partnerTopicsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerTopics.createOrUpdate(
    "examplerg",
    "examplePartnerTopicName1",
    {
      location: "westus2",
      expirationTimeIfNotActivatedUtc: new Date("2022-03-23T23:06:13.109Z"),
      messageForActivation: "Example message for activation",
      partnerRegistrationImmutableId: "6f541064-031d-4cc8-9ec3-a3b4fc0f7185",
      partnerTopicFriendlyDescription: "Example description",
      source: "ContosoCorp.Accounts.User1",
    },
  );
  console.log(result);
}

async function main() {
  await partnerTopicsCreateOrUpdate();
}

main().catch(console.error);
