// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary SecretReference represents a configuration setting that references as KeyVault secret.
 *
 */
const {
  AppConfigurationClient,
  isSecretReference,
  secretReferenceContentType
} = require("@azure/app-configuration");
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  console.log(`Running secretReference sample`);
  const secretReference = {
    key: `secret${new Date().getTime()}`,
    secretId: `secret-key${Math.ceil(100 + Math.random() * 900)}`,
    isReadOnly: false,
    contentType: secretReferenceContentType
  };

  if (
    !process.env["AZURE_TENANT_ID"] ||
    !process.env["AZURE_CLIENT_ID"] ||
    !process.env["AZURE_CLIENT_SECRET"] ||
    !process.env["KEYVAULT_URI"]
  ) {
    console.log(`At least one of the AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, and KEYVAULT_URI variables is not present, 
      please add the missing ones in your environment and rerun the sample.`);
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
    `Create a keyvault secret with key: ${secretReference.secretId} and value: "MySecretValue"`
  );
  await secretClient.setSecret(secretReference.secretId, "MySecretValue");

  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const appConfigClient = new AppConfigurationClient(connectionString);

  await cleanupSampleValues([secretReference.key], appConfigClient);

  console.log(
    `Add a new secretReference with key: ${secretReference.key} and secretId: ${secretReference.secretId}`
  );
  await appConfigClient.addConfigurationSetting(secretReference);

  console.log(`Get the added secretReference from App Config with key: ${secretReference.key}`);
  const getResponse = await appConfigClient.getConfigurationSetting({
    key: secretReference.key
  });

  if (isSecretReference(getResponse)) {
    // isSecretReference() check for type inference to narrow down the configuration setting as a SecretReference
    // setting is a `SecretReference`
    // Read the secret we created
    const secret = await secretClient.getSecret(getResponse.secretId);
    console.log(`Get the secret from keyvault key: ${secret.name}, value: ${secret.value}`);

    console.log(`Deleting the secret from keyvault`);
    await secretClient.beginDeleteSecret(getResponse.secretId);
  }

  await cleanupSampleValues([secretReference.key], appConfigClient);
}

async function cleanupSampleValues(keys, client) {
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
export function getEnvVar(name) {
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
