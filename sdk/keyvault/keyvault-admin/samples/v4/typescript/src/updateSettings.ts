// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to retrieve and update account settings for Managed HSM.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { KeyVaultSettingsClient } from "@azure/keyvault-admin";

export async function main(): Promise<void> {
  const client: KeyVaultSettingsClient = new KeyVaultSettingsClient(
    process.env["AZURE_MANAGEDHSM_URI"] || "<managedhsm-url>",
    new DefaultAzureCredential(),
  );
  const setting = await client.getSetting("AllowKeyManagementOperationsThroughARM");
  // You can update the setting's value and then pass it back to updateSetting:
  setting.value = true;
  await client.updateSetting(setting);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
