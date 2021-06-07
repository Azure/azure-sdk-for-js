// Copyright (c) Microsoft Corporation
// Licensed under the MIT license

import {
  useIdentityExtension,
  DeviceCodeCredential,
  IdentityExtensionModule
} from "@azure/identity";

async function getPersistence(): Promise<IdentityExtensionModule> {
  return require("@azure/identity-cache-persistence");
}

import dotenv from "dotenv";
dotenv.config();

async function main() {
  // If your environment supports it (ES2020 or newer), you can use
  // `import("@azure/identity-cache-persistence")` instead.
  await useIdentityExtension(getPersistence());

  const credential = new DeviceCodeCredential({ tokenCachePersistenceOptions: {} });

  // This is the scope we will use to get a token from the AAD token endpoint.
  // By default, we'll use the Microsoft Graph scope as an example, but when
  // you use the credential with an Azure SDK package, it will configure the
  // scope for you automatically.
  const scope = process.env.AAD_TEST_SCOPE ?? "https://graph.microsoft.com/.default";

  // A little helper function to print an access_token
  const logToken = async () => console.log(await (await credential.getToken(scope)).token);

  // You should observe that the same token is printed twice. if not, then caching isn't working properly.
  console.log("Calling getToken()", 1);
  await logToken();
  console.log("Calling getToken()", 2);
  await logToken();
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
  process.exit(1);
});
