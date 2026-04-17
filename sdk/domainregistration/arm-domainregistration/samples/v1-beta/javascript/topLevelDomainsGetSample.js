// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get details of a top-level domain.
 *
 * @summary description for Get details of a top-level domain.
 * x-ms-original-file: 2024-11-01/GetTopLevelDomain.json
 */
async function getTopLevelDomain() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.topLevelDomains.get("com");
  console.log(result);
}

async function main() {
  await getTopLevelDomain();
}

main().catch(console.error);
