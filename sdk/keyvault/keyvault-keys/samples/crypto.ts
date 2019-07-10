import { KeysClient, JsonWebKeyEncryptionAlgorithm } from "../src";
import { EnvironmentCredential } from "@azure/identity";
import * as crypto from 'crypto';

async function main(): Promise<void> {
  // EnvironmentCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new EnvironmentCredential();
  const keyto = require('@trust/keyto')

  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"
  const url = `https://${vaultName}.vault.azure.net`;
  const client = new KeysClient(url, credential);

  const keyName = "MyKeyName";
  const signatureValue = "MySignature";

  const key = await client.getKey(keyName);
  //console.log("key: ", key);

  let keyPEM = keyto.from(key.keyMaterial!, "jwk").toString('pem', 'public_pkcs1');
  //console.log("PEM: ", keyPEM);

  // SIGN/VERIFY ORACLE
  // let hash = crypto.createHash("sha256");
  // hash.update(signatureValue);
  // let signature = hash.digest();
  // console.log("digest: ", signature);

  // const signResult = await client.sign(keyName, key.version!, "RS256", signature);
  // console.log("sign result: ", signResult);

  // const verifyResult = await client.verify(keyName, key.version!, "RS256", signature, signResult.result!);
  // console.log("verify result: ", verifyResult);

  // const verifier = crypto.createVerify("sha256");
  // verifier.update(signatureValue);
  // verifier.end();

  // console.log(verifier.verify(keyPEM, Buffer.from(signResult.result!)));

  // ENCRYPT/DECRYPT ORACLE
  let toEncryptBuffer = Buffer.from("mysecretpassword123");

  const encrypted = crypto.publicEncrypt(keyPEM, toEncryptBuffer);
  console.log("from node: ", encrypted);

  const decryptResult = await client.decrypt(keyName, key.version, "RSA-OAEP", new Uint8Array(encrypted));
  console.log(decryptResult.result!.toString());

  //let hash2 = crypto.createHash("sha256").update(Buffer.from(key.keyMaterial!.n)).digest("hex").slice(0, 32);

  // const iv = Buffer.alloc(16, 0);
  // let cipher = crypto.createCipheriv("RSA-SHA512", hash2, iv);
  // let encrypted = '';
  // cipher.on('readable', () => {
  //   let chunk;
  //   while (null !== (chunk = cipher.read())) {
  //     encrypted += chunk.toString('hex');
  //   }
  // });
  // cipher.on('end', () => {
  //   console.log(encrypted);
  //   // Prints: e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa
  // });

  // cipher.write("mysecretpassword123");
  // cipher.end();

  // const encryptResult = await client.encrypt(keyName, key.version!, 'RSA1_5', new Uint8Array(Buffer.from("mysecretpassword123")));
  // console.log("encrypt result: ", encryptResult);

  // const decryptResult = await client.decrypt(keyName, key.version!, "RSA1_5", encryptResult.result!);
  // console.log("decrypt result:", Buffer.from(decryptResult.result!).toString());

  // let tempSignature = Buffer.from("MySignature").toString("base64");
  // let signature = new Uint8Array(Buffer.from(tempSignature + tempSignature));

  // const signResult = await client.sign(keyName, key.version!, "RS256", signature);
  // console.log("sign result: ", signResult);

  // const verifyResult = await client.verify(keyName, key.version!, "RS256", signature, signResult.result!);
  // console.log("verify result: ", verifyResult);

  // const wrapResult = await client.wrapKey(keyName, key.version!, "RSA1_5", new Uint8Array(Buffer.from("MyWrapValue")));
  // console.log("wrap result", wrapResult);

  // const unwrapResult = await client.unwrapKey(keyName, key.version!, "RSA1_5", wrapResult.result!);
  // console.log("unwrap result", Buffer.from(unwrapResult.result!).toString());

  // await client.deleteKey(keyName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
