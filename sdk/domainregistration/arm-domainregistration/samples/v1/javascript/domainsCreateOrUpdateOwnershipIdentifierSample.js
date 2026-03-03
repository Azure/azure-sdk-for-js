// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier
 *
 * @summary description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier
 * x-ms-original-file: 2024-11-01/CreateAppServiceDomainOwnershipIdentifier.json
 */
async function createAppServiceDomainOwnershipIdentifier() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.domains.createOrUpdateOwnershipIdentifier(
    "testrg123",
    "example.com",
    "SampleOwnershipId",
    { ownershipId: "SampleOwnershipId" },
  );
  console.log(result);
}

async function main() {
  await createAppServiceDomainOwnershipIdentifier();
}

main().catch(console.error);
