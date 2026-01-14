// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Description for Creates a new static site custom domain in an existing resource group and static site.
 *
 * @summary Description for Creates a new static site custom domain in an existing resource group and static site.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/CreateOrUpdateStaticSiteCustomDomain.json
 */
async function createOrUpdateACustomDomainForAStaticSite() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const domainName = "custom.domain.net";
  const staticSiteCustomDomainRequestPropertiesEnvelope = {};
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.beginCreateOrUpdateStaticSiteCustomDomainAndWait(
    resourceGroupName,
    name,
    domainName,
    staticSiteCustomDomainRequestPropertiesEnvelope,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateACustomDomainForAStaticSite();
}

main().catch(console.error);
