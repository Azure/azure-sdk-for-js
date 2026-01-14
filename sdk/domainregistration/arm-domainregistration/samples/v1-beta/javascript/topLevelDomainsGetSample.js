// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Description for Get details of a top-level domain.
 *
 * @summary Description for Get details of a top-level domain.
 * x-ms-original-file: specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/examples/GetTopLevelDomain.json
 */
async function getTopLevelDomain() {
  const subscriptionId =
    process.env["DOMAINREGISTRATION_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const name = "com";
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.topLevelDomains.get(name);
  console.log(result);
}

async function main() {
  await getTopLevelDomain();
}

main().catch(console.error);
