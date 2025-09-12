// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Add a new Domains resource under the parent EmailService resource or update an existing Domains resource.
 *
 * @summary Add a new Domains resource under the parent EmailService resource or update an existing Domains resource.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/domains/createOrUpdate.json
 */

import type { DomainResource } from "@azure/arm-communication";
import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateDomainsResource(): Promise<void> {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const emailServiceName = "MyEmailServiceResource";
  const domainName = "mydomain.com";
  const parameters: DomainResource = {
    domainManagement: "CustomerManaged",
    location: "Global",
  };
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.domains.beginCreateOrUpdateAndWait(
    resourceGroupName,
    emailServiceName,
    domainName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateDomainsResource();
}

main().catch(console.error);
