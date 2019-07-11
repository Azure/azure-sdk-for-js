import { KeysClient, JsonWebKeyEncryptionAlgorithm } from "../src";
import { EnvironmentCredential } from "@azure/identity";
import * as crypto from 'crypto';
import * as fs from 'fs';

async function main(): Promise<void> {
  // EnvironmentCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new EnvironmentCredential();
  const keyto = require('@trust/keyto')
  const jwk_to_pem = require("jwk-to-pem");

  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"
  const url = `https://${vaultName}.vault.azure.net`;
  const client = new KeysClient(url, credential);

  const keyName = "MyKeyName";
  const signatureValue = "MySignature";

  const key = await client.getKey(keyName);
  let keyPEM = keyto.from(key.keyMaterial!, "jwk").toString('pem', 'public_pkcs1');

  // SIGN/VERIFY ORACLE
  if (true) {
    // RSA
    let hash = crypto.createHash("sha256");

    hash.update(signatureValue);
    let signature = hash.digest();
    console.log("digest: ", signature);

    const signResult = await client.sign(keyName, key.version!, "RS256", signature);
    console.log("sign result: ", signResult);

    const verifyResult = await client.verify(keyName, key.version!, "RS256", signature, signResult.result!);
    console.log("verify result: ", verifyResult);

    const verifier = crypto.createVerify("sha256");
    verifier.update(signatureValue);
    verifier.end();

    console.log(verifier.verify(keyPEM, Buffer.from(signResult.result!)));
  }

  // ENCRYPT/DECRYPT ORACLE
  let toEncryptBuffer = Buffer.from("mysecretpassword123");

  if (true) {
    // RSA1_5
    // note: using 'any' here to get around the Node 8 types being out of date
    let padded: any = { key: keyPEM, type: "public", padding: (<any>crypto).constants.RSA_PKCS1_PADDING };
    const encrypted = crypto.publicEncrypt(padded, toEncryptBuffer);
    console.log("from node: ", encrypted);

    const decryptResult = await client.decrypt(keyName, key.version, "RSA1_5", new Uint8Array(encrypted));
    console.log(decryptResult.result!.toString());
  }

  if (true) {
    // RSA-OAEP
    const encrypted = crypto.publicEncrypt(keyPEM, toEncryptBuffer);
    console.log("from node: ", encrypted);

    const decryptResult = await client.decrypt(keyName, key.version, "RSA-OAEP", new Uint8Array(encrypted));
    console.log(decryptResult.result!.toString());
  }

  // Example encrypt
  // const encryptResult = await client.encrypt(keyName, key.version!, 'RSA1_5', new Uint8Array(Buffer.from("mysecretpassword123")));
  // console.log("encrypt result: ", encryptResult);

  // Example decrypt
  // const decryptResult = await client.decrypt(keyName, key.version!, "RSA1_5", encryptResult.result!);
  // console.log("decrypt result:", Buffer.from(decryptResult.result!).toString());

  // Example sign
  // const signResult = await client.sign(keyName, key.version!, "RS256", signature);
  // console.log("sign result: ", signResult);

  // Example verify
  // const verifyResult = await client.verify(keyName, key.version!, "RS256", signature, signResult.result!);
  // console.log("verify result: ", verifyResult);

  // Example wrap
  // const wrapResult = await client.wrapKey(keyName, key.version!, "RSA1_5", new Uint8Array(Buffer.from("MyWrapValue")));
  // console.log("wrap result", wrapResult);

  // Example unwrap
  // const unwrapResult = await client.unwrapKey(keyName, key.version!, "RSA1_5", wrapResult.result!);
  // console.log("unwrap result", Buffer.from(unwrapResult.result!).toString());

  // await client.deleteKey(keyName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
