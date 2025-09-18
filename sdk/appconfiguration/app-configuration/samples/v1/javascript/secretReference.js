// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary SecretReference represents a configuration setting that references as KeyVault secret.
 */
const {
  AppConfigurationClient,
  secretReferenceContentType,
} = require("@azure/app-configuration");
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

// Use configuration provider and feature management library to consume secret reference
const { load } = require("@azure/app-configuration-provider");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running secretReference sample`);

  const secretName = `secret${new Date().getTime()}`;

  const vaultUri = process.env["KEYVAULT_URI"] || "<vault-uri>";
  const secretClient = new SecretClient(vaultUri, new DefaultAzureCredential());

  const secretId = await createKeyVaultSecret(secretName, secretClient);

  const endpoint = process.env["AZ_CONFIG_ENDPOINT"] || "<endpoint>";
  const credential = new DefaultAzureCredential();
  const appConfigClient = new AppConfigurationClient(endpoint, credential);

  // creates the secret reference config setting
  await createConfigSetting(secretName, secretId, appConfigClient);

  console.log(`Use configuration provider to load and resolve secret reference`);
  const appConfigProvider = await load(endpoint, credential, {
    keyVaultOptions: {
      credential: credential
    }
  });

  console.log(`Secret value: ${appConfigProvider.get(secretName)}`);

  await secretClient.beginDeleteSecret(secretName);

  await cleanupSampleValues([secretName], appConfigClient);
}

async function createKeyVaultSecret(secretName, client) {
  // Create a secret
  console.log(`Create a keyvault secret with key: ${secretName}  and value: "MySecretValue"`);
  const secret = await client.setSecret(secretName, "MySecretValue");

  if (!secret.properties.id) {
    throw new Error("Something went wrong - secret id is undefined");
  }

  return secret.properties.id;
}

async function createConfigSetting(key, secretId, client) {
  const secretReference = {
    key,
    value: { secretId },
    isReadOnly: false,
    contentType: secretReferenceContentType,
  };

  await cleanupSampleValues([key], client);

  console.log(
    `Add a new secretReference with key: ${key} and secretId: ${secretReference.value.secretId}`,
  );
  await client.addConfigurationSetting(secretReference);
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
