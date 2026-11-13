// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists lightweight AKS attachment summaries for the account.
 * Use GET on an individual attachment to retrieve its full status and bindings.
 *
 * @summary lists lightweight AKS attachment summaries for the account.
 * Use GET on an individual attachment to retrieve its full status and bindings.
 * x-ms-original-file: 2026-11-15-preview/ListAttachedAksClusters.json
 */
async function listAttachedAksClusters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.attachedAksClusters.list("rgcognitiveservices", "myAccount", {
    filter: "stage eq 'Ready'",
    orderby: "createdTime desc",
    top: 1,
    skip: 0,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAttachedAksClusters();
}

main().catch(console.error);
