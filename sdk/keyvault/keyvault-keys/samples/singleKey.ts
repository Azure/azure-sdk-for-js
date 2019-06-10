import { KeysClient } from "../src";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

async function main(): Promise<void> {
  const clientId = process.env["CLIENT_ID"] || "";
  const clientSecret = process.env["CLIENT_SECRET"] || "";
  const tenantId = process.env["TENANT_ID"] || "";
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"

  const url = `https://${vaultName}.vault.azure.net`;
  const credential = await msRestNodeAuth.loginWithServicePrincipalSecret(
    clientId,
    clientSecret,
    tenantId,
    {
      tokenAudience: 'https://vault.azure.net'
    }
  );

  const client = new KeysClient(url, credential);

  const secretName = "MyKeyName";
  const result = await client.createKey("MyKeyName", "RSA");

  console.log("result: ", result);

  for await (let x of client.getKeyVersions("MyKeyName")) {
    console.log(">> ", x);
  }

  const getResult = await client.getKey("MyKeyName");
  console.log("getResult: ", getResult);
  let encoded = Buffer.from("Hello World");

  for await (let x of client.getAllKeys()) {
    console.log(">> ", x);
  }

  await client.deleteKey(secretName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
