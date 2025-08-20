// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createDocumentIntelligenceClient from "@azure-rest/ai-document-intelligence";
import { AzureKeyCredential } from "@azure/core-auth";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation GetClassifyResult
 *
 * @summary call operation GetClassifyResult
 */
async function getClassifyResultSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createDocumentIntelligenceClient(endpointParam, credential);
  const classifierId = "{Your classifierId}";
  const resultId = "{Your resultId}";
  const result = await client
    .path(
      "/documentClassifiers/{classifierId}/analyzeResults/{resultId}",
      classifierId,
      resultId,
    )
    .get();
  console.log(result);
}

async function main(): Promise<void> {
  await getClassifyResultSample();
}

main().catch(console.error);
