// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import { useIdentityExtension, DefaultAzureCredential } from "@azure/identity";

import vscodeExtension from "@azure/identity-vscode";
useIdentityExtension(vscodeExtension);

export async function main() {
  const credential = new DefaultAzureCredential();

  console.log(DefaultAzureCredential.credentials);

  console.log(await credential.getToken("https://witemple-appconfig.azconfig.io/.default"));
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
  process.exit(1);
});
