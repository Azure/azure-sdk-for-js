const { KeysClient } = require("../../src");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
  const url = `https://${vaultName}.vault.azure.net`;
  const client = new KeysClient(url, credential);

  const keyName = "MyKeyName53";
  const ecKeyName = "MyECKeyName53";
  const rsaKeyName = "MyRSAKeyName53";

  // You can create keys using the general method
  const result = await client.createKey(keyName, "EC");
  console.log("key: ", result);

  // Or using specialized key creation methods
  const ecResult = await client.createEcKey(ecKeyName, { curve: "P-256" });
  const rsaResult = await client.createRsaKey(rsaKeyName, { keySize: 2048 });
  console.log("Elliptic curve key: ", ecResult);
  console.log("RSA Key: ", rsaResult);

  // Get a specific key
  const key = await client.getKey(keyName);
  console.log("key: ", key);

  // Or list the keys we have
  let listKeys = client.listKeys();
  while (true) {
    let { done, value } = await listKeys.next();
    if (done) {
      break;
    }

    const key = await client.getKey(value.name);
    console.log("key: ", key);
  }

  // Update the key
  const updatedKey = await client.updateKey(keyName, result.properties.version, { enabled: false });
  console.log("updated key: ", updatedKey);

  let poller = await client.beginDeleteKey(keyName);
  await poller.pollUntilDone();

  poller = await client.beginDeleteKey(ecKeyName);
  await poller.pollUntilDone();

  poller = await client.beginDeleteKey(rsaKeyName);
  await poller.pollUntilDone();
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
