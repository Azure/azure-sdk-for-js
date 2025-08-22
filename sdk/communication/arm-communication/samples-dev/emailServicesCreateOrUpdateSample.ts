// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a new EmailService or update an existing EmailService.
 *
 * @summary Create a new EmailService or update an existing EmailService.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/emailServices/createOrUpdate.json
 */

import type { EmailServiceResource } from "@azure/arm-communication";
import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateEmailServiceResource(): Promise<void> {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const emailServiceName = "MyEmailServiceResource";
  const parameters: EmailServiceResource = {
    dataLocation: "United States",
    location: "Global",
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.emailServices.beginCreateOrUpdateAndWait(
    resourceGroupName,
    emailServiceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateEmailServiceResource();
}

main().catch(console.error);
