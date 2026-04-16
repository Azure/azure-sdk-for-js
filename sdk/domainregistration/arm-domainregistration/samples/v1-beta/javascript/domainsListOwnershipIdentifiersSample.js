// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Description for Lists domain ownership identifiers.
 *
 * @summary Description for Lists domain ownership identifiers.
 * x-ms-original-file: specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/examples/ListDomainOwnershipIdentifiers.json
 */
async function listDomainOwnershipIdentifiers() {
  const subscriptionId =
    process.env["DOMAINREGISTRATION_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["DOMAINREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const domainName = "example.com";
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.domains.listOwnershipIdentifiers(resourceGroupName, domainName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listDomainOwnershipIdentifiers();
}

main().catch(console.error);
