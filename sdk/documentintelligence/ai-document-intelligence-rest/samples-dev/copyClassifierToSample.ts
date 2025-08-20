// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import createDocumentIntelligenceClient, {
  getLongRunningPoller,
} from "@azure-rest/ai-document-intelligence";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation CopyClassifierTo
 *
 * @summary call operation CopyClassifierTo
 */
async function copyClassifierToSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createDocumentIntelligenceClient(endpointParam, credential);
  const classifierId = "{Your classifierId}";
  const initialResponse = await client
    .path("/documentClassifiers/{classifierId}:copyTo", classifierId)
    .post({
      body: {
        targetResourceId: "{Your targetResourceId}",
        targetResourceRegion: "{Your targetResourceRegion}",
        targetClassifierId: "{Your targetClassifierId}",
        targetClassifierLocation: "{Your targetClassifierLocation}",
        accessToken: "{Your accessToken}",
        expirationDateTime: new Date(),
      },
    });
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function main(): Promise<void> {
  await copyClassifierToSample();
}

main().catch(console.error);
