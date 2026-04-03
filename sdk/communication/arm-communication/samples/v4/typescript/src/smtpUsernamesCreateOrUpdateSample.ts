// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SmtpUsernameResource} from "@azure/arm-communication";
import {
  CommunicationServiceManagementClient,
} from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update an SmtpUsernameResource.
 *
 * @summary Create or update an SmtpUsernameResource.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/smtpUsername/createOrUpdate.json
 */
async function createOrUpdateSmtpUsernameResource(): Promise<void> {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] ||
    "11112222-3333-4444-5555-666677778888";
  const resourceGroupName =
    process.env["COMMUNICATION_RESOURCE_GROUP"] || "contosoResourceGroup";
  const communicationServiceName = "contosoACSService";
  const smtpUsername = "smtpusername1";
  const parameters: SmtpUsernameResource = {
    entraApplicationId: "aaaa1111-bbbb-2222-3333-aaaa111122bb",
    tenantId: "aaaa1111-bbbb-2222-3333-aaaa11112222",
    username: "newuser1@contoso.com",
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.smtpUsernames.createOrUpdate(
    resourceGroupName,
    communicationServiceName,
    smtpUsername,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateSmtpUsernameResource();
}

main().catch(console.error);
