// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Renew a domain.
 *
 * @summary Description for Renew a domain.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.DomainRegistration/stable/2024-11-01/examples/RenewDomain.json
 */

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function renewAnExistingDomain() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "3dddfa4f-cedf-4dc0-ba29-b6d1a69ab545";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "RG";
  const domainName = "example.com";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.domains.renew(resourceGroupName, domainName);
  console.log(result);
}

async function main() {
  await renewAnExistingDomain();
}

main().catch(console.error);
