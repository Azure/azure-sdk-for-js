// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to synchronously creates or updates a partner configuration with the specified parameters.
 *
 * @summary synchronously creates or updates a partner configuration with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/PartnerConfigurations_CreateOrUpdate.json
 */
async function partnerConfigurationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerConfigurations.createOrUpdate("examplerg", {
    partnerAuthorization: {
      authorizedPartnersList: [
        {
          authorizationExpirationTimeInUtc: new Date("2022-01-28T01:20:55.142Z"),
          partnerName: "Contoso.Finance",
          partnerRegistrationImmutableId: "941892bc-f5d0-4d1c-8fb5-477570fc2b71",
        },
        {
          authorizationExpirationTimeInUtc: new Date("2022-02-20T01:00:00.142Z"),
          partnerName: "fabrikam.HR",
          partnerRegistrationImmutableId: "5362bdb6-ce3e-4d0d-9a5b-3eb92c8aab38",
        },
      ],
      defaultMaximumExpirationTimeInDays: 10,
    },
  });
  console.log(result);
}

async function main() {
  await partnerConfigurationsCreateOrUpdate();
}

main().catch(console.error);
