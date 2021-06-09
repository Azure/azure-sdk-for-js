// Copyright (c) Microsoft Corporation
// Licensed under the MIT license

/**
 * This sample demonstrates how to use `useIdentityExtension` to add the
 * persistent token cache extension to `@azure/identity` asynchronously. In the
 * example, as in the other example, we use `DeviceCodeCredential` to
 * demonstrate how the persistent caching extension allows skipping the
 * interactive login flow if a cached token is available.
 *
 * In order to utilize the persistent token cache, the `enabled` property must
 * be set to `true` within `tokenCachePersistenceOptions` in the credential's
 * options.
 *
 * @summary import and use the persistence extension asynchronously
 */

import {
  useIdentityExtension,
  DeviceCodeCredential,
  IdentityExtensionModule
} from "@azure/identity";

/**
 * This function emulates an asynchronous import (`import` expressions in ES2020).
 *
 * We only use this function as a demonstration of asynchronous support in
 * `useIdentityExtension`.
 */
async function getPersistence(): Promise<IdentityExtensionModule> {
  return require("@azure/identity-cache-persistence");
}

import dotenv from "dotenv";
dotenv.config();

async function main() {
  // If your environment supports it (ES2020 or newer), you can use
  // `await useIdentityExtension(import("@azure/identity-cache-persistence"))`
  // instead.
  await useIdentityExtension(getPersistence());

  const credential = new DeviceCodeCredential({
    // This property must be provided, with `enabled` set to true to enable
    // persistent token caching.
    tokenCachePersistenceOptions: {
      enabled: true
    }
  });

  // This is the scope we will use to get a token from the AAD token endpoint.
  // By default, we'll use the Microsoft Graph scope as an example, but when
  // you use the credential with an Azure SDK package, it will configure the
  // scope for you automatically.
  const scope = process.env.AAD_TEST_SCOPE ?? "https://graph.microsoft.com/.default";

  // A little helper function to print an access_token
  const logToken = async () => console.log((await credential.getToken(scope)).token);

  // You should observe that the same token is printed twice, and that running the sample twice
  // only prompts for interactive authentication once. In the second execution, the token should
  // be retrieved from the cache.
  console.log("Calling getToken()", 1);
  await logToken();
  console.log("Calling getToken()", 2);
  await logToken();
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
  process.exit(1);
});
