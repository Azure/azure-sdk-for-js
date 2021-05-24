// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import {VisualStudioCodeCredential} from "@azure/identity-vscode";

export async function main() {
  const credential = new VisualStudioCodeCredential();

  console.log(await credential.getToken("https://witemple-appconfig.azconfig.io/.default"));
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
  process.exit(1);
});
