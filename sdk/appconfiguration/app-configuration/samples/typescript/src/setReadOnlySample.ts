// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This sample shows you how to set a configuration setting to read-only.
// This can help prevent accidental deletion or modification of a setting.

import { AppConfigurationClient } from "@azure/app-configuration";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("Running setReadOnly sample");

  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const client = new AppConfigurationClient(connectionString);

  const readOnlySampleKey = "readOnlySampleKey";
  await cleanupSampleValues([readOnlySampleKey], client);

  console.log("Creating a new key. By default keys are writeable");
  await client.addConfigurationSetting({
    key: readOnlySampleKey,
    label: "a label",
    value: "Initial value"
  });

  // now we'd like to prevent future modifications - let's set the key/label to read-only
  console.log("Setting a key to read-only. Any modifications will fail");
  await client.setReadOnly({ key: readOnlySampleKey, label: "a label" }, true);

  // any modifications to the key will now throw errors
  try {
    console.log("Attempting to modify a read-only setting");
    await client.setConfigurationSetting({
      key: readOnlySampleKey,
      label: "a label",
      value: "new value"
    });
  } catch (err) {
    console.log(`Error gets thrown - can't modify a read-only setting`);
  }

  // clients that read from the key are unaffected
  await client.getConfigurationSetting({ key: readOnlySampleKey, label: "a label" });

  // to make a key writable again we can clear the read-only status
  console.log("Clearing the read-only status on the key so we can update the value");
  await client.setReadOnly({ key: readOnlySampleKey, label: "a label" }, false);

  // and now clients can change the value again
  const updatedSetting = await client.setConfigurationSetting({
    key: readOnlySampleKey,
    label: "a label",
    value: "new value"
  });
  console.log(`Updated value is ${updatedSetting.value}`);

  await cleanupSampleValues([readOnlySampleKey], client);
}

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
  const existingSettings = client.listConfigurationSettings({
    keyFilter: keys.join(",")
  });

  for await (const setting of existingSettings) {
    await client.setReadOnly(setting, false);
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

main().catch((error) => {
  console.error("Failed to run sample:", error);
});
