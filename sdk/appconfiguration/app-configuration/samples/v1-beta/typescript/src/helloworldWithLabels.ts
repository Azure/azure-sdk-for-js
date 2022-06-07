// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample builds on concepts in helloworld.ts and shows you how to use labels.
 */
import { AppConfigurationClient } from "@azure/app-configuration";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // Labels allow you to add an extra dimension for your setting and gives you a simple way to create conventions for environments.
  // More info - https://docs.microsoft.com/azure/azure-app-configuration/concept-key-value#label-keys
  console.log("Running helloworldWithLabels sample");

  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const client = new AppConfigurationClient(connectionString);

  const urlKey = "Samples:Endpoint:Url";

  await cleanupSampleValues([urlKey], client);

  // labels allow you to use the same key with different values for separate environments
  // or clients
  console.log("Adding in endpoint with two labels - beta and production");
  await client.addConfigurationSetting({
    key: urlKey,
    label: "beta",
    value: "https://beta.example.com",
  });
  await client.addConfigurationSetting({
    key: urlKey,
    label: "production",
    value: "https://example.com",
  });

  const betaEndpoint = await client.getConfigurationSetting({ key: urlKey, label: "beta" });
  console.log(`Endpoint with beta label: ${betaEndpoint.value}`);

  const productionEndpoint = await client.getConfigurationSetting({
    key: urlKey,
    label: "production",
  });
  console.log(`Endpoint with production label: ${productionEndpoint.value}`);

  await cleanupSampleValues([urlKey], client);
}

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
  const existingSettings = client.listConfigurationSettings({
    keyFilter: keys.join(","),
  });

  for await (const setting of existingSettings) {
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

main().catch((error) => {
  console.error("Failed to run sample:", error);
});
