// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates listing multiple configuration settings using a filter for a key or label.
 * @azsdk-weight 50
 */
import { AppConfigurationClient } from "@azure/app-configuration";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running listConfigurationSettings sample`);

  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const client = new AppConfigurationClient(connectionString);

  await client.setConfigurationSetting({
    key: "sample key",
    value: "sample value",
    label: "production"
  });

  await client.setConfigurationSetting({
    key: "sample key",
    value: "sample value",
    label: "developmentA"
  });

  await client.setConfigurationSetting({
    key: "key only for development",
    value: "value",
    label: "developmentB"
  });

  // ex: using a keyFilter
  const sampleKeys = client.listConfigurationSettings({
    keyFilter: "sample*"
  });

  console.log(`Settings matching keyFilter 'sample*'`);

  for await (const setting of sampleKeys) {
    console.log(`  Found key: ${setting.key}, label: ${setting.label}`);
  }

  // ex: using a labelFilter
  const samplesWithDevelopmentLabel = client.listConfigurationSettings({
    labelFilter: "development*"
  });

  console.log(`Settings matching labelFilter 'development*'`);

  for await (const setting of samplesWithDevelopmentLabel) {
    console.log(`  Found key: ${setting.key}, label: ${setting.label}`);
  }
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});
