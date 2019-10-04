// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// This sample shows you how to get a setting only if it has changed
// from what you already have. This allows your app to avoid downloading
// the contents of a setting if the value is unchanged.

// NOTE: replace with import { AppConfigurationClient } from "@azure/app-configuration"
// in a standalone project
import { AppConfigurationClient } from "../src";

export async function run() {
  console.log("Running get setting only if changed sample");
    
  // You will need to set this environment variable
  const connectionString = process.env["AZ_CONFIG_CONNECTION"]!;
  const client = new AppConfigurationClient(connectionString);

  const key = "getSettingOnlyIfChangedExample";
  await cleanupSampleValues([key], client);
  
  const addedSetting = await client.addConfigurationSetting({ key, value: "Initial value" });

  // now our application only wants to download the setting if it's changed
  // when it's not changed we throw an error that you can inspect and deal 
  // with
  console.log("Checking to see if the value has changed using the etag and ifNoneMatch");
  try {
    await client.getConfigurationSetting(key, {
      // ifNoneMatch allows us to say "get me the value so long as it doesn't match the etag I have"
      ifNoneMatch: addedSetting.etag
    });
  } catch (err) {
    if (err.name === "ResponseBodyNotFoundError") {
      // this means the setting has not changed
      // for this example we'll just continue using the original value
      console.log("The setting hasn't changed - we'll just continue using our current setting");            
    } else {
      // other errors indicate actual failures in the service call
      // should be handled (or propagated)
      throw err;
    }
  }
  
  await cleanupSampleValues([key], client);
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
