// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a SmtpUsernameResource.
 *
 * @summary Get a SmtpUsernameResource.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/smtpUsername/get.json
 */
async function getASmtpUsernameResource(): Promise<void> {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] ||
    "11112222-3333-4444-5555-666677778888";
  const resourceGroupName =
    process.env["COMMUNICATION_RESOURCE_GROUP"] || "contosoResourceGroup";
  const communicationServiceName = "contosoACSService";
  const smtpUsername = "smtpusername1";
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.smtpUsernames.get(
    resourceGroupName,
    communicationServiceName,
    smtpUsername,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASmtpUsernameResource();
}

main().catch(console.error);
