// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Description for Generate a single sign-on request for the domain management portal.
 *
 * @summary Description for Generate a single sign-on request for the domain management portal.
 * x-ms-original-file: specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/examples/GetDomainControlCenterSsoRequest.json
 */
async function getDomainControlCenterSsoRequest() {
  const subscriptionId =
    process.env["DOMAINREGISTRATION_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.domains.getControlCenterSsoRequest();
  console.log(result);
}

async function main() {
  await getDomainControlCenterSsoRequest();
}

main().catch(console.error);
