// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import createDocumentIntelligenceClient, {
  getLongRunningPoller,
} from "@azure-rest/ai-document-intelligence";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation ClassifyDocumentFromStream
 *
 * @summary call operation ClassifyDocumentFromStream
 */
async function classifyDocumentFromStreamSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createDocumentIntelligenceClient(endpointParam, credential);
  const classifierId = "{Your classifierId}";
  const initialResponse = await client
    .path("/documentClassifiers/{classifierId}:analyze", classifierId)
    .post({
      body: "{Your body}",
      queryParameters: {
        stringIndexType: "textElements",
        split: "auto",
        pages: "{Your pages}",
      },
      contentType: "application/octet-stream",
    });
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function main(): Promise<void> {
  await classifyDocumentFromStreamSample();
}

main().catch(console.error);
