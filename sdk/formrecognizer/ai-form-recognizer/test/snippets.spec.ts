// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureKeyCredential,
  DocumentAnalysisClient,
  DocumentModelAdministrationClient,
  DocumentSpan,
} from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { createReadStream } from "node:fs";
import { PrebuiltReceiptModel } from "../samples-dev/prebuilt/prebuilt-receipt.js";
import { PrebuiltLayoutModel } from "../samples-dev/prebuilt/prebuilt-layout.js";
import { PrebuiltDocumentModel } from "../samples-dev/prebuilt/prebuilt-document.js";
import { PrebuiltReadModel } from "../samples-dev/prebuilt/prebuilt-read.js";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentAnalysisClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    // Document Intelligence supports many different types of files.
    const file = createReadStream("path/to/file.jpg");
    const poller = await client.beginAnalyzeDocument("<model ID>", file);
    // @ts-preserve-whitespace
    const { pages, tables, styles, keyValuePairs, content, documents } =
      await poller.pollUntilDone();
  });

  it("ReadmeSampleCreateClient_APIKey", async () => {
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const credential = new AzureKeyCredential("<api key>");
    const client = new DocumentAnalysisClient(endpoint, credential);
  });

  it("ReadmeSampleCreateClient_AAD", async () => {
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const credential = new DefaultAzureCredential();
    const client = new DocumentAnalysisClient(endpoint, credential);
  });

  it("ReadmeSampleCreateAdminClient_AAD", async () => {
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(endpoint, credential);
  });

  it("ReadmeSampleCreateAdminClient_APIKey", async () => {
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const credential = new AzureKeyCredential("<api key>");
    const client = new DocumentModelAdministrationClient(endpoint, credential);
  });

  it("ReadmeSampleAnalyzeDocument", async () => {
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const apiKey = "<api key>";
    const modelId = "<model id>";
    const path = "<path to a document>";
    // @ts-preserve-whitespace
    const readStream = createReadStream(path);
    // @ts-preserve-whitespace
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
    const poller = await client.beginAnalyzeDocument(modelId, readStream, {
      onProgress: ({ status }) => {
        console.log(`status: ${status}`);
      },
    });
    // @ts-preserve-whitespace
    // There are more fields than just these three
    const { documents, pages, tables } = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    console.log("Documents:");
    for (const document of documents || []) {
      console.log(`Type: ${document.docType}`);
      console.log("Fields:");
      for (const [name, field] of Object.entries(document.fields)) {
        console.log(
          `Field ${name} has value '${field.content}' with a confidence score of ${field.confidence}`,
        );
      }
    }
    // @ts-preserve-whitespace
    console.log("Pages:");
    for (const page of pages || []) {
      console.log(`Page number: ${page.pageNumber} (${page.width}x${page.height} ${page.unit})`);
    }
    // @ts-preserve-whitespace
    console.log("Tables:");
    for (const table of tables || []) {
      console.log(`- Table (${table.columnCount}x${table.rowCount})`);
      for (const cell of table.cells) {
        console.log(`  - cell (${cell.rowIndex},${cell.columnIndex}) "${cell.content}"`);
      }
    }
  });

  it("ReadmeSampleAnalyzeDocumentPrebuilt", async () => {
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const apiKey = "<api key>";
    const path = "<path to your receipt document>"; // pdf/jpeg/png/tiff formats
    // @ts-preserve-whitespace
    const readStream = createReadStream(path);
    // @ts-preserve-whitespace
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
    // @ts-preserve-whitespace
    // The PrebuiltReceiptModel `DocumentModel` instance encodes both the model ID and a stronger return type for the operation
    const poller = await client.beginAnalyzeDocument(PrebuiltReceiptModel, readStream, {
      onProgress: ({ status }) => {
        console.log(`status: ${status}`);
      },
    });

    const {
      documents: [document],
    } = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    // Use of PrebuiltModels.Receipt above (rather than the raw model ID), as it adds strong typing of the model's output
    if (document) {
      const { merchantName, items, total } = document.fields;
      // @ts-preserve-whitespace
      console.log("=== Receipt Information ===");
      console.log("Type:", document.docType);
      console.log("Merchant:", merchantName && merchantName.value);
      // @ts-preserve-whitespace
      console.log("Items:");
      for (const item of (items && items.values) || []) {
        const { description, totalPrice } = item.properties;
        // @ts-preserve-whitespace
        console.log("- Description:", description && description.value);
        console.log("  Total Price:", totalPrice && totalPrice.value);
      }
      // @ts-preserve-whitespace
      console.log("Total:", total && total.value);
    } else {
      throw new Error("Expected at least one receipt in the result.");
    }
  });

  it("ReadmeSampleAnalyzeDocumentPrebuiltLayout", async () => {
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const apiKey = "<api key>";
    const path = "<path to a document>"; // pdf/jpeg/png/tiff formats
    // @ts-preserve-whitespace
    const readStream = createReadStream(path);
    // @ts-preserve-whitespace
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
    const poller = await client.beginAnalyzeDocument(PrebuiltLayoutModel, readStream);
    const { pages, tables } = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    for (const page of pages || []) {
      console.log(`- Page ${page.pageNumber}: (${page.width}x${page.height} ${page.unit})`);
    }
    // @ts-preserve-whitespace
    for (const table of tables || []) {
      console.log(`- Table (${table.columnCount}x${table.rowCount})`);
      for (const cell of table.cells) {
        console.log(`  cell [${cell.rowIndex},${cell.columnIndex}] "${cell.content}"`);
      }
    }
  });

  it("ReadmeSampleAnalyzeDocumentPrebuiltDocument", async () => {
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const apiKey = "<api key>";
    const path = "<path to a document>"; // pdf/jpeg/png/tiff formats
    // @ts-preserve-whitespace
    const readStream = createReadStream(path);
    // @ts-preserve-whitespace
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
    const poller = await client.beginAnalyzeDocument(PrebuiltDocumentModel, readStream);
    // @ts-preserve-whitespace
    // `pages`, `tables` and `styles` are also available as in the "layout" example above, but for the sake of this
    // example we won't show them here.
    const { keyValuePairs } = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    if (!keyValuePairs || keyValuePairs.length <= 0) {
      console.log("No key-value pairs were extracted from the document.");
    } else {
      console.log("Key-Value Pairs:");
      for (const { key, value, confidence } of keyValuePairs) {
        console.log("- Key  :", `"${key.content}"`);
        console.log("  Value:", `"${value?.content ?? "<undefined>"}" (${confidence})`);
      }
    }
  });

  it("ReadmeSampleAnalyzeDocumentPrebuiltRead", async () => {
    function* getTextOfSpans(content: string, spans: Iterable<DocumentSpan>): Iterable<string> {
      // @ts-ignore
      for (const span of spans) {
        yield content.slice(span.offset, span.offset + span.length);
      }
    }
    // @ts-preserve-whitespace
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const apiKey = "<api key>";
    const path = "<path to a document>"; // pdf/jpeg/png/tiff formats
    // @ts-preserve-whitespace
    const readStream = createReadStream(path);
    // @ts-preserve-whitespace
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
    const poller = await client.beginAnalyzeDocument(PrebuiltReadModel, readStream);
    // @ts-preserve-whitespace
    // The "prebuilt-read" model (`beginReadDocument` method) only extracts information about the textual content of the
    // document, such as page text elements, text styles, and information about the language of the text.
    const { content, pages, languages } = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    if (!pages || pages.length <= 0) {
      console.log("No pages were extracted from the document.");
    } else {
      console.log("Pages:");
      for (const page of pages) {
        console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
        console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
        console.log(
          `  ${page.lines && page.lines.length} lines, ${page.words && page.words.length} words`,
        );
        // @ts-preserve-whitespace
        if (page.lines && page.lines.length > 0) {
          console.log("  Lines:");
          // @ts-preserve-whitespace
          for (const line of page.lines) {
            console.log(`  - "${line.content}"`);
          }
        }
      }
    }
    // @ts-preserve-whitespace
    if (!languages || languages.length <= 0) {
      console.log("No language spans were extracted from the document.");
    } else {
      console.log("Languages:");
      for (const languageEntry of languages) {
        console.log(
          `- Found language: ${languageEntry.locale} (confidence: ${languageEntry.confidence})`,
        );
        // @ts-preserve-whitespace
        // @ts-ignore
        for (const text of getTextOfSpans(content, languageEntry.spans)) {
          const escapedText = text.replace(/\r?\n/g, "\\n").replace(/"/g, '\\"');
          console.log(`  - "${escapedText}"`);
        }
      }
    }
  });

  it("ReadmeSampleClassifyDocument", async () => {
    const endpoint = "<endpoint>";
    const credential = new AzureKeyCredential("<api key>");
    // @ts-preserve-whitespace
    const documentUrl =
      "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/invoice/Invoice_1.pdf";
    // @ts-preserve-whitespace
    const client = new DocumentAnalysisClient(endpoint, credential);
    // @ts-preserve-whitespace
    const poller = await client.beginClassifyDocumentFromUrl("<classifier id>", documentUrl);
    // @ts-preserve-whitespace
    const result = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    if (result.documents === undefined || result.documents.length === 0) {
      throw new Error("Failed to extract any documents.");
    }
    // @ts-preserve-whitespace
    for (const document of result.documents) {
      console.log(
        `Extracted a document with type '${document.docType}' on page ${document.boundingRegions?.[0].pageNumber} (confidence: ${document.confidence})`,
      );
    }
  });

  it("ReadmeSampleBuildModel", async () => {
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const apiKey = "<api key>";
    const containerSasUrl = "<SAS url to the blob container storing training documents>";
    // @ts-preserve-whitespace
    const client = new DocumentModelAdministrationClient(endpoint, new AzureKeyCredential(apiKey));
    // @ts-preserve-whitespace
    // You must provide the model ID. It can be any text that does not start with "prebuilt-".
    // For example, you could provide a randomly generated GUID using the "uuid" package.
    // The second parameter is the SAS-encoded URL to an Azure Storage container with the training documents.
    // The third parameter is the build mode: one of "template" (the only mode prior to 4.0.0-beta.3) or "neural".
    // See https://aka.ms/azsdk/formrecognizer/buildmode for more information about build modes.
    const poller = await client.beginBuildDocumentModel("<model ID>", containerSasUrl, "template", {
      // The model description is optional and can be any text.
      description: "This is my new model!",
      onProgress: ({ status }) => {
        console.log(`operation status: ${status}`);
      },
    });
    const model = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    console.log("Model ID:", model.modelId);
    console.log("Description:", model.description);
    console.log("Created:", model.createdOn);
    // @ts-preserve-whitespace
    // A model may contain several document types, which describe the possible object structures of fields extracted using
    // this model
    // @ts-preserve-whitespace
    console.log("Document Types:");
    // @ts-ignore
    for (const [docType, { description, fieldSchema: schema }] of Object.entries(
      model.docTypes ?? {},
    )) {
      console.log(`- Name: "${docType}"`);
      console.log(`  Description: "${description}"`);
      // @ts-preserve-whitespace
      // For simplicity, this example will only show top-level field names
      console.log("  Fields:");
      // @ts-preserve-whitespace
      for (const [fieldName, fieldSchema] of Object.entries(schema)) {
        // @ts-ignore
        console.log(`  - "${fieldName}" (${fieldSchema.type})`);
        // @ts-ignore
        console.log(`    ${fieldSchema.description ?? "<no description>"}`);
      }
    }
  });

  it("ReadmeSampleManageModels", async () => {
    const endpoint = "https://<resource name>.cognitiveservices.azure.com";
    const apiKey = "<api key>";
    const client = new DocumentModelAdministrationClient(endpoint, new AzureKeyCredential(apiKey));
    // @ts-preserve-whitespace
    // Produces an async iterable that supports paging (`PagedAsyncIterableIterator`). The `listDocumentModels` method will only
    // iterate over model summaries, which do not include detailed schema information. Schema information is only returned
    // from `getDocumentModel` as part of the full model information.
    const models = client.listDocumentModels();
    let i = 1;
    for await (const summary of models) {
      console.log(`Model ${i++}:`, summary);
    }
    // @ts-preserve-whitespace
    // The iterable is paged, and the application can control the flow of paging if needed
    i = 1;
    for await (const page of client.listDocumentModels().byPage()) {
      for (const summary of page) {
        console.log(`Model ${i++}`, summary);
      }
    }
    // @ts-preserve-whitespace
    // We can also get a full ModelInfo by ID. Here we only show the basic information. See the documentation and the
    // `getDocumentModel` sample program for information about the `docTypes` field, which contains the model's document type
    // schemas.
    const model = await client.getDocumentModel("<model ID>");
    console.log("ID", model.modelId);
    console.log("Created:", model.createdOn);
    console.log("Description: ", model.description ?? "<none>");
    // @ts-preserve-whitespace
    // A model can also be deleted by its model ID. Once it is deleted, it CANNOT be recovered.
    const modelIdToDelete = "<model ID that should be deleted forever>";
    await client.deleteDocumentModel(modelIdToDelete);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
