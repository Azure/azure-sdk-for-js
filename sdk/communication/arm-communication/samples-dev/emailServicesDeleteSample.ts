// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Operation to delete a EmailService.
 *
 * @summary Operation to delete a EmailService.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/emailServices/delete.json
 */

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteEmailServiceResource(): Promise<void> {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const emailServiceName = "MyEmailServiceResource";
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.emailServices.beginDeleteAndWait(resourceGroupName, emailServiceName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteEmailServiceResource();
}

main().catch(console.error);
