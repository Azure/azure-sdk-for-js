// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get all top-level domains supported for registration.
 *
 * @summary description for Get all top-level domains supported for registration.
 * x-ms-original-file: 2024-11-01/ListTopLevelDomains.json
 */
async function listTopLevelDomains() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.topLevelDomains.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTopLevelDomains();
}

main().catch(console.error);
