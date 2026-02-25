// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier
 *
 * @summary Description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier
 * x-ms-original-file: specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/examples/CreateAppServiceDomainOwnershipIdentifier.json
 */
async function createAppServiceDomainOwnershipIdentifier() {
  const subscriptionId =
    process.env["DOMAINREGISTRATION_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["DOMAINREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const domainName = "example.com";
  const name = "SampleOwnershipId";
  const domainOwnershipIdentifier = {
    ownershipId: "SampleOwnershipId",
  };
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.domains.createOrUpdateOwnershipIdentifier(
    resourceGroupName,
    domainName,
    name,
    domainOwnershipIdentifier,
  );
  console.log(result);
}

async function main() {
  await createAppServiceDomainOwnershipIdentifier();
}

main().catch(console.error);
