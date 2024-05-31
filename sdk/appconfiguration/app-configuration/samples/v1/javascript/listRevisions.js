// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates listing revisions for a configuration setting.
 */
const { AppConfigurationClient } = require("@azure/app-configuration");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running listRevisions sample`);

  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const client = new AppConfigurationClient(connectionString);

  // let's create the setting
  const originalSetting = await client.addConfigurationSetting({
    key: `keyWithRevisions-${Date.now()}`,
    value: "original value",
  });

  console.log(`First revision created with value ${originalSetting.value}`);

  const newSetting = {
    ...originalSetting,
    value: "A new value!",
  };

  // delay for a second to make the timestamps more interesting
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // now we'll update it - this leaves us with two revisions (the previous 'original' and
  // our update)
  await client.setConfigurationSetting(newSetting);

  const revisionsIterator = client.listRevisions({
    keyFilter: newSetting.key,
  });

  // show all the revisions, including the date they were set.
  for await (const revision of revisionsIterator) {
    // revisions are just a configuration setting at a particular point in time
    console.log(`At ${revision.lastModified}, the value was ${revision.value}`);
  }

  ////////////////////////////////////////////////////////
  ///////////////  Example for .byPage()  ////////////////
  ////////////////////////////////////////////////////////

  // If you want to see the pagination
  // for (let index = 0; index < 135; index++) {
  //   await client.setConfigurationSetting({ ...originalSetting, value: `new value = ${index}` });
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  // }

  // Passing marker as an argument
  let iterator = client.listRevisions({ keyFilter: "keyWithRevisions-1626819906487" }).byPage();
  let response = await iterator.next();
  if (!response.done) {
    for (const revision of response.value.items) {
      console.log(`  Found key: ${revision.key}, ${revision.value} === ${revision.lastModified}`);
    }
  }
  // Gets next marker
  let marker = response.value.continuationToken;
  // Passing next marker as continuationToken
  iterator = client.listRevisions({ keyFilter: "keyWithRevisions-1626819906487" }).byPage({
    continuationToken: marker,
  });
  response = await iterator.next();
  if (response.done) {
    console.log("List done.");
  } else {
    if (response.value.items) {
      for (const revision of response.value.items) {
        console.log(`  Found key: ${revision.key}, ${revision.value} === ${revision.lastModified}`);
      }
    }
  }

  cleanupSampleValues([originalSetting.key], client);
}

async function cleanupSampleValues(keys, client) {
  const settingsIterator = client.listConfigurationSettings({
    keyFilter: keys.join(","),
  });

  for await (const setting of settingsIterator) {
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});

module.exports = { main };
