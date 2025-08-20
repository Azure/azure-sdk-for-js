// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import createDocumentIntelligenceClient, {
  getLongRunningPoller,
} from "@azure-rest/ai-document-intelligence";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation AnalyzeDocumentFromStream
 *
 * @summary call operation AnalyzeDocumentFromStream
 */
async function analyzeDocumentFromStreamSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createDocumentIntelligenceClient(endpointParam, credential);
  const modelId = "{Your modelId}";
  const initialResponse = await client
    .path("/documentModels/{modelId}:analyze", modelId)
    .post({
      body: "{Your body}",
      queryParameters: {
        pages: "{Your pages}",
        locale: "{Your locale}",
        stringIndexType: "textElements",
        features: ["ocrHighResolution"],
        queryFields: ["{Your queryFields}"],
        outputContentFormat: "text",
        output: ["pdf"],
      },
      contentType: "application/octet-stream",
    });
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function main(): Promise<void> {
  await analyzeDocumentFromStreamSample();
}

main().catch(console.error);
