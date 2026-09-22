// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get a domain.
 *
 * @summary description for Get a domain.
 * x-ms-original-file: 2024-11-01/GetDomain.json
 */
async function getDomain() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.domains.get("testrg123", "example.com");
  console.log(result);
}

async function main() {
  await getDomain();
}

main().catch(console.error);
