// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureKeyCredential,
  DocumentAnalysisClient,
  DocumentArrayField,
  DocumentModelAdministrationClient,
  DocumentObjectField,
  DocumentStringField,
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
    const { pages, tables, styles, keyValuePairs, documents } = await poller.pollUntilDone();
  });

  it("ReadmeSampleReceiptModelID_URL", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentAnalysisClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const poller = await client.beginAnalyzeDocumentFromUrl(
      "prebuilt-receipt",
      // The Document Intelligence service will access the following URL to a receipt image and extract data from it
      "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-receipt.png",
    );
    poller.onProgress((state) => console.log("Operation:", state.modelId, state.status));
    // @ts-preserve-whitespace
    const { documents } = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    const result = documents && documents[0];
    if (result) {
      const receipt = result.fields;
      console.log("=== Receipt Information ===");
      console.log("Type:", result.docType);
      console.log("Merchant:", (receipt["MerchantName"] as DocumentStringField).value);
      // @ts-preserve-whitespace
      console.log("Items:");
      for (const { properties: item } of ((receipt["Items"] as DocumentArrayField).values ||
        []) as DocumentObjectField[]) {
        console.log("- Description:", (item["Description"] as DocumentStringField).value);
        console.log("  Total Price:", (item["TotalPrice"] as DocumentStringField).value);
      }
    } else {
      throw new Error("Expected at least one receipt in the result.");
    }
  });

  it("ReadmeSampleReceiptPrebuilt_URL", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentAnalysisClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const poller = await client.beginAnalyzeDocumentFromUrl(
      PrebuiltReceiptModel,
      // The Document Intelligence service will access the following URL to a receipt image and extract data from it
      "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-receipt.png",
    );
    // @ts-preserve-whitespace
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

  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const credential = new AzureKeyCredential("<API key>");
    const client = new DocumentAnalysisClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentAnalysisClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
  });

  it("ReadmeSampleAnalyzeDocumentWithModelId", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentAnalysisClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const modelId = "<model id>";
    const path = "<path to a document>";
    const readStream = createReadStream(path);
    // @ts-preserve-whitespace
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
          `Field ${name} has content '${field.content}' with a confidence score of ${field.confidence}`,
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

  it("ReadmeSamplePrebuiltReceipt", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentAnalysisClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const path = "<path to a document>";
    const readStream = createReadStream(path);
    // @ts-preserve-whitespace
    // The PrebuiltReceiptModel `DocumentModel` instance encodes both the model ID and a stronger return type for the operation
    const poller = await client.beginAnalyzeDocument(PrebuiltReceiptModel, readStream, {
      onProgress: ({ status }) => {
        console.log(`status: ${status}`);
      },
    });
    // @ts-preserve-whitespace
    const {
      documents: [receiptDocument],
    } = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    // The fields of the document constitute the extracted receipt data.
    const receipt = receiptDocument.fields;
    // @ts-preserve-whitespace
    if (receipt === undefined) {
      throw new Error("Expected at least one receipt in analysis result.");
    }
    // @ts-preserve-whitespace
    console.log(`Receipt data (${receiptDocument.docType})`);
    console.log("  Merchant Name:", receipt.merchantName?.value);
    // @ts-preserve-whitespace
    // The items of the receipt are an example of a `DocumentArrayValue`
    if (receipt.items !== undefined) {
      console.log("Items:");
      for (const { properties: item } of receipt.items.values) {
        console.log("- Description:", item.description?.value);
        console.log("  Total Price:", item.totalPrice?.value);
      }
    }
    // @ts-preserve-whitespace
    console.log("  Total:", receipt.total?.value);
  });

  it("ReadmeSamplePrebuiltLayout", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentAnalysisClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const path = "<path to a document>";
    const readStream = createReadStream(path);
    // @ts-preserve-whitespace
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

  it("ReadmeSamplePrebuiltDocument", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentAnalysisClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const path = "<path to a document>";
    const readStream = createReadStream(path);
    // @ts-preserve-whitespace
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

  it("ReadmeSamplePrebuiltRead", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentAnalysisClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const path = "<path to a document>";
    const readStream = createReadStream(path);
    // @ts-preserve-whitespace
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
    // @ts-preserve-whitespace
    function* getTextOfSpans(content, spans) {
      for (const span of spans) {
        yield content.slice(span.offset, span.offset + span.length);
      }
    }
  });

  it("ReadmeSampleClassifyDocument", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentAnalysisClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const documentUrl =
      "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/invoice/Invoice_1.pdf";
    // @ts-preserve-whitespace
    const poller = await client.beginClassifyDocumentFromUrl("<classifier id>", documentUrl);
    // @ts-preserve-whitespace
    const result = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    if (result?.documents?.length === 0) {
      throw new Error("Failed to extract any documents.");
    }
    // @ts-preserve-whitespace
    for (const document of result.documents) {
      console.log(
        `Extracted a document with type '${document.docType}' on page ${document.boundingRegions?.[0].pageNumber} (confidence: ${document.confidence})`,
      );
    }
  });

  it("ReadmeSampleClassifyDocument_File", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentAnalysisClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const path = "<path to a document>";
    const readStream = createReadStream(path);
    // @ts-preserve-whitespace
    const poller = await client.beginClassifyDocument("<classifier id>", readStream);
    // @ts-preserve-whitespace
    const result = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    if (result?.documents?.length === 0) {
      throw new Error("Failed to extract any documents.");
    }
    // @ts-preserve-whitespace
    for (const document of result.documents) {
      console.log(
        `Extracted a document with type '${document.docType}' on page ${document.boundingRegions?.[0].pageNumber} (confidence: ${document.confidence})`,
      );
    }
  });

  it("ReadmeSampleAdministrationClient_KeyCredential", async () => {
    const credential = new AzureKeyCredential("<API key>");
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
  });

  it("ReadmeSampleAdministrationClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
  });

  it("ReadmeSampleBuildModel", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const containerSasUrl = "<SAS url to the blob container storing training documents>";
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
    console.log(`Model ID: ${model.modelId}`);
    console.log(`Description: ${model.description}`);
    console.log(`Created: ${model.createdOn}`);
    // @ts-preserve-whitespace
    // A model may contain several document types, which describe the possible object structures of fields extracted using
    // this model
    // @ts-preserve-whitespace
    console.log("Document Types:");
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
        console.log(`  - "${fieldName}" (${fieldSchema.type})`);
        console.log(`    ${fieldSchema.description ?? "<no description>"}`);
      }
    }
  });

  it("ReadmeSampleBuildModel_Container", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const containerSasUrl = "<SAS url to the blob container storing training documents>";
    // @ts-preserve-whitespace
    // You must provide the model ID. It can be any text that does not start with "prebuilt-".
    // For example, you could provide a randomly generated GUID using the "uuid" package.
    // The second parameter is the SAS-encoded URL to an Azure Storage container with the training documents.
    // The third parameter is the build mode: one of "template" (the only mode prior to 4.0.0-beta.3) or "neural".
    // See https://aka.ms/azsdk/formrecognizer/buildmode for more information about build modes.
    const poller = await client.beginBuildDocumentModel(
      "<model ID>",
      { azureBlobSource: { containerUrl: containerSasUrl } },
      "template",
      {
        // The model description is optional and can be any text.
        description: "This is my new model!",
        onProgress: ({ status }) => {
          console.log(`operation status: ${status}`);
        },
      },
    );
    const model = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    console.log(`Model ID: ${model.modelId}`);
    console.log(`Description: ${model.description}`);
    console.log(`Created: ${model.createdOn}`);
    // @ts-preserve-whitespace
    // A model may contain several document types, which describe the possible object structures of fields extracted using
    // this model
    // @ts-preserve-whitespace
    console.log("Document Types:");
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
        console.log(`  - "${fieldName}" (${fieldSchema.type})`);
        console.log(`    ${fieldSchema.description ?? "<no description>"}`);
      }
    }
  });

  it("ReadmeSampleComposeModel", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const composeModelId = "aNewComposedModel";
    const subModelIds = ["documentType1Model", "documentType2Model", "documentType3Model"];
    // @ts-preserve-whitespace
    // The resulting composed model can classify and extract data from documents
    // conforming to any of the above document types
    const poller = await client.beginComposeDocumentModel(composeModelId, subModelIds, {
      description: "This is a composed model that can handle several document types.",
    });
    // Model composition, like all other model creation operations, returns a poller that eventually produces a
    // ModelDetails object
    const modelDetails = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    const {
      modelId, // identical to the modelId given when creating the model
      description, // identical to the description given when creating the model
      createdOn, // the Date (timestamp) that the model was created
      docTypes, // information about the document types of the composed submodels
    } = modelDetails;
  });

  it("ReadmeSampleGetCopyAuthorization", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    // The copyAuthorization data structure stored below grants any cognitive services resource the right to copy a
    // model into the client's resource with the given destination model ID.
    const copyAuthorization = await client.getCopyAuthorization("<destination model ID>");
  });

  it("ReadmeSampleCopyModel", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    // We create the copy authorization using a client authenticated with the destination resource. Note that these two
    // resources can be the same (you can copy a model to a new ID in the same resource).
    const copyAuthorization = await client.getCopyAuthorization("<destination model ID>");
    // @ts-preserve-whitespace
    // Finally, use the _source_ client to copy the model and await the copy operation
    // We need a client for the source model's resource
    const sourceEndpoint = "https://<source resource name>.cognitiveservices.azure.com";
    const sourceCredential = new AzureKeyCredential("<source api key>");
    const sourceClient = new DocumentModelAdministrationClient(sourceEndpoint, sourceCredential);
    const poller = await sourceClient.beginCopyModelTo("<source model ID>", copyAuthorization);
    // @ts-preserve-whitespace
    // Model copying, like all other model creation operations, returns a poller that eventually produces a ModelDetails
    // object
    const modelDetails = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    const {
      modelId, // identical to the modelId given when creating the copy authorization
      description, // identical to the description given when creating the copy authorization
      createdOn, // the Date (timestamp) that the model was created
      docTypes, // information about the document types of the model (identical to the original, source model)
    } = modelDetails;
  });

  it("ReadmeSampleManageModels", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
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
    console.log(`ID ${model.modelId}`);
    console.log(`Created: ${model.createdOn}`);
    console.log(`Description: ${model.description ?? "<none>"}`);
    // @ts-preserve-whitespace
    // A model can also be deleted by its model ID. Once it is deleted, it CANNOT be recovered.
    const modelIdToDelete = "<model ID that should be deleted forever>";
    await client.deleteDocumentModel(modelIdToDelete);
  });

  it("ReadmeSampleGetResourceDetails", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const {
      // Information about the custom models in the current resource
      customDocumentModels: {
        // The number of custom models in the current resource
        count,
        // The maximum number of models that the current resource can support
        limit,
      },
    } = await client.getResourceDetails();
  });

  it("ReadmeSampleBuildClassifier", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const newClassifiedId = "aNewClassifier";
    const containerUrl1 = "<training data container SAS URL 1>";
    const containerUrl2 = "<training data container SAS URL 2>";
    // @ts-preserve-whitespace
    const poller = await client.beginBuildDocumentClassifier(
      newClassifiedId,
      {
        // The document types. Each entry in this object should map a document type name to a
        // `ClassifierDocumentTypeDetails` object
        formX: {
          azureBlobSource: {
            containerUrl: containerUrl1,
          },
        },
        formY: {
          azureBlobFileListSource: {
            containerUrl: containerUrl2,
            fileList: "path/to/fileList.jsonl",
          },
        },
      },
      {
        // Optionally, a text description may be attached to the classifier
        description: "This is an example classifier!",
      },
    );
    // @ts-preserve-whitespace
    // Classifier building, like model creation operations, returns a poller that eventually produces a
    // DocumentClassifierDetails object
    const classifierDetails = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    const {
      classifierId, // identical to the classifierId given when creating the classifier
      description, // identical to the description given when creating the classifier (if any)
      createdOn, // the Date (timestamp) that the classifier was created
      docTypes, // information about the document types in the classifier and their details
    } = classifierDetails;
  });

  it("ReadmeSampleGetModel", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    // The ID of the prebuilt business card model
    const prebuiltModelId = "prebuilt-businessCard";
    // @ts-preserve-whitespace
    const {
      modelId, // identical to the modelId given when calling `getDocumentModel`
      description, // a textual description of the model, if provided during model creation
      createdOn, // the Date (timestamp) that the model was created
      // information about the document types in the model and their field schemas
      docTypes: {
        // the document type of the prebuilt business card model
        "prebuilt:businesscard": {
          // an optional, textual description of this document type
          description: businessCardDescription,
          // the schema of the fields in this document type, see the FieldSchema type
          fieldSchema,
          // the service's confidences in the fields (an object with field names as properties and numeric confidence
          // values)
          fieldConfidence,
        },
      },
    } = await client.getDocumentModel(prebuiltModelId);
  });

  it("ReadmeSampleListModels", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    // Iterate over all models in the current resource
    for await (const summary of client.listDocumentModels()) {
      const {
        modelId, // The model's unique ID
        description, // a textual description of the model, if provided during model creation
      } = summary;
      // @ts-preserve-whitespace
      // You can get the full model info using `getDocumentModel`
      const model = await client.getDocumentModel(modelId);
    }
    // @ts-preserve-whitespace
    // The listDocumentModels method is paged, and you can iterate by page using the `byPage` method.
    const pages = client.listDocumentModels().byPage();
    // @ts-preserve-whitespace
    for await (const page of pages) {
      // Each page is an array of models and can be iterated synchronously
      for (const summary of page) {
        const {
          modelId, // The model's unique ID
          description, // a textual description of the model, if provided during model creation
        } = summary;
        // @ts-preserve-whitespace
        // You can get the full model info using `getDocumentModel`
        const model = await client.getDocumentModel(modelId);
      }
    }
  });

  it("ReadmeSampleDeleteModel", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    await client.deleteDocumentModel("<model ID to delete>");
  });

  it("ReadmeSampleGetClassifier", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    const foundClassifier = "<classifier ID>";
    // @ts-preserve-whitespace
    const {
      classifierId, // identical to the ID given when calling `getDocumentClassifier`
      description, // a textual description of the classifier, if provided during classifier creation
      createdOn, // the Date (timestamp) that the classifier was created
      // information about the document types in the classifier and their corresponding traning data
      docTypes,
    } = await client.getDocumentClassifier(foundClassifier);
    // @ts-preserve-whitespace
    // The `docTypes` property is a map of document type names to information about the training data
    // for that document type.
    for (const [docTypeName, classifierDocTypeDetails] of Object.entries(docTypes)) {
      console.log(`- '${docTypeName}': `, classifierDocTypeDetails);
    }
  });

  it("ReadmeSampleListClassifiers", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    for await (const details of client.listDocumentClassifiers()) {
      const {
        classifierId, // The classifier's unique ID
        description, // a textual description of the classifier, if provided during creation
        docTypes, // information about the document types in the classifier and their corresponding traning data
      } = details;
    }
    // @ts-preserve-whitespace
    // The listDocumentClassifiers method is paged, and you can iterate by page using the `byPage` method.
    const pages = client.listDocumentClassifiers().byPage();
    // @ts-preserve-whitespace
    for await (const page of pages) {
      // Each page is an array of classifiers and can be iterated synchronously
      for (const details of page) {
        const {
          classifierId, // The classifier's unique ID
          description, // a textual description of the classifier, if provided during creation
          docTypes, // information about the document types in the classifier and their corresponding traning data
        } = details;
      }
    }
  });

  it("ReadmeSampleDeleteClassifier", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    await client.deleteDocumentClassifier("<classifier ID to delete>");
  });

  it("ReadmeSampleGetOperation", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    // The ID of the operation, which should be a GUID
    const findOperationId = "<operation GUID>";
    // @ts-preserve-whitespace
    const {
      operationId, // identical to the operationId given when calling `getOperation`
      kind, // the operation kind, one of "documentModelBuild", "documentModelCompose", or "documentModelCopyTo"
      status, // the status of the operation, one of "notStarted", "running", "failed", "succeeded", or "canceled"
      percentCompleted, // a number between 0 and 100 representing the progress of the operation
      createdOn, // a Date object that reflects the time when the operation was started
      lastUpdatedOn, // a Date object that reflects the time when the operation state was last modified
    } = await client.getOperation(findOperationId);
  });

  it("ReadmeSampleListOperations", async () => {
    const credential = new DefaultAzureCredential();
    const client = new DocumentModelAdministrationClient(
      "https://<resource name>.cognitiveservices.azure.com",
      credential,
    );
    // @ts-preserve-whitespace
    for await (const operation of client.listOperations()) {
      const {
        operationId, // the operation's GUID
        status, // the operation status, one of "notStarted", "running", "succeeded", "failed", or "canceled"
        percentCompleted, // the progress of the operation, from 0 to 100
      } = operation;
    }
    // @ts-preserve-whitespace
    // The listOperations method is paged, and you can iterate by page using the `byPage` method.
    const pages = client.listOperations().byPage();
    // @ts-preserve-whitespace
    for await (const page of pages) {
      // Each page is an array of operation info objects and can be iterated synchronously
      for (const operation of page) {
        const {
          operationId, // the operation's GUID
          status, // the operation status, one of "notStarted", "running", "succeeded", "failed", or "canceled"
          percentCompleted, // the progress of the operation, from 0 to 100
        } = operation;
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
