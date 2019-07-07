import { KeysClient, JsonWebKeyEncryptionAlgorithm } from "../src";
import { EnvironmentCredential } from "@azure/identity";

async function main(): Promise<void> {
  // EnvironmentCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new EnvironmentCredential();

  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"
  const url = `https://${vaultName}.vault.azure.net`;
  const client = new KeysClient(url, credential);

  const keyName = "MyKeyName";

  const key = await client.createKey(keyName, "RSA");
  console.log("key: ", key);

  const encryptResult = await client.encrypt(keyName, key.version!, 'RSA1_5', new Uint8Array(Buffer.from("mysecretpassword123")));
  console.log("encrypt result: ", encryptResult);

  const decryptResult = await client.decrypt(keyName, key.version, "RSA1_5", encryptResult.result!);
  console.log("decrypt result:", Buffer.from(decryptResult.result!).toString());

  let tempSignature = Buffer.from("MySignature").toString("base64");
  let signature = new Uint8Array(Buffer.from(tempSignature + tempSignature));

  const signResult = await client.sign(keyName, key.version!, "RS256", signature);
  console.log("sign result: ", signResult);

  const verifyResult = await client.verify(keyName, key.version!, "RS256", signature, signResult.result!);
  console.log("verify result: ", verifyResult);

  const wrapResult = await client.wrapKey(keyName, key.version, "RSA1_5", new Uint8Array(Buffer.from("MyWrapValue")));
  console.log("wrap result", wrapResult);

  const unwrapResult = await client.unwrapKey(keyName, key.version, "RSA1_5", wrapResult.result!);
  console.log("unwrap result", Buffer.from(unwrapResult.result!).toString());

  await client.deleteKey(keyName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
