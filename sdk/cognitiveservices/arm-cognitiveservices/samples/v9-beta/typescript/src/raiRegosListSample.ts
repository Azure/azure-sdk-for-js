// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists reusable Rego artifacts on an account.
 *
 * @summary lists reusable Rego artifacts on an account.
 * x-ms-original-file: 2026-09-15-preview/ListRaiRegos.json
 */
async function listReusableRegoArtifacts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.raiRegos.list("resource-group", "safety-account", { top: 10 })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listReusableRegoArtifacts();
}

main().catch(console.error);
