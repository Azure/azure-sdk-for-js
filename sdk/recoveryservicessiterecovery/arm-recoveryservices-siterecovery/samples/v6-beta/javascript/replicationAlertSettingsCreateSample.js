// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an email notification(alert) configuration.
 *
 * @summary create or update an email notification(alert) configuration.
 * x-ms-original-file: 2025-08-01/ReplicationAlertSettings_Create.json
 */
async function configuresEmailNotificationsForThisVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationAlertSettings.create(
    "resourceGroupPS1",
    "vault1",
    "defaultAlertSetting",
    {
      properties: {
        customEmailAddresses: ["ronehr@microsoft.com"],
        locale: "",
        sendToOwners: "false",
      },
    },
  );
  console.log(result);
}

async function main() {
  await configuresEmailNotificationsForThisVault();
}

main().catch(console.error);
