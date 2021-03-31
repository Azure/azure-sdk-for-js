// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the CRUD operations on the configuration settings.
 * @azsdk-weight 100
 */
import { AppConfigurationClient } from "@azure/app-configuration";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running helloworld sample`);

  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const client = new AppConfigurationClient(connectionString);

  const greetingKey = "Samples:Greeting";

  await cleanupSampleValues([greetingKey], client);

  // creating a new setting
  console.log(`Adding in new setting ${greetingKey}`);
  await client.addConfigurationSetting({ key: greetingKey, value: "Hello!" });

  const newSetting = await client.getConfigurationSetting({ key: greetingKey });
  console.log(`${greetingKey} has been set to ${newSetting.value}`);

  // changing the value of a setting
  await client.setConfigurationSetting({ key: greetingKey, value: "Goodbye!" });

  const updatedSetting = await client.getConfigurationSetting({ key: greetingKey });
  console.log(`${greetingKey} has been set to ${updatedSetting.value}`);

  // removing the setting
  await client.deleteConfigurationSetting({ key: greetingKey });
  console.log(`${greetingKey} has been deleted`);

  await cleanupSampleValues([greetingKey], client);
}

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
  const settingsIterator = client.listConfigurationSettings({
    keyFilter: keys.join(",")
  });

  for await (const setting of settingsIterator) {
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});
