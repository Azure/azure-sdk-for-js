// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete a SuppressionList.
 *
 * @summary Delete a SuppressionList.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/suppressionLists/deleteSuppressionList.json
 */
async function deleteASuppressionListsResource(): Promise<void> {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] ||
    "11112222-3333-4444-5555-666677778888";
  const resourceGroupName =
    process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const emailServiceName = "MyEmailServiceResource";
  const domainName = "mydomain.com";
  const suppressionListName = "aaaa1111-bbbb-2222-3333-aaaa11112222";
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.suppressionLists.delete(
    resourceGroupName,
    emailServiceName,
    domainName,
    suppressionListName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteASuppressionListsResource();
}

main().catch(console.error);
