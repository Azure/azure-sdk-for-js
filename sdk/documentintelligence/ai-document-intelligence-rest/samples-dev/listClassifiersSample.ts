// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import createDocumentIntelligenceClient, {
  paginate,
} from "@azure-rest/ai-document-intelligence";
import "dotenv/config";

/**
 * This sample demonstrates how to call operation ListClassifiers
 *
 * @summary call operation ListClassifiers
 */
async function listClassifiersSample(): Promise<void> {
  const endpointParam = "{Your endpointParam}";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createDocumentIntelligenceClient(endpointParam, credential);
  const initialResponse = await client
    .path("/documentClassifiers")
    .get({
      headers: { "x-ms-client-request-id": "{Your x-ms-client-request-id}" },
    });
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

async function main(): Promise<void> {
  await listClassifiersSample();
}

main().catch(console.error);
