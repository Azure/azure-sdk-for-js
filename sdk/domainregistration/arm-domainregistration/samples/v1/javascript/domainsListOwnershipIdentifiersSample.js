// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Lists domain ownership identifiers.
 *
 * @summary description for Lists domain ownership identifiers.
 * x-ms-original-file: 2024-11-01/ListDomainOwnershipIdentifiers.json
 */
async function listDomainOwnershipIdentifiers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.domains.listOwnershipIdentifiers("testrg123", "example.com")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDomainOwnershipIdentifiers();
}

main().catch(console.error);
