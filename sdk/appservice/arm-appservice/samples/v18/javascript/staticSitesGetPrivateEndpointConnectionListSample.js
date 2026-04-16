// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Description for Gets the list of private endpoint connections associated with a static site
 *
 * @summary Description for Gets the list of private endpoint connections associated with a static site
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/GetSitePrivateEndpointConnectionList.json
 */
async function getAListOfPrivateEndpointConnectionsAssociatedWithASite() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticSites.listPrivateEndpointConnectionList(
    resourceGroupName,
    name,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAListOfPrivateEndpointConnectionsAssociatedWithASite();
}

main().catch(console.error);
