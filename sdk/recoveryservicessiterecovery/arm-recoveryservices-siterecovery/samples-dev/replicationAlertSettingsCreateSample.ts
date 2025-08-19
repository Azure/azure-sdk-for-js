// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update an email notification(alert) configuration.
 *
 * @summary Create or update an email notification(alert) configuration.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationAlertSettings_Create.json
 */

import {
  ConfigureAlertRequest,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function configuresEmailNotificationsForThisVault(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const alertSettingName = "defaultAlertSetting";
  const request: ConfigureAlertRequest = {
    properties: {
      customEmailAddresses: ["ronehr@microsoft.com"],
      locale: "",
      sendToOwners: "false",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationAlertSettings.create(
    resourceGroupName,
    resourceName,
    alertSettingName,
    request,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configuresEmailNotificationsForThisVault();
}

main().catch(console.error);
