// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to send a test notification that an upgrade is available for this App Service Environment.
 *
 * @summary send a test notification that an upgrade is available for this App Service Environment.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_TestUpgradeAvailableNotification.json
 */
async function sendATestNotificationThatAnUpgradeIsAvailableForThisAppServiceEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.appServiceEnvironments.testUpgradeAvailableNotification(
    "rg",
    "SampleHostingEnvironment",
  );
}

async function main() {
  await sendATestNotificationThatAnUpgradeIsAvailableForThisAppServiceEnvironment();
}

main().catch(console.error);
