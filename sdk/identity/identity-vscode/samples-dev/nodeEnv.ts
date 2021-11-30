// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

/**
 * This sample shows an example of how to load the `@azure/identity-vscode`
 * plugin only in certain environments. As an example, we use the NODE_ENV
 * environment variable to determine whether or not to load the plugin.
 *
 * NOTE: The NODE_ENV environment variable is merely a convention, and you are
 * responsible for setting it as appropriate, for example, by setting the
 * variable at runtime:
 *
 * ```bash
 * $ NODE_ENV="production" node dist/nodeEnv.js
 * ```
 *
 * @summary uses NODE_ENV to load the plugin only in development environments
 * @azsdk-weight -10
 */

import { useIdentityPlugin, DefaultAzureCredential } from "@azure/identity";

// Get the environment according to NODE_ENV. If it is not defined, we will
// assume the environment is _not_ a production environment. This may not be
// what you want for your use case.
const isProduction = process.env.NODE_ENV === "production";

// We'll load the VisualStudioCodeCredential plugin only in non-production
// environments. For your use case, this could be "development" only, but you
// may also have other development environments. You can customize this logic to
// suit your needs.
if (!isProduction) {
  const {
    vsCodePlugin
  } = require("@azure/identity-vscode") as typeof import("@azure/identity-vscode");
  useIdentityPlugin(vsCodePlugin);
}

export async function main() {
  const credential = new DefaultAzureCredential();

  // This is the scope we will use to get a token from the AAD token endpoint.
  // By default, we'll use the Microsoft Graph scope as an example, but when
  // you use the credential with an Azure SDK package, it will configure the
  // scope for you automatically.
  const scope = process.env.AAD_TEST_SCOPE ?? "https://graph.microsoft.com/.default";

  // Print out part of the access token
  console.log((await credential.getToken(scope)).token.substr(0, 10), "...");
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
  process.exit(1);
});
