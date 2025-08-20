// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import createDocumentIntelligenceClient, {
  getLongRunningPoller,
} from "@azure-rest/ai-document-intelligence";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation BuildModel
 *
 * @summary call operation BuildModel
 */
async function buildModelSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createDocumentIntelligenceClient(endpointParam, credential);
  const initialResponse = await client
    .path("/documentModels:build")
    .post({
      body: {
        modelId: "{Your modelId}",
        description: "{Your description}",
        buildMode: "template",
        azureBlobSource: {
          containerUrl: "{Your containerUrl}",
          prefix: "{Your prefix}",
        },
        azureBlobFileListSource: {
          containerUrl: "{Your containerUrl}",
          fileList: "{Your fileList}",
        },
        tags: { key: "{Your tags}" },
        maxTrainingHours: 123,
        allowOverwrite: true,
      },
    });
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function main(): Promise<void> {
  await buildModelSample();
}

main().catch(console.error);
