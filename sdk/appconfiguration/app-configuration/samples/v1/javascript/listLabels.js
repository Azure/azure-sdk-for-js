// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates listing labels for a configuration setting.
 */
const { AppConfigurationClient } = require("@azure/app-configuration");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running listLabels sample`);

  // Set the following environment variable or edit the value on the following line.
  const endpoint = process.env["AZ_CONFIG_ENDPOINT"] || "<endpoint>";

  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationClient(endpoint, credential);

  // let's create the setting
  await client.addConfigurationSetting({
    key: "sample key",
    value: "sample value",
    label: "production",
  });

  await client.addConfigurationSetting({
    key: "sample key",
    value: "sample value",
    label: "developmentA",
    tags: {
      production: "prodA",
    },
  });

  await client.addConfigurationSetting({
    key: "sample key",
    value: "value",
    label: "developmentB",
    tags: {
      production: "prodB",
    },
  });

  console.log(`Listing all the labels`);

  const allLabels = client.listLabels();

  for await (const label of allLabels) {
    console.log(`  Found label: ${label.name}`);
  }

  // ex: using a nameFilter
  console.log(`Listing all the labels with name filter`);

  const labelsForDevelopment = client.listLabels({ nameFilter: "development*" });

  for await (const label of labelsForDevelopment) {
    console.log(`  Found label for development: ${label.name}`);
  }

  ////////////////////////////////////////////////////////
  ///////////////  Example for .byPage()  ////////////////
  ////////////////////////////////////////////////////////

  // Passing marker as an argument
  let iterator = client.listLabels().byPage();
  let response = await iterator.next();
  if (!response.done) {
    for (const label of response.value.items) {
      console.log(`  Found label: ${label.name}`);
    }
  }
  // Gets next marker
  let marker = response.value.continuationToken;
  // Passing next marker as continuationToken
  iterator = client.listLabels().byPage({
    continuationToken: marker,
  });
  response = await iterator.next();
  if (response.done) {
    console.log("List done.");
  } else {
    if (response.value.items) {
      for (const label of response.value.items) {
        console.log(`  Found label: ${label.name}`);
      }
    }
  }

  cleanupSampleValues(["sample key"], client);
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
