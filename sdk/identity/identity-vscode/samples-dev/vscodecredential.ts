// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

/**
 * This sample shows how to import and use a `VisualStudioCodeCredential` from
 * `@azure/identity-vscode`.
 *
 * @summary demonstrates the use of `VisualStudioCodeCredential`
 */

import { VisualStudioCodeCredential } from "@azure/identity-vscode";

export async function main() {
  const credential = new VisualStudioCodeCredential();

  // This is the scope we will use to get a token from the AAD token endpoint.
  // By default, we'll use the Microsoft Graph scope as an example, but when
  // you use the credential with an Azure SDK package, it will configure the
  // scope for you automatically.
  const scope = process.env.AAD_TEST_SCOPE ?? "https://graph.microsoft.com/.default";

  console.log(await credential.getToken(scope));
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
  process.exit(1);
});
