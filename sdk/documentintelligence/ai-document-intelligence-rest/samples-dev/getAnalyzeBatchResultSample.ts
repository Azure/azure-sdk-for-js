// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createDocumentIntelligenceClient from "@azure-rest/ai-document-intelligence";
import { AzureKeyCredential } from "@azure/core-auth";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation GetAnalyzeBatchResult
 *
 * @summary call operation GetAnalyzeBatchResult
 */
async function getAnalyzeBatchResultSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createDocumentIntelligenceClient(endpointParam, credential);
  const modelId = "{Your modelId}";
  const resultId = "{Your resultId}";
  const result = await client
    .path(
      "/documentModels/{modelId}/analyzeBatchResults/{resultId}",
      modelId,
      resultId,
    )
    .get();
  console.log(result);
}

async function main(): Promise<void> {
  await getAnalyzeBatchResultSample();
}

main().catch(console.error);
