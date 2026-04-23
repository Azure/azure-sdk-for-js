// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to retrieve and update account settings for Managed HSM.
 */

// Load the .env file if it exists
require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { KeyVaultSettingsClient } = require("@azure/keyvault-admin");

async function main() {
  const client = new KeyVaultSettingsClient(
    process.env["AZURE_MANAGEDHSM_URI"] || "<managedhsm-url>",
    new DefaultAzureCredential(),
  );
  // Use client.listSettings() to see all available setting names.
  const setting = await client.getSetting("AllowKeyManagementOperationsThroughARM");
  // You can update the setting's value and then pass it back to updateSetting:
  setting.value = true;
  await client.updateSetting(setting);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
