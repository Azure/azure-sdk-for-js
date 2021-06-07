// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary SecretReference represents a configuration setting that references as KeyVault secret.
 *
 * @azsdk-weight 30
 */
import {
  AppConfigurationClient,
  SecretReferenceValue,
  secretReferenceContentType,
  ConfigurationSetting,
  parseSecretReference
} from "@azure/app-configuration";
import { SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running secretReference sample`);
  const secretReference: ConfigurationSetting<SecretReferenceValue> = {
    key: `secret${new Date().getTime()}`,
    value: {
      secretId: `secret-key${Math.ceil(100 + Math.random() * 900)}`
    },
    isReadOnly: false,
    contentType: secretReferenceContentType
  };

  if (
    !process.env["AZURE_TENANT_ID"] ||
    !process.env["AZURE_CLIENT_ID"] ||
    !process.env["AZURE_CLIENT_SECRET"] ||
    !process.env["KEYVAULT_URI"]
  ) {
    console.log(
      `At least one of the AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, and KEYVAULT_URI variables is not present, 
      please add the missing ones in your environment and rerun the sample.`
    );
    return;
  }
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";

  const secretClient = new SecretClient(url, credential);
  // Create a secret
  console.log(
    `Create a keyvault secret with key: ${secretReference.value.secretId} and value: "MySecretValue"`
  );
  await secretClient.setSecret(secretReference.value.secretId, "MySecretValue");

  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const appConfigClient = new AppConfigurationClient(connectionString);

  await cleanupSampleValues([secretReference.key], appConfigClient);

  console.log(
    `Add a new secretReference with key: ${secretReference.key} and secretId: ${secretReference.value.secretId}`
  );
  await appConfigClient.addConfigurationSetting(secretReference);

  console.log(`Get the added secretReference from App Config with key: ${secretReference.key}`);
  const getResponse = await appConfigClient.getConfigurationSetting({
    key: secretReference.key
  });

  // You can use the `isSecretReference` global method to check if the content type is secretReferenceContentType ("application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8")
  const parsedSecretReference = parseSecretReference(getResponse);
  // Read the secret we created
  const secret = await secretClient.getSecret(parsedSecretReference.value.secretId);
  console.log(`Get the secret from keyvault key: ${secret.name}, value: ${secret.value}`);

  console.log(`Deleting the secret from keyvault`);
  await secretClient.beginDeleteSecret(parsedSecretReference.value.secretId);

  await cleanupSampleValues([secretReference.key], appConfigClient);
}

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
  const settingsIterator = client.listConfigurationSettings({
    keyFilter: keys.join(",")
  });

  for await (const setting of settingsIterator) {
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

/**
 * Returns the environment variable, throws an error if not defined.
 *
 * @export
 * @param {string} name
 */
export function getEnvVar(name: string) {
  const val = process.env[name];
  if (!val) {
    throw `Environment variable ${name} is not defined.`;
  }
  return val;
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});
