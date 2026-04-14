// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to delete a Domains resource.
 *
 * @summary operation to delete a Domains resource.
 * x-ms-original-file: 2026-03-18/domains/delete.json
 */
async function deleteDomainsResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  await client.domains.delete("MyResourceGroup", "MyEmailServiceResource", "mydomain.com");
}

async function main() {
  await deleteDomainsResource();
}

main().catch(console.error);
