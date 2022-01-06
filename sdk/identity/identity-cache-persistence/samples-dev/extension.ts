// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample shows how to add a persistent token cache to `@azure/identity`
 * using the persistence plugin. Once the persistence plugin is added
 * through `useIdentityPlugin`, some credentials, such as
 * `DeviceCodeCredential`, will be able to retrieve tokens from the cache rather
 * than requesting new tokens from the Azure Active Directory token endpoint.
 *
 * In order to utilize the persistent token cache, the `enabled` property must
 * be set to `true` within `tokenCachePersistenceOptions` in the credential's
 * options.
 *
 * @summary import and use the persistence plugin
 */

import { useIdentityPlugin, DeviceCodeCredential } from "@azure/identity";

import { cachePersistencePlugin } from "@azure/identity-cache-persistence";
useIdentityPlugin(cachePersistencePlugin);

import dotenv from "dotenv";
dotenv.config();

async function main() {
  const credential = new DeviceCodeCredential({
    // This property must be provided, with `enabled` set to true to enable
    // persistent token caching.
    tokenCachePersistenceOptions: {
      enabled: true,
    },
  });

  // This is the scope we will use to get a token from the AAD token endpoint.
  // By default, we'll use the Microsoft Graph scope as an example, but when
  // you use the credential with an Azure SDK package, it will configure the
  // scope for you automatically.
  const scope = process.env.AAD_TEST_SCOPE ?? "https://graph.microsoft.com/.default";

  // A little helper function to print part of an access_token
  const logToken = async () =>
    console.log((await credential.getToken(scope)).token.substr(0, 10), "...");

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
