// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder, testPollingOptions } from "./utils/recorderUtils.js";
import DocumentIntelligence from "../../src/documentIntelligence.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { ASSET_PATH, getRandomNumber, makeTestUrl } from "./utils/utils.js";
import path from "path";
import fs from "fs";
import { DocumentIntelligenceClient } from "../../src/clientDefinitions.js";
import { AnalyzeResultOperationOutput, DocumentBarcodeOutput, DocumentModelBuildOperationDetailsOutput, DocumentModelDetailsOutput, DocumentTableOutput, getLongRunningPoller, isUnexpected } from "../../src/index.js";

describe("DocumentIntelligenceClient", () => {
  let recorder: Recorder;
  let client: DocumentIntelligenceClient;
  beforeEach(async function (context) {
    recorder = await createRecorder(context);
    await recorder.setMatcher("BodilessMatcher");
    client = DocumentIntelligence(
      assertEnvironmentVariable("DOCUMENT_INTELLIGENCE_ENDPOINT"),
      { key: assertEnvironmentVariable("DOCUMENT_INTELLIGENCE_API_KEY") },
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async function () {
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;
      assert.ok(pages && pages.length > 0, `Expected non-empty pages but got ${pages}`);
      assert.isNotEmpty(pages);
      assert.isNotEmpty(tables);

      const [table] = tables!;
      assert.ok(table.boundingRegions?.[0]);
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

      const pages = analyzeResult?.pages;
      const paragraphs = analyzeResult?.paragraphs;

      assert.ok(
        paragraphs && paragraphs.length > 0,
        `Expected non-empty paragraphs but got ${paragraphs}.`,
      );

      assert.ok(pages && pages.length > 0, `Expect no-empty pages but got ${pages}`);
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;
      assert.isNotEmpty(pages);
      assert.isNotEmpty(tables);
      const [table] = tables as DocumentTableOutput[];
      assert.ok(table.boundingRegions?.[0].polygon);
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;
      assert.isNotEmpty(pages);
      assert.isNotEmpty(tables);
      const [table] = tables as DocumentTableOutput[];
      assert.ok(table.boundingRegions?.[0].polygon);
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;
      assert.isNotEmpty(pages);
      assert.isNotEmpty(tables);
      const [table] = tables as DocumentTableOutput[];
      assert.ok(table.boundingRegions?.[0].polygon);
      assert.equal(table.boundingRegions?.[0].pageNumber, 1);
    });

    it.only("url", async () => {
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
      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;

      assert.isNotEmpty(pages);

      assert.isNotEmpty(tables);
      const [table] = tables as DocumentTableOutput[];
      assert.ok(table.boundingRegions?.[0].polygon);
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

      const poller = getLongRunningPoller(client, initialResponse);
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;
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

        const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput;
        assert.fail("Expected an exception due to invalid locale.");
      } catch (ex: any) {
        assert.ok((ex as Error).message.includes("Invalid argument."));
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
      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      await (await poller).pollUntilDone();
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
        const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
        await (await poller).pollUntilDone();
        assert.fail("Expected an exception due to invalid pages.");
      } catch (ex: any) {
        // Just make sure we didn't get a bad error message
        assert.isFalse((ex as Error).message.includes("<empty>"));
      }
    });

    it("barcode", async function () {
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
      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

      const pages = analyzeResult?.pages;

      assert.isNotEmpty(pages);

      assert.isNotEmpty(pages?.[0].barcodes);

      const [barcode1, barcode2] = pages?.[0].barcodes as DocumentBarcodeOutput[];

      assert.equal(barcode1.kind, "Code39");
      assert.equal(barcode1.value, "D589992-X");

      assert.equal(barcode2.kind, "Code39");
      assert.equal(barcode2.value, "SYN121720213429");
    });

    it("annotations", async function () {
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
      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

      const pages = analyzeResult?.pages;

      assert.isNotEmpty(pages);
    });

    it("formula", async function () {
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
      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

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
              containerUrl: assertEnvironmentVariable(
                "DOCUMENT_INTELLIGENCE_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL",
              ),
            },
          },
        });

        if (isUnexpected(initialResponse)) {
          throw initialResponse.body.error;
        }
        const poller = getLongRunningPoller(client, initialResponse);
        const response = (
          (await (await poller).pollUntilDone()).body as DocumentModelBuildOperationDetailsOutput
        ).result;
        if (!response) {
          throw new Error("Expected a DocumentModelDetailsOutput response.");
        }
        _model = response;
        assert.ok(_model.modelId);
      }

      return _model;
    }

    it.skip("with selection marks", async () => {
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

      const documents = analyzeResult?.documents;
      const pages = analyzeResult?.pages;
      assert.ok(documents);
      assert.equal(documents?.[0].docType, `${modelName}:${modelName}`);
      assert.ok(pages?.[0]);

      /* There should be a table in the response, but it isn't recognized (maybe because it's too small or sparse)
      assert.isNotEmpty(tables);
      const [table] = tables!;
      assert.ok(table.boundingRegions?.[0].boundingBox);
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput;
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

        const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput;
        assert.fail("Expected an exception due to invalid locale.");
      } catch (ex: any) {
        assert.ok((ex as Error).message.includes("Invalid argument."));
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;
      const documents = analyzeResult?.documents;
      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;

      assert.isNotEmpty(documents);
      assert.isNotEmpty(pages);
      assert.isNotEmpty(tables);
      const [table] = tables!;
      assert.ok(table.boundingRegions?.[0].polygon);
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;
      const documents = analyzeResult?.documents;
      const pages = analyzeResult?.pages;
      const tables = analyzeResult?.tables;

      assert.isNotEmpty(documents);
      assert.isNotEmpty(pages);
      assert.isNotEmpty(tables);
      const [table] = tables!;
      assert.ok(table.boundingRegions?.[0].polygon);
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

        const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput;
        assert.fail("Expected an exception due to invalid locale.");
      } catch (ex: any) {
        assert.ok((ex as Error).message.includes("Invalid argument."));
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

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
    it("png file stream", async function (this: Mocha.Context) {
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

      const documents = analyzeResult?.documents;
      const w2Naive = documents?.[0];

      assert.isNotEmpty(documents);

      assert.equal(w2Naive?.docType, "tax.us.w2");
    });
  });

  describe("healthInsuranceCard - US", function () {
    it("png file stream", async function (this: Mocha.Context) {
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

      const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
      const analyzeResult = (
        (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
      ).analyzeResult;

      const documents = analyzeResult?.documents;

      assert.isNotEmpty(documents);
    });
  });
});
