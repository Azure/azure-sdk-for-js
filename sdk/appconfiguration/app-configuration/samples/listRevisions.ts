// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// This sample demonstrates how to list revisions for a configuration 
// setting.

// NOTE: replace with import { AppConfigurationClient } from "@azure/app-configuration"
// in a standalone project
import { AppConfigurationClient } from "../src"

export async function run() {
  console.log(`Running listRevisions sample`);

  // You will need to set this environment variable
  const connectionString = process.env["AZ_CONFIG_CONNECTION"]!;
  const client = new AppConfigurationClient(connectionString);

  // let's create the setting
  const originalSetting = await client.addConfigurationSetting({
    key: `keyWithRevisions-${Date.now()}`,
    value: "original value"
  });

  console.log(`First revision created with value ${originalSetting.value}`);

  const newSetting = {
    ...originalSetting,
    value: "A new value!"
  };

  // delay for a second to make the timestamps more interesting
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // now we'll update it - this leaves us with two revisions (the previous 'original' and
  // our update)
  await client.setConfigurationSetting(newSetting);
  
  const revisionsIterator = client.listRevisions({
    keyFilter: newSetting.key
  });

  // show all the revisions, including the date they were set.
  for await (const revision of revisionsIterator) {
    // revisions are just a configuration setting at a particular point in time
    console.log(`At ${revision.lastModified}, the value was ${revision.value}`);
  }

  cleanupSampleValues([originalSetting.key], client);
}

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
  const settingsIterator = await client.listConfigurationSettings({
      keyFilter: keys.join(',')
  });

  for await (const setting of settingsIterator) {
      await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }    
}

// If you want to run this sample from a console
// uncomment these lines so run() will get called
// run().catch(err => {
//     console.log(`ERROR: ${err}`);
// });