// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates listing multiple configuration settings using a filter for a key or label.
 */
const { AppConfigurationClient } = require("@azure/app-configuration");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running listConfigurationSettings sample`);

  // Set the following environment variable or edit the value on the following line.
  const endpoint = process.env["AZ_CONFIG_ENDPOINT"] || "<endpoint>";
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationClient(endpoint, credential);

  await client.setConfigurationSetting({
    key: "sample key",
    value: "sample value",
    label: "production",
  });

  await client.setConfigurationSetting({
    key: "sample key",
    value: "sample value",
    label: "developmentA",
    tags: {
      production: "prodA",
    },
  });

  await client.setConfigurationSetting({
    key: "key only for development",
    value: "value",
    label: "developmentB",
    tags: {
      production: "prodB",
    },
  });

  // ex: using a keyFilter
  const sampleKeys = client.listConfigurationSettings({
    keyFilter: "sample*",
  });

  console.log(`Settings matching keyFilter 'sample*'`);

  for await (const setting of sampleKeys) {
    console.log(`  Found key: ${setting.key}, label: ${setting.label}`);
  }

  // ex: using a labelFilter
  const samplesWithDevelopmentLabel = client.listConfigurationSettings({
    labelFilter: "development*",
  });

  console.log(`Settings matching labelFilter 'development*'`);

  for await (const setting of samplesWithDevelopmentLabel) {
    console.log(`  Found key: ${setting.key}, label: ${setting.label}`);
  }

  // ex: using a tagFilter
  const samplesWithProdTag = client.listConfigurationSettings({
    tagsFilter: ["production=prodB"],
  });

  console.log(`Settings matching tagsFilter 'prodB'`);

  for await (const setting of samplesWithProdTag) {
    console.log(`  Found key: ${setting.key}, label: ${setting.label}, tags: ${setting.tags}`);
  }

  ////////////////////////////////////////////////////////
  ///////////////  Example for .byPage()  ////////////////
  ////////////////////////////////////////////////////////

  // Passing marker as an argument
  let iterator = client.listConfigurationSettings({ keyFilter: "sample*" }).byPage();
  let response = await iterator.next();
  if (!response.done) {
    for (const setting of response.value.items) {
      console.log(`  Found key: ${setting.key}`);
    }
  }
  // Gets next marker
  let marker = response.value.continuationToken;
  // Passing next marker as continuationToken
  iterator = client.listConfigurationSettings({ keyFilter: "sample*" }).byPage({
    continuationToken: marker,
  });
  response = await iterator.next();
  if (response.done) {
    console.log("List done.");
  } else {
    if (response.value.items) {
      for (const setting of response.value.items) {
        console.log(`  Found key: ${setting.key}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});

module.exports = { main };
