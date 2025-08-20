// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import createDocumentIntelligenceClient, {
  getLongRunningPoller,
} from "@azure-rest/ai-document-intelligence";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation AnalyzeBatchDocuments
 *
 * @summary call operation AnalyzeBatchDocuments
 */
async function analyzeBatchDocumentsSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createDocumentIntelligenceClient(endpointParam, credential);
  const modelId = "{Your modelId}";
  const initialResponse = await client
    .path("/documentModels/{modelId}:analyzeBatch", modelId)
    .post({
      body: {
        azureBlobSource: {
          containerUrl: "{Your containerUrl}",
          prefix: "{Your prefix}",
        },
        azureBlobFileListSource: {
          containerUrl: "{Your containerUrl}",
          fileList: "{Your fileList}",
        },
        resultContainerUrl: "{Your resultContainerUrl}",
        resultPrefix: "{Your resultPrefix}",
        overwriteExisting: true,
      },
      queryParameters: {
        pages: "{Your pages}",
        locale: "{Your locale}",
        stringIndexType: "textElements",
        features: ["ocrHighResolution"],
        queryFields: ["{Your queryFields}"],
        outputContentFormat: "text",
        output: ["pdf"],
      },
      contentType: "application/json",
    });
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function main(): Promise<void> {
  await analyzeBatchDocumentsSample();
}

main().catch(console.error);
