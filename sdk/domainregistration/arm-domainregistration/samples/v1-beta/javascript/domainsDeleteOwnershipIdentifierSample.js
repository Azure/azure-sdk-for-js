// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Delete ownership identifier for domain
 *
 * @summary description for Delete ownership identifier for domain
 * x-ms-original-file: 2024-11-01/DeleteAppServiceDomainOwnershipIdentifier.json
 */
async function deleteAppServiceDomainOwnershipIdentifier() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  await client.domains.deleteOwnershipIdentifier("testrg123", "example.com", "ownershipIdentifier");
}

async function main() {
  await deleteAppServiceDomainOwnershipIdentifier();
}

main().catch(console.error);
