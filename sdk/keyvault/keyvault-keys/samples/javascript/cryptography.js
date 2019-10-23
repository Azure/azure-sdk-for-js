const { KeysClient, CryptographyClient } = require("../../src");
const { DefaultAzureCredential } = require("@azure/identity");
const crypto = require("crypto");

async function main() {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
  const url = `https://${vaultName}.vault.azure.net`;

  // Connection to Azure Key Vault
  const client = new KeysClient(url, credential);

  let keyName = "localWorkKey11241";

  // Connection to Azure Key Vault Cryptography functionality
  let myWorkKey = await client.createKey(keyName, "RSA");

  const cryptoClient = new CryptographyClient(url, myWorkKey.key.kid, credential);

  // Sign and Verify
  const signatureValue = "MySignature";
  let hash = crypto.createHash("sha256");

  hash.update(signatureValue);
  let digest = hash.digest();
  console.log("digest: ", digest);

  const signature = await cryptoClient.sign("RS256", digest);
  console.log("sign result: ", signature);

  const verifyResult = await cryptoClient.verify("RS256", digest, signature.result);
  console.log("verify result: ", verifyResult);

  // Encrypt and decrypt
  const encrypt = await cryptoClient.encrypt("RSA1_5", Buffer.from("My Message"));
  console.log("encrypt result: ", encrypt);

  const decrypt = await cryptoClient.decrypt("RSA1_5", encrypt.result);
  console.log("decrypt: ", decrypt.result.toString());

  // Wrap and unwrap
  const wrapped = await cryptoClient.wrapKey("RSA-OAEP", Buffer.from("My Message"));
  console.log("wrap result: ", wrapped);

  const unwrapped = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
  console.log("unwrap result: ", unwrapped);

  await client.beginDeleteKey(keyName)
}
main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
