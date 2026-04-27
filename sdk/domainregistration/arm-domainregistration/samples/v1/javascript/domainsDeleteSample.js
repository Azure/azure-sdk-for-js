// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Delete a domain.
 *
 * @summary description for Delete a domain.
 * x-ms-original-file: 2024-11-01/DeleteAppServiceDomain.json
 */
async function deleteAppServiceDomain() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  await client.domains.delete("testrg123", "example.com", { forceHardDeleteDomain: true });
}

async function main() {
  await deleteAppServiceDomain();
}

main().catch(console.error);
