// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import DocumentTranslationClient, {
  DocumentTranslateParameters,
  isUnexpected,
  paginate,
} from "../src/index.js";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { writeFileSync } from "node:fs";
import { BlobServiceClient, ContainerSASPermissions } from "@azure/storage-blob";

describe("snippets", () => {
  it("ReadmeSampleKeyCredential", async () => {
    const key = "YOUR_SUBSCRIPTION_KEY";
    const credential = {
      key,
    };
  });

  it("ReadmeSampleCreateClient", async () => {
    const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const credential = {
      key,
    };
    const client = DocumentTranslationClient(endpoint, credential);
  });

  it("ReadmeSampleSynchronousDocumentTranslation", async () => {
    const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const credential = {
      key,
    };
    const client = DocumentTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const options: DocumentTranslateParameters = {
      queryParameters: {
        targetLanguage: "hi",
      },
      contentType: "multipart/form-data",
      body: [
        {
          name: "document",
          body: "This is a test.",
          filename: "test-input.txt",
          contentType: "text/html",
        },
      ],
    };
    // @ts-preserve-whitespace
    const response = await client.path("/document:translate").post(options);
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    // Write the response to a file
    writeFileSync("test-output.txt", response.body);
  });

  it("ReadmeSampleBatchDocumentTranslation", async () => {
    const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const credential = {
      key,
    };
    const client = DocumentTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    // Upload test documents to source container
    const testDocuments = [{ name: "Document1.txt", content: "First english test document" }];
    const sourceContainerName = "source-12345";
    const connectionString =
      "DefaultEndpointsProtocol=httpsAccountName=your_account_name;AccountKey=your_account_key;EndpointSuffix=core.windows.net";
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const sourceContainerClient = blobServiceClient.getContainerClient(sourceContainerName);
    await sourceContainerClient.createIfNotExists();
    for (const document of testDocuments) {
      const blobClient = sourceContainerClient.getBlobClient(document.name);
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload(document.content, document.content.length);
    }
    // @ts-preserve-whitespace
    // Create configuration for the source connection
    const sourceUrl = await sourceContainerClient.generateSasUrl({
      permissions: ContainerSASPermissions.parse("rwl"),
      expiresOn: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    const sourceInput = { sourceUrl };
    // @ts-preserve-whitespace
    // Create target container
    const targetContainerName = "target-12345";
    const targetContainerClient = blobServiceClient.getContainerClient(targetContainerName);
    await targetContainerClient.createIfNotExists();
    // @ts-preserve-whitespace
    // Create configuration for the target connection
    const targetUrl = await targetContainerClient.generateSasUrl({
      permissions: ContainerSASPermissions.parse("rwl"),
      expiresOn: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    const targetInput = { targetUrl, language: "fr" };
    // @ts-preserve-whitespace
    // Start translation
    const batchRequest = { source: sourceInput, targets: [targetInput] };
    const batchRequests = { inputs: [batchRequest] };
    const poller = await client.path("/document/batches").post({
      body: batchRequests,
    });
    // @ts-preserve-whitespace
    const operationId =
      new URL(poller.headers["operation-location"]).pathname.split("/").filter(Boolean).pop() || "";
    console.log(`Translation started and the operationID is: ${operationId}`);
  });

  it("ReadmeSampleCancelDocumentTranslation", async () => {
    const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const credential = {
      key,
    };
    const client = DocumentTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const id = "<operation-id-from-batch-translation>";
    await client.path("/document/batches/{id}", id).delete();
    // @ts-preserve-whitespace
    // Get translation status and verify the job is cancelled, cancelling or notStarted
    const response = await client.path("/document/batches/{id}", id).get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
  });

  it("ReadmeSampleGetDocumentsStatus", async () => {
    const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const credential = {
      key,
    };
    const client = DocumentTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    // Get Documents Status
    const id = "<operation-id-from-batch-translation>";
    const documentResponse = await client.path("/document/batches/{id}/documents", id).get();
    if (isUnexpected(documentResponse)) {
      throw documentResponse.body.error;
    }
    // @ts-preserve-whitespace
    const documentStatus = paginate(client, documentResponse);
    for await (const document of documentStatus) {
      console.log(`Document ${document.id} status: ${document.status}`);
    }
  });

  it("ReadmeSampleGetDocumentStatus", async () => {
    const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const credential = {
      key,
    };
    const client = DocumentTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    // Get Documents Status
    const id = "<operation-id-from-batch-translation>";
    const documentResponse = await client.path("/document/batches/{id}/documents", id).get();
    if (isUnexpected(documentResponse)) {
      throw documentResponse.body.error;
    }
    // @ts-preserve-whitespace
    const documentStatus = paginate(client, documentResponse);
    for await (const document of documentStatus) {
      // @ts-preserve-whitespace
      // Get individual Document Status
      const documentStatus = await client
        .path("/document/batches/{id}/documents/{documentId}", id, document.id)
        .get();

      if (isUnexpected(documentStatus)) {
        throw documentStatus.body.error;
      }
      // @ts-preserve-whitespace
      const documentStatusOutput = documentStatus.body;
      console.log(`Document Status: ${documentStatusOutput.status}`);
      console.log(`Document ID: ${documentStatusOutput.id}`);
      console.log(`Document source path: ${documentStatusOutput.sourcePath}`);
      console.log(`Document path: ${documentStatusOutput.path}`);
      console.log(`Target language: ${documentStatusOutput.to}`);
      console.log(`Document created dateTime: ${documentStatusOutput.createdDateTimeUtc}`);
      console.log(`Document last action date time: ${documentStatusOutput.lastActionDateTimeUtc}`);
    }
  });

  it("ReadmeSampleGetTranslationsStatus", async () => {
    const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const credential = {
      key,
    };
    const client = DocumentTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    // Get status
    const id = "<operation-id-from-batch-translation>";
    const queryParams = {
      ids: [id],
    };
    const response = await client.path("/document/batches").get({
      queryParameters: queryParams,
    });
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    const translationResponse = paginate(client, response);
    for await (const translationStatus of translationResponse) {
      console.log(`Translation ID: ${translationStatus.id}`);
      console.log(`Translation Status ${translationStatus.status}`);
      console.log(`Translation createdDateTimeUtc: ${translationStatus.createdDateTimeUtc}`);
      console.log(`Translation lastActionDateTimeUtc: ${translationStatus.lastActionDateTimeUtc}`);
      console.log(`Total documents submitted for translation: ${translationStatus.summary.total}`);
      console.log(`Total characters charged: ${translationStatus.summary.totalCharacterCharged}`);
    }
  });

  it("ReadmeSampleGetTranslationStatus", async () => {
    const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const credential = {
      key,
    };
    const client = DocumentTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    // Get status
    const id = "<operation-id-from-batch-translation>";
    const response = await client.path("/document/batches/{id}", id).get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    const translationStatus = response.body;
    console.log(`Translation ID: ${translationStatus.id}`);
    console.log(`Translation Status ${translationStatus.status}`);
    console.log(`Translation createdDateTimeUtc: ${translationStatus.createdDateTimeUtc}`);
    console.log(`Translation lastActionDateTimeUtc: ${translationStatus.lastActionDateTimeUtc}`);
    console.log(`Total documents submitted for translation: ${translationStatus.summary.total}`);
    console.log(`Total characters charged: ${translationStatus.summary.totalCharacterCharged}`);
  });

  it("ReadmeSampleGetSupportedFormats", async () => {
    const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const credential = {
      key,
    };
    const client = DocumentTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const response = await client.path("/document/formats").get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    for (const fileFormatType of response.body.value) {
      console.log(`File format: ${fileFormatType.format}`);
      console.log(`Content types: ${fileFormatType.contentTypes}`);
      console.log(`File extensions: ${fileFormatType.fileExtensions}`);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
