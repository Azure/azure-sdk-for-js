// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Generate a single sign-on request for the domain management portal.
 *
 * @summary description for Generate a single sign-on request for the domain management portal.
 * x-ms-original-file: 2024-11-01/GetDomainControlCenterSsoRequest.json
 */
async function getDomainControlCenterSsoRequest() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.domains.getControlCenterSsoRequest();
  console.log(result);
}

async function main() {
  await getDomainControlCenterSsoRequest();
}

main().catch(console.error);
