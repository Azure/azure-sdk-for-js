// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to authorize a single partner either by partner registration immutable Id or by partner name.
 *
 * @summary authorize a single partner either by partner registration immutable Id or by partner name.
 * x-ms-original-file: 2025-07-15-preview/PartnerConfigurations_AuthorizePartner.json
 */
async function partnerConfigurationsAuthorizePartner(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerConfigurations.authorizePartner("examplerg", {
    authorizationExpirationTimeInUtc: new Date("2022-01-28T01:20:55.142Z"),
    partnerName: "Contoso.Finance",
    partnerRegistrationImmutableId: "941892bc-f5d0-4d1c-8fb5-477570fc2b71",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await partnerConfigurationsAuthorizePartner();
}

main().catch(console.error);
