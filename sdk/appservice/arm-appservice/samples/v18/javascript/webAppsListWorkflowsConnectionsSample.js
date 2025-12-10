// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists logic app's connections for web site, or a deployment slot.
 *
 * @summary Lists logic app's connections for web site, or a deployment slot.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/ListWorkflowsConfigurationConnections.json
 */
async function listTheInstanceWorkflowsConfigurationConnections() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "testsite2";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.listWorkflowsConnections(resourceGroupName, name);
  console.log(result);
}

async function main() {
  await listTheInstanceWorkflowsConfigurationConnections();
}

main().catch(console.error);
