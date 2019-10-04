// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// NOTE: replace with import { AppConfigurationClient } from "@azure/app-configuration"
// in a standalone project
import { AppConfigurationClient } from "../src";

export async function run() {
  console.log("Running setReadOnly sample");

  // You will need to set this environment variable
  const connectionString = process.env["AZ_CONFIG_CONNECTION"]!;
  const client = new AppConfigurationClient(connectionString);

  const readOnlySampleKey = "readOnlySampleKey";

  await cleanupSampleValues([readOnlySampleKey], client);

  console.log("Creating a new key. By default keys are writeable");
  await client.addConfigurationSetting({ key: readOnlySampleKey, label: "a label", value: "Initial value" });

  // now we'd like to prevent future modifications - let's set the key/label to read-only
  await client.setReadOnly({ key: readOnlySampleKey, label: "a label" });

  // any modifications to the key will now throw errors
  try {
    await client.setConfigurationSetting({ key: readOnlySampleKey, label: "a label", value: "new value" });
  } catch (err) {
    console.log(`Error thrown when trying to modifying a read-only key`, err.name);
  }
    
  // clients that read from the key are unaffected
  await client.getConfigurationSetting(readOnlySampleKey, { label: "a label" });

  // to make a key writable again we can clear the read-only status
  await client.clearReadOnly({ key: readOnlySampleKey, label: "a label" });

  // and now clients can change the value again
  await client.setConfigurationSetting({ key: readOnlySampleKey, label: "a label", value: "new value" });
  
  await cleanupSampleValues([readOnlySampleKey], client);
}

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
  const existingSettings = await client.listConfigurationSettings({
    keys: keys
  });

  for await (const setting of existingSettings) {
    await client.clearReadOnly(setting);
    await client.deleteConfigurationSetting(setting.key!, { label: setting.label });
  }
}

// If you want to run this sample from a console
// uncomment these lines so run() will get called
// run().catch(err => {
//     console.log(`ERROR: ${err}`);
// });
