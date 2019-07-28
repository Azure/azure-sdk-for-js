import { CryptographyClient } from "../src/cryptographyClient";
import { KeysClient } from "../src";
import { EnvironmentCredential } from "@azure/identity";
import * as crypto from 'crypto';

async function main(): Promise<void> {
  // EnvironmentCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new EnvironmentCredential();

  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"
  const url = `https://${vaultName}.vault.azure.net`;

  // Connection to Azure Key Vault
  const client = new KeysClient(url, credential);

  let keyName = "localWorkKey";

  // Connection to Azure Key Vault Cryptography functionality
  let myWorkKey = await client.createKey(keyName, "RSA");
  const remoteCryptoClient = new CryptographyClient(url, myWorkKey.keyMaterial!.kid!, credential);
  const localCryptoClient = new CryptographyClient(url, myWorkKey.keyMaterial!, credential);

  // Sign and Verify
  const signatureValue = "MySignature";
  let hash = crypto.createHash("sha256");

  hash.update(signatureValue);
  let digest = hash.digest();
  console.log("digest: ", digest);

  const signature = await remoteCryptoClient.sign(digest, "RS256");
  console.log("sign result: ", signature);

  const verifyResult1 = await remoteCryptoClient.verify(digest, signature, "RS256");
  console.log("remote verify result: ", verifyResult1);

  const verifyResult2 = await localCryptoClient.verifyData(Buffer.from(signatureValue), signature, "RS256");
  console.log("local verify result: ", verifyResult2);

  // Encrypt and decrypt
  const encrypt = await localCryptoClient.encrypt(Buffer.from("My Message"), "RSA1_5");
  console.log("encrypt result: ", encrypt);

  const decrypt = await remoteCryptoClient.decrypt(encrypt, "RSA1_5");
  console.log("decrypt: ", decrypt.toString());

  await client.deleteKey(keyName);
}
main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
