// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import createDocumentIntelligenceClient, {
  getLongRunningPoller,
} from "@azure-rest/ai-document-intelligence";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation ComposeModel
 *
 * @summary call operation ComposeModel
 */
async function composeModelSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createDocumentIntelligenceClient(endpointParam, credential);
  const initialResponse = await client
    .path("/documentModels:compose")
    .post({
      body: {
        modelId: "{Your modelId}",
        description: "{Your description}",
        classifierId: "{Your classifierId}",
        split: "auto",
        docTypes: {
          key: {
            description: "{Your description}",
            buildMode: "template",
            fieldSchema: {
              key: {
                type: "string",
                description: "{Your description}",
                example: "{Your example}",
                items: {} as any /**FIXME */,
                properties: { key: {} as any /**FIXME */ },
              },
            },
            fieldConfidence: { key: 123 },
            modelId: "{Your modelId}",
            confidenceThreshold: 123,
            features: ["ocrHighResolution"],
            queryFields: ["{Your queryFields}"],
            maxDocumentsToAnalyze: 123,
          },
        },
        tags: { key: "{Your tags}" },
      },
    });
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function main(): Promise<void> {
  await composeModelSample();
}

main().catch(console.error);
