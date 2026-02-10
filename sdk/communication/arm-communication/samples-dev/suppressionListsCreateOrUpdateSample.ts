// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SuppressionListResource} from "@azure/arm-communication";
import {
  CommunicationServiceManagementClient,
} from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Add a new SuppressionList resource under the parent Domains resource or update an existing SuppressionList resource.
 *
 * @summary Add a new SuppressionList resource under the parent Domains resource or update an existing SuppressionList resource.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2025-09-01/examples/suppressionLists/createOrUpdateSuppressionList.json
 */
async function createOrUpdateSuppressionListsResource(): Promise<void> {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] ||
    "11112222-3333-4444-5555-666677778888";
  const resourceGroupName =
    process.env["COMMUNICATION_RESOURCE_GROUP"] || "contosoResourceGroup";
  const emailServiceName = "contosoEmailService";
  const domainName = "contoso.com";
  const suppressionListName = "aaaa1111-bbbb-2222-3333-aaaa11112222";
  const parameters: SuppressionListResource = { listName: "contosoNewsAlerts" };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.suppressionLists.createOrUpdate(
    resourceGroupName,
    emailServiceName,
    domainName,
    suppressionListName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateSuppressionListsResource();
}

main().catch(console.error);
