// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

/**
 * In this sample, rather than importing and using `VisualStudioCodeCredential`
 * manually, we use the extension API to add it to the list of credential
 * classes that `DefaultAzureCredential` from the mainline `@azure/identity`
 * package will try.
 *
 * @summary uses Identity extensions to add `VisualStudioCodeCredential` to
 * `DefaultAzureCredential`
 */

import { useIdentityExtension, DefaultAzureCredential } from "@azure/identity";

// The extension is the package's default export, so you may import and use it
// as any name you like, and simply pass it to `useIdentityExtension`.
import vscodeExtension from "@azure/identity-vscode";
useIdentityExtension(vscodeExtension);

export async function main() {
  // You should see that "VisualStudioCodeCredential" is now part of the
  // DefaultAzureCredential's list of credentials (it tries these credentials in
  // order)
  console.log("DefaultAzureCredential components:", DefaultAzureCredential.credentials);

  const credential = new DefaultAzureCredential();

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
