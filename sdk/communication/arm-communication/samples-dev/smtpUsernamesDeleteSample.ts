// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Operation to delete a single SmtpUsername resource.
 *
 * @summary Operation to delete a single SmtpUsername resource.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/smtpUsername/delete.json
 */
async function deleteASmtpUsernameResource(): Promise<void> {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] ||
    "11112222-3333-4444-5555-666677778888";
  const resourceGroupName =
    process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const communicationServiceName = "contosoACSService";
  const smtpUsername = "smtpusername1";
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.smtpUsernames.delete(
    resourceGroupName,
    communicationServiceName,
    smtpUsername,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteASmtpUsernameResource();
}

main().catch(console.error);
