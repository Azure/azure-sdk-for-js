// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the security settings on a Data Box Edge/Data Box Gateway device.
 *
 * @summary updates the security settings on a Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/SecuritySettingsUpdatePost.json
 */
async function createOrUpdateSecuritySettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.devices.createOrUpdateSecuritySettings("testedgedevice", "AzureVM", {
    deviceAdminPassword: {
      encryptionAlgorithm: "AES256",
      encryptionCertThumbprint: "<encryptionThumprint>",
      value: "<deviceAdminPassword>",
    },
  });
}

async function main() {
  await createOrUpdateSecuritySettings();
}

main().catch(console.error);
