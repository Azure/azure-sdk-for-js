// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to perform batch document translation using the Azure Document Translation service.
 * It uploads a file to an Azure Blob Storage container, initiates the translation process, and downloads the translated file.
 * The sample uses the Azure SDK for JavaScript to interact with the Document Translation service and Azure Blob Storage.
 * It requires the following environment variables to be set:
 * - DOCUMENT_TRANSLATION_ENDPOINT: The endpoint URL for the Document Translation service.
 * - STORAGE_BLOB_ENDPOINT: The endpoint URL for the Azure Blob Storage account.
 * - TRANSLATION_FILE: The URL of the file to be translated.
 */

import "dotenv/config";
import { DocumentTranslationClient } from "@azure/ai-translation-document";
import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Readable } from "node:stream";

const endpoint =
  process.env["DOCUMENT_TRANSLATION_ENDPOINT"] ||
  "https://<translator-instance>.cognitiveservices.azure.com";
const blobEndpoint =
  process.env["STORAGE_BLOB_ENDPOINT"] || "https://<storage-account-name>.blob.core.windows.net";
const fileUrl =
  process.env["TRANSLATION_FILE"] || "https://constitutioncenter.org/media/files/constitution.pdf";

export async function main(): Promise<void> {
  console.log("== Batch Document Translation ==");
  const credential = new DefaultAzureCredential();
  const client = new DocumentTranslationClient(endpoint, credential);

  const blobServiceClient = new BlobServiceClient(blobEndpoint, credential);
  const sourceContainerClient = blobServiceClient.getContainerClient("docs");
  await sourceContainerClient.createIfNotExists();
  const sourceBlobName = path.basename(new URL(fileUrl).pathname);
  const sourceBlobClient = sourceContainerClient.getBlobClient(sourceBlobName);
  const blockBlobClient = sourceBlobClient.getBlockBlobClient();

  const stream = await new Promise<Readable>((resolve, reject) => {
    https
      .get(fileUrl, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to fetch file. Status code: ${response.statusCode}`));
          return;
        }
        resolve(response);
      })
      .on("error", reject);
  });
  await blockBlobClient.uploadStream(stream);

  const targetContainerClient = blobServiceClient.getContainerClient("translations");
  await targetContainerClient.createIfNotExists();

  // Start translation and wait for it to complete
  const poller = client.startTranslation({
    inputs: [
      {
        source: {
          sourceUrl: sourceContainerClient.url,
        },
        targets: [
          {
            targetUrl: targetContainerClient.url,
            language: "fr",
          },
        ],
      },
    ],
  });

  const result = await poller.pollUntilDone();
  console.log(`Translation completed with status: ${result.status}`);

  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFile);

  for await (const blob of targetContainerClient.listBlobsFlat()) {
    const translatedBlobClient = targetContainerClient.getBlobClient(blob.name);
    const filePath = path.join(currentDir, blob.name);
    await translatedBlobClient.downloadToFile(filePath);
    console.log("Translated file downloaded to:", filePath);
  }
}

main().catch((err) => {
  console.error(err);
});
