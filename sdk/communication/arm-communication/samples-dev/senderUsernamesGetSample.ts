// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a valid sender username for a domains resource.
 *
 * @summary Get a valid sender username for a domains resource.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/senderUsernames/get.json
 */

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSenderUsernamesResource(): Promise<void> {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "contosoResourceGroup";
  const emailServiceName = "contosoEmailService";
  const domainName = "contoso.com";
  const senderUsername = "contosoNewsAlerts";
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.senderUsernames.get(
    resourceGroupName,
    emailServiceName,
    domainName,
    senderUsername,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSenderUsernamesResource();
}

main().catch(console.error);
