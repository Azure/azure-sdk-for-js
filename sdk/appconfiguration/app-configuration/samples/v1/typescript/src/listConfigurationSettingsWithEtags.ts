// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates listing multiple configuration settings by page using page etags.
 */
import { AppConfigurationClient } from "@azure/app-configuration";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running listConfigurationSettingsWithEtags sample`);

  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const client = new AppConfigurationClient(connectionString);

  const key = "sample key";
  const pageSize = 100;
  // this number is chosen to create 2 full page an an empty 3 page
  const expectedNumberOfLabels = pageSize * 2;

  console.log("Creating 2 full pages of settings");
  for (let i = 0; i < expectedNumberOfLabels; i++) {
    client.addConfigurationSetting({
      key,
      value: `the value for ${i}`,
      label: i.toString(),
    });
  }

  console.log("Get the current page Etags into a list");
  let iterator = client.listConfigurationSettings({ keyFilter: key }).byPage();
  const etags: string[] = [];
  for await (const page of iterator) {
    console.log(`  The current page etag is ${page.etag}`);
    etags.push(page.etag ?? "");
  }

  // This number is arbitrarily chosen to add new setting to the 3rd page
  console.log("Add additional etags to create a 3rd page");
  const additionalNumberOfLabels = 50;
  for (let i = expectedNumberOfLabels; i < expectedNumberOfLabels + additionalNumberOfLabels; i++) {
    client.addConfigurationSetting({
      key,
      value: `the value for ${i}`,
      label: i.toString(),
    });
  }

  // Second run with added settings
  console.log("Checking for updated pages");
  iterator = client.listConfigurationSettings({ keyFilter: key, pageEtags: etags }).byPage();

  for await (const page of iterator) {
    const statusCode = page._response.status;
    if (statusCode === 304) {
      console.log("No updates for this page");
    } else if (statusCode === 200) {
      console.log("Updates available for this page");
      console.log(`  The new page etag is ${page.etag}`);
    }
  }

  for (let i = 0; i < expectedNumberOfLabels + additionalNumberOfLabels; i++) {
    await client.deleteConfigurationSetting({ key, label: i.toString() });
  }
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});
