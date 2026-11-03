// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get global usage metrics of an App Service Environment.
 *
 * @summary description for Get global usage metrics of an App Service Environment.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_ListUsages.json
 */
async function getGlobalUsageMetricsOfAnAppServiceEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServiceEnvironments.listUsages("test-rg", "test-ase")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getGlobalUsageMetricsOfAnAppServiceEnvironment();
}

main().catch(console.error);
