// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import createDocumentIntelligenceClient, {
  getLongRunningPoller,
} from "@azure-rest/ai-document-intelligence";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation CopyModelTo
 *
 * @summary call operation CopyModelTo
 */
async function copyModelToSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createDocumentIntelligenceClient(endpointParam, credential);
  const modelId = "{Your modelId}";
  const initialResponse = await client
    .path("/documentModels/{modelId}:copyTo", modelId)
    .post({
      body: {
        targetResourceId: "{Your targetResourceId}",
        targetResourceRegion: "{Your targetResourceRegion}",
        targetModelId: "{Your targetModelId}",
        targetModelLocation: "{Your targetModelLocation}",
        accessToken: "{Your accessToken}",
        expirationDateTime: new Date(),
      },
    });
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function main(): Promise<void> {
  await copyModelToSample();
}

main().catch(console.error);
