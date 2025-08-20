// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import createDocumentIntelligenceClient, {
  getLongRunningPoller,
} from "@azure-rest/ai-document-intelligence";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation BuildClassifier
 *
 * @summary call operation BuildClassifier
 */
async function buildClassifierSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createDocumentIntelligenceClient(endpointParam, credential);
  const initialResponse = await client
    .path("/documentClassifiers:build")
    .post({
      body: {
        classifierId: "{Your classifierId}",
        description: "{Your description}",
        baseClassifierId: "{Your baseClassifierId}",
        docTypes: {
          key: {
            sourceKind: "url",
            azureBlobSource: {
              containerUrl: "{Your containerUrl}",
              prefix: "{Your prefix}",
            },
            azureBlobFileListSource: {
              containerUrl: "{Your containerUrl}",
              fileList: "{Your fileList}",
            },
          },
        },
        allowOverwrite: true,
      },
    });
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function main(): Promise<void> {
  await buildClassifierSample();
}

main().catch(console.error);
