// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder, testPollingOptions } from "../utils/recorderUtils.js";
import DocumentIntelligence, { KnownDocumentIntelligenceAudience } from "../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import {
  ASSET_PATH,
  batchTrainingFilesContainerUrl,
  batchTrainingFilesResultContainerUrl,
  getRandomNumber,
  makeTestUrl,
  isValidPNG,
  isValidPDF,
} from "../utils/utils.js";
import path from "node:path";
import fs from "node:fs";
import type {
  AnalyzeOperationOutput,
  DocumentBarcodeOutput,
  DocumentModelDetailsOutput,
  DocumentTableOutput,
  DocumentIntelligenceClient,
} from "../../../src/index.js";
import {
  getLongRunningPoller,
  isUnexpected,
  parseResultIdFromResponse,
  streamToUint8Array,
} from "../../../src/index.js";
import { getEndpoint, getSelectionMarkStorageContainerSasUrl } from "../../utils/injectables.js";
import { createTestCredential } from "@azure-tools/test-credential";

describe("DocumentIntelligenceClient", () => {
  let recorder: Recorder;
  let client: DocumentIntelligenceClient;
  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    await recorder.setMatcher("BodilessMatcher");
    client = DocumentIntelligence(
      getEndpoint(),
      createTestCredential(),
      recorder.configureClientOptions({
        credentials: { scopes: [KnownDocumentIntelligenceAudience.AzurePublicCloud] },
      }),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  describe("content analysis", () => {
    it("pdf file stream", async () => {
      const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
          queryParameters: { locale: "en-IN" },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;
      assert.isNotEmpty(pages);
      assert.isNotEmpty(tables);

      const [table] = tables!;
      assert.isDefined(table.boundingRegions?.[0]);
      assert.equal(table.boundingRegions?.[0].pageNumber, 1);
    });

    it("png file stream", async () => {
      const filePath = path.join(ASSET_PATH, "receipt", "contoso-receipt.png");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
          queryParameters: { locale: "en-IN" },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);

      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const pages = analyzeResult?.pages;
      const paragraphs = analyzeResult?.paragraphs;

      assert.isNotEmpty(paragraphs);

      assert.isNotEmpty(pages);
    });

    it("jpeg file stream", async () => {
      const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
          queryParameters: { locale: "en-IN" },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;
      assert.isNotEmpty(pages);
      assert.isNotEmpty(tables);
      const [table] = tables as DocumentTableOutput[];
      assert.isDefined(table.boundingRegions?.[0].polygon);
      assert.equal(table.boundingRegions?.[0].pageNumber, 1);
    });

    it("tiff file stream", async () => {
      const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.tiff");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;
      assert.isNotEmpty(pages);
      assert.isNotEmpty(tables);
      const [table] = tables as DocumentTableOutput[];
      assert.isDefined(table.boundingRegions?.[0].polygon);
      assert.equal(table.boundingRegions?.[0].pageNumber, 1);
    });

    it("pdf file stream without passing content type", async () => {
      const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
          queryParameters: { locale: "en-IN" },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;
      assert.isNotEmpty(pages);
      assert.isNotEmpty(tables);
      const [table] = tables as DocumentTableOutput[];
      assert.isDefined(table.boundingRegions?.[0].polygon);
      assert.equal(table.boundingRegions?.[0].pageNumber, 1);
    });

    it("url", async () => {
      const url = makeTestUrl("/Invoice_1.pdf");

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
          contentType: "application/json",
          body: {
            urlSource: url,
          },
          queryParameters: { locale: "en-IN" },
        });
      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }
      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;

      assert.isNotEmpty(pages);

      assert.isNotEmpty(tables);
      const [table] = tables as DocumentTableOutput[];
      assert.isDefined(table.boundingRegions?.[0].polygon);
      assert.equal(table.boundingRegions?.[0].pageNumber, 1);
    });

    it("with selection marks", async () => {
      const filePath = path.join(ASSET_PATH, "forms", "selection_mark_form.pdf");
      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
          queryParameters: { locale: "en-IN" },
        });
      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;
      const pages = analyzeResult?.pages;
      assert.equal(pages?.[0].pageNumber, 1);
      assert.isNotEmpty(pages?.[0].selectionMarks);
    });

    it("invalid locale throws", async () => {
      const url = makeTestUrl("/Invoice_1.pdf");

      try {
        const initialResponse = await client
          .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
          .post({
            contentType: "application/json",
            body: {
              urlSource: url,
            },
            queryParameters: { locale: "thisIsNotAValidLanguage" },
          });
        if (isUnexpected(initialResponse)) {
          throw initialResponse.body.error;
        }

        await getLongRunningPoller(client, initialResponse, testPollingOptions);
        assert.fail("Expected an exception due to invalid locale.");
      } catch (ex: any) {
        assert.include((ex as Error).message, "Invalid argument.");
      }
    });

    it("specifying pages", async () => {
      const url = makeTestUrl("/Invoice_1.pdf");
      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
          contentType: "application/json",
          body: {
            urlSource: url,
          },
          queryParameters: { locale: "en-IN", pages: "1" },
        });
      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }
      await getLongRunningPoller(client, initialResponse, testPollingOptions);
    });

    it("invalid pages throws", async () => {
      const url = makeTestUrl("/Invoice_1.pdf");

      try {
        const initialResponse = await client
          .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
          .post({
            contentType: "application/json",
            body: {
              urlSource: url,
            },
            queryParameters: { locale: "en-IN", pages: "2" },
          });
        if (isUnexpected(initialResponse)) {
          throw initialResponse.body.error;
        }
        await getLongRunningPoller(client, initialResponse, testPollingOptions);
        assert.fail("Expected an exception due to invalid pages.");
      } catch (ex: any) {
        // Just make sure we didn't get a bad error message
        assert.isFalse((ex as Error).message.includes("<empty>"));
      }
    });

    it("barcode", async () => {
      const url = makeTestUrl("/barcode2.tif");

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-read")
        .post({
          contentType: "application/json",
          body: {
            urlSource: url,
          },
          queryParameters: { features: ["barcodes"] },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }
      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const pages = analyzeResult?.pages;

      assert.isNotEmpty(pages);

      assert.isNotEmpty(pages?.[0].barcodes);

      const [barcode1, barcode2] = pages?.[0].barcodes as DocumentBarcodeOutput[];

      assert.equal(barcode1.kind, "Code39");
      assert.equal(barcode1.value, "D589992-X");

      assert.equal(barcode2.kind, "Code39");
      assert.equal(barcode2.value, "SYN121720213429");
    });

    it("annotations", async () => {
      const url = makeTestUrl("/annotations.jpg");

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
          contentType: "application/json",
          body: {
            urlSource: url,
          },
          queryParameters: { locale: "en-IN" },
        });
      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }
      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const pages = analyzeResult?.pages;

      assert.isNotEmpty(pages);
    });

    it("formula", async () => {
      const url = makeTestUrl("/formula1.jpg");

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-read")
        .post({
          contentType: "application/json",
          body: {
            urlSource: url,
          },
          queryParameters: { features: ["formulas"] },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }
      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const pages = analyzeResult?.pages;

      assert.isNotEmpty(pages);

      assert.isNotEmpty(pages?.[0].formulas);
    });
  });

  describe("custom forms", () => {
    let _model: DocumentModelDetailsOutput;
    let modelName: string;

    // We only want to create the model once, but because of the recorder's
    // precedence, we have to create it in a test, so one test will end up
    // recording the entire creation and the other tests will still be able
    // to use it.
    async function requireModel(): Promise<DocumentModelDetailsOutput> {
      if (!_model) {
        modelName = recorder.variable(
          "customFormModelName",
          `customFormModelName${getRandomNumber()}`,
        );

        const initialResponse = await client.path("/documentModels:build").post({
          body: {
            buildMode: "template",
            modelId: modelName,
            azureBlobSource: {
              containerUrl: getSelectionMarkStorageContainerSasUrl(),
            },
          },
        });

        if (isUnexpected(initialResponse)) {
          throw initialResponse.body.error;
        }
        const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
        if (isUnexpected(response)) {
          throw response.body.error;
        }
        _model = response.body as DocumentModelDetailsOutput;
        assert.isDefined(_model.modelId);
      }

      return _model;
    }
    it("with selection marks", async () => {
      const { modelId } = await requireModel();

      const filePath = path.join(ASSET_PATH, "forms", "selection_mark_form.pdf");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client.path("/documentModels/{modelId}:analyze", modelId).post({
        contentType: "application/json",
        body: {
          base64Source,
        },
      });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      if (isUnexpected(response)) {
        throw response.body.error;
      }
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const documents = analyzeResult?.documents;
      const pages = analyzeResult?.pages;
      assert.isDefined(documents);
      assert.equal(documents?.[0].docType, `${modelName}:${modelName}`);
      assert.isDefined(pages?.[0]);

      /* There should be a table in the response, but it isn't recognized (maybe because it's too small or sparse)
      assert.isNotEmpty(tables);
      const [table] = tables!;
      assert.isDefined(table.boundingRegions?.[0].boundingBox);
      assert.equal(table.boundingRegions?.[0].pageNumber, 1);*/

      assert.equal(pages?.[0].pageNumber, 1);
      assert.isNotEmpty(pages?.[0].selectionMarks);
    });

    it("png file stream", async () => {
      const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-invoice")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;
      const documents = analyzeResult?.documents;
      assert.isNotEmpty(documents);

      assert.equal(documents?.[0].docType, "invoice");
    });
  });

  describe("receipts", () => {
    it("png file stream", async () => {
      const filePath = path.join(ASSET_PATH, "receipt", "contoso-receipt.png");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-receipt")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;
      const documents = analyzeResult?.documents;
      assert.isNotEmpty(documents);

      assert.equal(documents?.[0].docType, "receipt.retailMeal");
    });

    it("jpeg file stream", async () => {
      const filePath = path.join(ASSET_PATH, "receipt", "contoso-allinone.jpg");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-receipt")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;
      const documents = analyzeResult?.documents;
      assert.isNotEmpty(documents);

      assert.equal(documents?.[0].docType, "receipt.retailMeal");
    });

    it("url", async () => {
      const url = makeTestUrl("/contoso-allinone.jpg");

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-receipt")
        .post({
          contentType: "application/json",
          body: {
            urlSource: url,
          },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;
      const documents = analyzeResult?.documents;
      assert.isNotEmpty(documents);

      assert.equal(documents?.[0].docType, "receipt.retailMeal");
    });

    it("specifying locale", async () => {
      const url = makeTestUrl("/contoso-allinone.jpg");

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-receipt")
        .post({
          contentType: "application/json",
          body: {
            urlSource: url,
          },
          queryParameters: { locale: "en-IN" },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      await getLongRunningPoller(client, initialResponse, testPollingOptions);
    });

    it("invalid locale throws", async () => {
      const url = makeTestUrl("/contoso-allinone.jpg");

      try {
        const initialResponse = await client
          .path("/documentModels/{modelId}:analyze", "prebuilt-receipt")
          .post({
            contentType: "application/json",
            body: {
              urlSource: url,
            },
            queryParameters: { locale: "thisIsNotAValidLanguage" },
          });

        if (isUnexpected(initialResponse)) {
          throw initialResponse.body.error;
        }

        assert.fail("Expected an exception due to invalid locale.");
      } catch (ex: any) {
        assert.include((ex as Error).message, "Invalid argument.");
      }
    });
  });

  describe("invoices", () => {
    it("pdf file stream", async () => {
      const filePath = path.join(ASSET_PATH, "invoice", "Invoice_1.pdf");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-invoice")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;
      const documents = analyzeResult?.documents;
      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;

      assert.isNotEmpty(documents);
      assert.isNotEmpty(pages);
      assert.isNotEmpty(tables);
      const [table] = tables!;
      assert.isDefined(table.boundingRegions?.[0].polygon);
      assert.equal(table.boundingRegions?.[0].pageNumber, 1);
    });

    it("url", async () => {
      const url = makeTestUrl("/Invoice_1.pdf");

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-invoice")
        .post({
          contentType: "application/json",
          body: {
            urlSource: url,
          },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;
      const documents = analyzeResult?.documents;
      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;

      assert.isNotEmpty(documents);
      assert.isNotEmpty(pages);
      assert.isNotEmpty(tables);
      const [table] = tables!;
      assert.isDefined(table.boundingRegions?.[0].polygon);
      assert.equal(table.boundingRegions?.[0].pageNumber, 1);
    });

    it("invalid locale throws", async () => {
      const url = makeTestUrl("/Invoice_1.pdf");

      try {
        const initialResponse = await client
          .path("/documentModels/{modelId}:analyze", "prebuilt-invoice")
          .post({
            contentType: "application/json",
            body: {
              urlSource: url,
            },
            queryParameters: { locale: "thisIsNotAValidLanguage" },
          });

        if (isUnexpected(initialResponse)) {
          throw initialResponse.body.error;
        }

        assert.fail("Expected an exception due to invalid locale.");
      } catch (ex: any) {
        assert.include((ex as Error).message, "Invalid argument.");
      }
    });
  });

  describe("identityDocuments", () => {
    it("png file stream", async () => {
      const filePath = path.join(ASSET_PATH, "identityDocument", "license.png");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-idDocument")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const documents = analyzeResult?.documents;
      const receipt = documents?.[0];

      assert.isNotEmpty(documents);

      assert.equal(receipt?.docType, "idDocument.driverLicense");
    });

    it("url", async () => {
      const url = makeTestUrl("/license.jpg");

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-idDocument")
        .post({
          contentType: "application/json",
          body: {
            urlSource: url,
          },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const documents = analyzeResult?.documents;
      const idDocument = documents?.[0];

      assert.isNotEmpty(documents);
      assert.equal(idDocument?.docType, "idDocument.driverLicense");
    });

    it("invalid locale throws", async () => {
      const url = makeTestUrl("/license.png");

      try {
        await client.path("/documentModels/{modelId}:analyze", "prebuilt-idDocument").post({
          contentType: "application/json",
          body: {
            urlSource: url,
          },
          queryParameters: {
            locale: "thisIsNotAValidLocaleString",
          },
        });
        assert.fail("Expected an exception due to invalid locale.");
      } catch (ex: any) {
        // Just make sure we didn't get a bad error message
        assert.isFalse((ex as Error).message.includes("<empty>"));
      }
    });
  });

  describe("tax - US - w2", () => {
    it("png file stream", async () => {
      const filePath = path.join(ASSET_PATH, "w2", "w2-single.png");
      //

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-tax.us.w2")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const documents = analyzeResult?.documents;
      const w2Naive = documents?.[0];

      assert.isNotEmpty(documents);

      assert.equal(w2Naive?.docType, "tax.us.w2");
    });
  });

  describe("healthInsuranceCard - US", function () {
    it("png file stream", async () => {
      const filePath = path.join(ASSET_PATH, "healthInsuranceCard", "insurance.png");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-healthInsuranceCard.us")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

      const documents = analyzeResult?.documents;

      assert.isNotEmpty(documents);
    });
  });

  describe("batch analysis", function () {
    it("batch analysis", async () => {
      const initialResponse = await client
        .path("/documentModels/{modelId}:analyzeBatch", "prebuilt-layout")
        .post({
          contentType: "application/json",
          body: {
            azureBlobSource: {
              containerUrl: batchTrainingFilesContainerUrl(),
            },
            resultContainerUrl: batchTrainingFilesResultContainerUrl(),
            resultPrefix: "result",
          },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }
      const batchResultId = parseResultIdFromResponse(initialResponse);

      await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const response = await client
        .path(
          "/documentModels/{modelId}/analyzeBatchResults/{resultId}",
          "prebuilt-layout",
          batchResultId,
        )
        .get();
      if (isUnexpected(response)) {
        throw response.body.error;
      }
      assert.isDefined(response.body);
      assert.equal(response.body.resultId, batchResultId);
      assert.equal(response.body.status, "succeeded");
      assert.equal(response.body.percentCompleted, 100);
    });
  });

  describe("get AnalyzeResult methods", function () {
    it("getAnalyzeResult", async () => {
      const filePath = path.join(ASSET_PATH, "layout-pageobject.pdf");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-read")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const resultId = parseResultIdFromResponse(initialResponse);

      await client
        .path("/documentModels/{modelId}/analyzeResults/{resultId}", "prebuilt-read", resultId)
        .get();
    });

    it("getAnalyzeResult pdf", async () => {
      const filePath = path.join(ASSET_PATH, "layout-pageobject.pdf");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-read")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
          queryParameters: { output: ["pdf"] },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      await getLongRunningPoller(client, initialResponse, testPollingOptions);

      const resultId = parseResultIdFromResponse(initialResponse);
      const output = await client
        .path("/documentModels/{modelId}/analyzeResults/{resultId}/pdf", "prebuilt-read", resultId)
        .get()
        .asNodeStream();

      if (output.status !== "200" || !output.body) {
        throw new Error("The response was unexpected.");
      }
      // To get the PDF as a file, you can use the following code:
      // fs.promises.writeFile("output.pdf", await streamToUint8Array(output.body));
      assert.isTrue(isValidPDF(await streamToUint8Array(output.body)));
    });

    it("getAnalyzeResult figures", async () => {
      const filePath = path.join(ASSET_PATH, "layout-pageobject.pdf");

      const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
          contentType: "application/json",
          body: {
            base64Source,
          },
          queryParameters: { output: ["figures"] },
        });

      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }

      const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      const result = response.body as AnalyzeOperationOutput;
      const figures = result.analyzeResult?.figures;
      assert.isArray(figures);
      assert.isNotEmpty(figures?.[0]);
      const figureId = figures?.[0].id;
      if (!figureId) {
        throw new Error("Expected a figure ID.");
      }

      const resultId = parseResultIdFromResponse(initialResponse);
      const output = await client
        .path(
          "/documentModels/{modelId}/analyzeResults/{resultId}/figures/{figureId}",
          "prebuilt-layout",
          resultId,
          figureId,
        )
        .get()
        .asNodeStream();

      if (output.status !== "200" || !output.body) {
        throw new Error("The response was unexpected.");
      }
      assert.isTrue(isValidPNG(await streamToUint8Array(output.body)));
    });
  });
});
