// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningClient } from "@azure/arm-artifactsigning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if the artifact signing account name is valid and is not already in use.
 *
 * @summary checks if the artifact signing account name is valid and is not already in use.
 * x-ms-original-file: 2025-10-13/CodeSigningAccounts_CheckNameAvailability.json
 */
async function checksIfTheArtifactSigningAccountNameIsAvailable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const result = await client.codeSigningAccounts.checkNameAvailability({
    type: "Microsoft.CodeSigning/codeSigningAccounts",
    name: "sample-account",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checksIfTheArtifactSigningAccountNameIsAvailable();
}

main().catch(console.error);
