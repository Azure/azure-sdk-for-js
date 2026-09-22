// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new EmailService or update an existing EmailService.
 *
 * @summary create a new EmailService or update an existing EmailService.
 * x-ms-original-file: 2026-03-18/emailServices/createOrUpdate.json
 */
async function createOrUpdateEmailServiceResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.emailServices.createOrUpdate(
    "MyResourceGroup",
    "MyEmailServiceResource",
    { location: "Global", dataLocation: "United States" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateEmailServiceResource();
}

main().catch(console.error);
