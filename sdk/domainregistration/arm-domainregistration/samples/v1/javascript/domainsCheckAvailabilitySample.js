// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Check if a domain is available for registration.
 *
 * @summary description for Check if a domain is available for registration.
 * x-ms-original-file: 2024-11-01/CheckDomainAvailability.json
 */
async function checkDomainAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.domains.checkAvailability({ name: "abcd.com" });
  console.log(result);
}

async function main() {
  await checkDomainAvailability();
}

main().catch(console.error);
