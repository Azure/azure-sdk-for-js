// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Renew a domain.
 *
 * @summary description for Renew a domain.
 * x-ms-original-file: 2024-11-01/RenewDomain.json
 */
async function renewAnExistingDomain() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3dddfa4f-cedf-4dc0-ba29-b6d1a69ab545";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  await client.domains.renew("RG", "example.com");
}

async function main() {
  await renewAnExistingDomain();
}

main().catch(console.error);
