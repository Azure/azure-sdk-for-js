// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Description for Resume an App Service Environment.
 *
 * @summary Description for Resume an App Service Environment.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/AppServiceEnvironments_Resume.json
 */
async function resumeAnAppServiceEnvironment() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "test-rg";
  const name = "test-ase";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServiceEnvironments.beginListResumeAndWait(
    resourceGroupName,
    name,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await resumeAnAppServiceEnvironment();
}

main().catch(console.error);
