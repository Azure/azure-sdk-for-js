// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import DocumentIntelligence, {
  AnalyzeOperationOutput,
  DocumentClassifierBuildOperationDetailsOutput,
  KnownDocumentIntelligenceAudience,
  getLongRunningPoller,
  isUnexpected,
  paginate,
  parseResultIdFromResponse,
  streamToUint8Array,
} from "@azure-rest/ai-document-intelligence";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const client = DocumentIntelligence(
      process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"],
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleCreateClient_APIKey", async () => {
    const client = DocumentIntelligence(process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"], {
      key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"],
    });
  });

  it("ReadmeSampleAnalyzePrebuiltLayoutUrlSource", async () => {
    const client = DocumentIntelligence(
      process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"],
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const initialResponse = await client
      .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
      .post({
        contentType: "application/json",
        body: {
          urlSource:
            "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/6704eff082aaaf2d97c1371a28461f512f8d748a/sdk/formrecognizer/ai-form-recognizer/assets/forms/Invoice_1.pdf",
        },
        queryParameters: { locale: "en-IN" },
      });
  });

  it("ReadmeSampleAnalyzePrebuiltLayoutBase64Source", async () => {
    const client = DocumentIntelligence(
      process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"],
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const filePath = join("./assets", "forms", "Invoice_1.pdf");
    const base64Source = await readFile(filePath, { encoding: "base64" });
    const initialResponse = await client
      .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
      .post({
        contentType: "application/json",
        body: {
          base64Source,
        },
        queryParameters: { locale: "en-IN" },
      });
    // @ts-preserve-whitespace
    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    // @ts-preserve-whitespace
    const poller = getLongRunningPoller(client, initialResponse);
    const result = (await poller.pollUntilDone()).body as AnalyzeOperationOutput;
    console.log(result);
    // {
    //   status: 'succeeded',
    //   createdDateTime: '2023-11-10T13:31:31Z',
    //   lastUpdatedDateTime: '2023-11-10T13:31:34Z',
    //   analyzeResult: {
    //     apiVersion: '2023-10-31-preview',
    //     .
    //     .
    //     .
    //     contentFormat: 'text'
    //   }
    // }
  });

  it("ReadmeSampleAnalyzeBatch", async () => {
    const client = DocumentIntelligence(
      process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"],
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    // 1. Analyze a batch of documents
    const initialResponse = await client
      .path("/documentModels/{modelId}:analyzeBatch", "prebuilt-layout")
      .post({
        contentType: "application/json",
        body: {
          azureBlobSource: {
            containerUrl:
              process.env["DOCUMENT_INTELLIGENCE_BATCH_TRAINING_DATA_CONTAINER_SAS_URL"],
          },
          resultContainerUrl:
            process.env["DOCUMENT_INTELLIGENCE_BATCH_TRAINING_DATA_RESULT_CONTAINER_SAS_URL"],
          resultPrefix: "result",
        },
      });
    // @ts-preserve-whitespace
    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    // @ts-preserve-whitespace
    const resultId = parseResultIdFromResponse(initialResponse);
    console.log("resultId: ", resultId);
    // @ts-preserve-whitespace
    // (Optional) You can poll for the batch analysis result but be aware that a job may take unexpectedly long time, and polling could incur additional costs.
    // const poller = getLongRunningPoller(client, initialResponse);
    // await poller.pollUntilDone();
    // @ts-preserve-whitespace
    // 2. At a later time, you can retrieve the operation result using the resultId
    const output = await client
      .path("/documentModels/{modelId}/analyzeResults/{resultId}", "prebuilt-layout", resultId)
      .get();
    console.log(output);
  });

  it("ReadmeSampleAnalyzeMarkdownContentFormat", async () => {
    const client = DocumentIntelligence(
      process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"],
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const initialResponse = await client
      .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
      .post({
        contentType: "application/json",
        body: {
          urlSource:
            "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/6704eff082aaaf2d97c1371a28461f512f8d748a/sdk/formrecognizer/ai-form-recognizer/assets/forms/Invoice_1.pdf",
        },
        queryParameters: { outputContentFormat: "markdown" }, // <-- new query parameter
      });
  });

  it("ReadmeSampleAnalyzeQueryFields", async () => {
    const client = DocumentIntelligence(
      process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"],
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    await client.path("/documentModels/{modelId}:analyze", "prebuilt-layout").post({
      contentType: "application/json",
      body: { urlSource: "..." },
      queryParameters: {
        features: ["queryFields"],
        queryFields: ["NumberOfGuests", "StoreNumber"],
      }, // <-- new query parameter
    });
  });

  it("ReadmeSampleDocumentClassifierBuild", async () => {
    const client = DocumentIntelligence(
      process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"],
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerSasUrl = (): string =>
      process.env["DOCUMENT_INTELLIGENCE_TRAINING_CONTAINER_SAS_URL"];
    const initialResponse = await client.path("/documentClassifiers:build").post({
      body: {
        classifierId: `customClassifier-12345`,
        description: "Custom classifier description",
        docTypes: {
          foo: {
            azureBlobSource: {
              containerUrl: containerSasUrl(),
            },
          },
          bar: {
            azureBlobSource: {
              containerUrl: containerSasUrl(),
            },
          },
        },
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    // @ts-preserve-whitespace
    const poller = getLongRunningPoller(client, initialResponse);
    const response = (await poller.pollUntilDone())
      .body as DocumentClassifierBuildOperationDetailsOutput;
    console.log(response);
    //  {
    //    operationId: '31466834048_f3ee629e-73fb-48ab-993b-1d55d73ca460',
    //    kind: 'documentClassifierBuild',
    //    status: 'succeeded',
    //    .
    //    .
    //    result: {
    //      classifierId: 'customClassifier10978',
    //      createdDateTime: '2023-11-09T12:45:56Z',
    //      .
    //      .
    //      description: 'Custom classifier description'
    //    },
    //    apiVersion: '2023-10-31-preview'
    //  }
  });

  it("ReadmeSampleGetPdfOutput", async () => {
    const client = DocumentIntelligence(
      process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"],
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const filePath = join("./assets", "layout-pageobject.pdf");
    // @ts-preserve-whitespace
    const base64Source = await readFile(filePath, { encoding: "base64" });
    // @ts-preserve-whitespace
    const initialResponse = await client
      .path("/documentModels/{modelId}:analyze", "prebuilt-read")
      .post({
        contentType: "application/json",
        body: {
          base64Source,
        },
        queryParameters: { output: ["pdf"] },
      });
    // @ts-preserve-whitespace
    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    // @ts-preserve-whitespace
    const poller = getLongRunningPoller(client, initialResponse);
    // @ts-preserve-whitespace
    await poller.pollUntilDone();
    // @ts-preserve-whitespace
    const output = await client
      .path(
        "/documentModels/{modelId}/analyzeResults/{resultId}/pdf",
        "prebuilt-read",
        parseResultIdFromResponse(initialResponse),
      )
      .get()
      .asNodeStream(); // output.body would be NodeJS.ReadableStream
    // @ts-preserve-whitespace
    if (output.status !== "200" || !output.body) {
      throw new Error("The response was unexpected, expected NodeJS.ReadableStream in the body.");
    }
    // @ts-preserve-whitespace
    const pdfData = await streamToUint8Array(output.body);
    await writeFile(`./output.pdf`, pdfData);
    // Or you can consume the NodeJS.ReadableStream directly
  });

  it("ReadmeSampleGetFigureImage", async () => {
    const client = DocumentIntelligence(
      process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"],
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const filePath = join("./assets", "layout-pageobject.pdf");
    // @ts-preserve-whitespace
    const base64Source = await readFile(filePath, { encoding: "base64" });
    // @ts-preserve-whitespace
    const initialResponse = await client
      .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
      .post({
        contentType: "application/json",
        body: {
          base64Source,
        },
        queryParameters: { output: ["figures"] },
      });
    // @ts-preserve-whitespace
    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    // @ts-preserve-whitespace
    const poller = getLongRunningPoller(client, initialResponse);
    // @ts-preserve-whitespace
    const result = (await poller.pollUntilDone()).body as AnalyzeOperationOutput;
    const figures = result.analyzeResult?.figures;
    const figureId = figures?.[0].id || "";
    // @ts-preserve-whitespace
    const output = await client
      .path(
        "/documentModels/{modelId}/analyzeResults/{resultId}/figures/{figureId}",
        "prebuilt-layout",
        parseResultIdFromResponse(initialResponse),
        figureId,
      )
      .get()
      .asNodeStream(); // output.body would be NodeJS.ReadableStream
    // @ts-preserve-whitespace
    if (output.status !== "200" || !output.body) {
      throw new Error("The response was unexpected, expected NodeJS.ReadableStream in the body.");
    }
    // @ts-preserve-whitespace
    const imageData = await streamToUint8Array(output.body);
    await writeFile(`./figures/${figureId}.png`, imageData);
    // Or you can consume the NodeJS.ReadableStream directly
  });

  it("ReadmeSampleGetInfo", async () => {
    const client = DocumentIntelligence(
      process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"],
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const response = await client.path("/info").get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    console.log(response.body.customDocumentModels.limit);
    // 20000
  });

  it("ReadmeSampleListDocumentModels", async () => {
    const client = DocumentIntelligence(
      process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"],
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const response = await client.path("/documentModels").get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    for await (const model of paginate(client, response)) {
      console.log(model.modelId);
    }
  });

  it("ReadmeSampleCreateClient_SovereignClouds", () => {
    const client = DocumentIntelligence(
      process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"],
      new DefaultAzureCredential(),
      {
        credentials: {
          // Use the correct audience for your cloud environment
          scopes: [KnownDocumentIntelligenceAudience.AzureGovernment],
        },
      },
    );
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
