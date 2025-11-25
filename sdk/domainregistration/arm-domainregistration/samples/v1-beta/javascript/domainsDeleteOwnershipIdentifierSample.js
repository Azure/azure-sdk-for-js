// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Description for Delete ownership identifier for domain
 *
 * @summary Description for Delete ownership identifier for domain
 * x-ms-original-file: specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/examples/DeleteAppServiceDomainOwnershipIdentifier.json
 */
async function deleteAppServiceDomainOwnershipIdentifier() {
  const subscriptionId =
    process.env["DOMAINREGISTRATION_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["DOMAINREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const domainName = "example.com";
  const name = "ownershipIdentifier";
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.domains.deleteOwnershipIdentifier(
    resourceGroupName,
    domainName,
    name,
  );
  console.log(result);
}

async function main() {
  await deleteAppServiceDomainOwnershipIdentifier();
}

main().catch(console.error);
