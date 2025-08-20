// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createDocumentIntelligenceClient from "@azure-rest/ai-document-intelligence";
import { AzureKeyCredential } from "@azure/core-auth";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation GetResourceDetails
 *
 * @summary call operation GetResourceDetails
 */
async function getResourceDetailsSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createDocumentIntelligenceClient(endpointParam, credential);
  const result = await client.path("/info").get();
  console.log(result);
}

async function main(): Promise<void> {
  await getResourceDetailsSample();
}

main().catch(console.error);
