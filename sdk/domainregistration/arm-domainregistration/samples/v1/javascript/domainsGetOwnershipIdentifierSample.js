// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get ownership identifier for domain
 *
 * @summary description for Get ownership identifier for domain
 * x-ms-original-file: 2024-11-01/GetDomainOwnershipIdentifier.json
 */
async function getDomainOwnershipIdentifier() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.domains.getOwnershipIdentifier(
    "testrg123",
    "example.com",
    "SampleOwnershipId",
  );
  console.log(result);
}

async function main() {
  await getDomainOwnershipIdentifier();
}

main().catch(console.error);
