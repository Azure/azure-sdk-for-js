// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an SmtpUsernameResource.
 *
 * @summary create or update an SmtpUsernameResource.
 * x-ms-original-file: 2026-03-18/smtpUsername/createOrUpdate.json
 */
async function createOrUpdateSmtpUsernameResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.smtpUsernames.createOrUpdate(
    "contosoResourceGroup",
    "contosoACSService",
    "smtpusername1",
    {
      entraApplicationId: "aaaa1111-bbbb-2222-3333-aaaa111122bb",
      tenantId: "aaaa1111-bbbb-2222-3333-aaaa11112222",
      username: "newuser1@contoso.com",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateSmtpUsernameResource();
}

main().catch(console.error);
