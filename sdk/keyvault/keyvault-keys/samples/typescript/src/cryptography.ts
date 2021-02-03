// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHash } from "crypto";

import { KeyClient, CryptographyClient, KnownEncryptionAlgorithms } from "../../../";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";

  // Connection to Azure Key Vault
  const client = new KeyClient(url, credential);

  const uniqueString = new Date().getTime();
  const keyName = `key${uniqueString}`;

  // Connection to Azure Key Vault Cryptography functionality
  let myWorkKey = await client.createKey(keyName, "RSA");

  let cryptoClient = new CryptographyClient(
    myWorkKey.id!, // You can use either the key or the key Id i.e. its url to create a CryptographyClient.
    credential
  );

  // Sign and Verify
  // const signatureValue = "MySignature";
  // let hash = createHash("sha256");

  // hash.update(signatureValue);
  // let digest = hash.digest();
  // console.log("digest: ", digest);

  // const signature = await cryptoClient.sign("RS256", digest);
  // console.log("sign result: ", signature);

  // const verifyResult = await cryptoClient.verify("RS256", digest, signature.result);
  // console.log("verify result: ", verifyResult);

  // // Encrypt and decrypt
  // let encrypt = await cryptoClient.encrypt("RSA1_5", Buffer.from("My Message"));
  // console.log("encrypt result: ", encrypt);

  // let decrypt = await cryptoClient.decrypt("RSA1_5", encrypt.result);
  // console.log("decrypt: ", decrypt.result.toString());

  // Encrypt and decrypt using options
  // console.log(
  //   await cryptoClient.encrypt({ algorithm: "RSA1_5", plaintext: Buffer.from("My Message") })
  // );
  // console.log(
  //   await cryptoClient.encrypt({ algorithm: "RSA-OAEP", plaintext: Buffer.from("My Message") })
  // );
  // console.log(
  //   await cryptoClient.encrypt({ algorithm: "RSA-OAEP-256", plaintext: Buffer.from("My Message") })
  // );

  // Connection to Azure Key Vault Cryptography functionality
  myWorkKey = await client.createKey(keyName, "AES", { keySize: 256 });

  cryptoClient = new CryptographyClient(
    myWorkKey.id!, // You can use either the key or the key Id i.e. its url to create a CryptographyClient.
    credential
  );
  console.log(
    await cryptoClient.encrypt({
      algorithm: "A192GCM",
      plaintext: Buffer.from("My Message"),
      additionalAuthenticatedData: Buffer.from("iv")
    })
  );
  return;
  console.log(
    await cryptoClient.encrypt({
      algorithm: "A192GCM",
      plaintext: Buffer.from("My Message")
    })
  );
  console.log(
    await cryptoClient.encrypt({
      algorithm: "A256GCM",
      plaintext: Buffer.from("My Message")
    })
  );
  console.log(
    await cryptoClient.encrypt({
      algorithm: "A128CBC",
      plaintext: Buffer.from("My Message"),
      iv: Buffer.from("iv") // TODO: is iv optional or required?
    })
  );
  console.log(
    await cryptoClient.encrypt({
      algorithm: "A192CBC",
      plaintext: Buffer.from("My Message")
    })
  );
  console.log(
    await cryptoClient.encrypt(
      {
        algorithm: "A256CBC",
        plaintext: Buffer.from("My Message WITH ABORT SIGNAL")
      },
      {
        requestOptions: {
          timeout: 499
        }
      }
    )
  );
  console.log(
    await cryptoClient.encrypt({
      algorithm: "A128CBCPAD",
      plaintext: Buffer.from("My Message"),
      iv: Buffer.from("iv")
    })
  );
  console.log(
    await cryptoClient.encrypt({
      algorithm: "A256CBCPAD",
      plaintext: Buffer.from("My Message"),
      iv: Buffer.from("iv")
    })
  );
  console.log(
    await cryptoClient.encrypt({
      algorithm: "A192CBCPAD",
      plaintext: Buffer.from("My Message"),
      iv: Buffer.from("iv")
    })
  );

  // Wrap and unwrap
  const wrapped = await cryptoClient.wrapKey("RSA-OAEP", Buffer.from("My Message"));
  console.log("wrap result: ", wrapped);

  const unwrapped = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
  console.log("unwrap result: ", unwrapped);

  await client.beginDeleteKey(keyName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
