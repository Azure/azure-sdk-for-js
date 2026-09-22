// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to add a new Domains resource under the parent EmailService resource or update an existing Domains resource.
 *
 * @summary add a new Domains resource under the parent EmailService resource or update an existing Domains resource.
 * x-ms-original-file: 2026-03-18/domains/createOrUpdate.json
 */
async function createOrUpdateDomainsResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.domains.createOrUpdate(
    "MyResourceGroup",
    "MyEmailServiceResource",
    "mydomain.com",
    { location: "Global", domainManagement: "CustomerManaged" },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateDomainsResource();
}

main().catch(console.error);
