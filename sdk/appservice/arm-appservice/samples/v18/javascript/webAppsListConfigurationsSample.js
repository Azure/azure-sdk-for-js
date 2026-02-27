// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for List the configurations of an app
 *
 * @summary description for List the configurations of an app
 * x-ms-original-file: 2025-05-01/ListWebAppConfigurations.json
 */
async function listWebAppConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webApps.listConfigurations("testrg123", "sitef6141")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listWebAppConfigurations();
}

main().catch(console.error);
