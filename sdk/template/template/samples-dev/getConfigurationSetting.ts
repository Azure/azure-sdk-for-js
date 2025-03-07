// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ConfigurationClient to retrieve a setting value.
 */

import { ConfigurationClient } from "@azure/template";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";

async function main(): Promise<void> {
  const endpoint = process.env.APPCONFIG_ENDPOINT || "<endpoint>";
  const key = process.env.APPCONFIG_TEST_SETTING_KEY || "<test-key>";

  const client = new ConfigurationClient(endpoint, new DefaultAzureCredential());

  const setting = await client.getConfigurationSetting(key);

  console.log("The setting has a value of:", setting.value);
  console.log("Details:", setting);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
