// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the alert configuration setting.
 *
 * @summary gets the details of the alert configuration setting.
 * x-ms-original-file: 2024-09-01/EmailConfiguration_Get.json
 */
async function getsTheEmailConfigurationSetting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.emailConfiguration.get("rgswagger_2024-09-01", "4", "0");
  console.log(result);
}

async function main() {
  await getsTheEmailConfigurationSetting();
}

main().catch(console.error);
