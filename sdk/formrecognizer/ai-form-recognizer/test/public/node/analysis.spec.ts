// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, Recorder } from "@azure-tools/test-recorder";
import { matrix } from "@azure/test-utils";
import { assert } from "chai";
import fs from "fs";
import { Context } from "mocha";
import path from "path";
import {
  DocumentAnalysisClient,
  DocumentModelAdministrationClient,
  IdentityDocument,
  ModelInfo,
  PrebuiltModels,
} from "../../../src";
import { DocumentDateField, DocumentSelectionMarkField } from "../../../src/models/fields";
import { createRecorder, makeCredential, testPollingOptions } from "../../utils/recordedClients";

const endpoint = (): string => env.FORM_RECOGNIZER_ENDPOINT;

function makeTestUrl(urlPath: string): string {
  const testingContainerUrl = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
  const parts = testingContainerUrl.split("?");
  return `${parts[0]}${urlPath}?${parts[1]}`;
}

function assertDefined(value: unknown, message?: string): asserts value {
  return assert.ok(value, message);
}

matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}] FormRecognizerClient NodeJS only`, () => {
    const ASSET_PATH = path.resolve(path.join(process.cwd(), "assets"));
    let client: DocumentAnalysisClient;
    let recorder: Recorder;

    beforeEach(function (this: Context) {
      recorder = createRecorder(this);
      client = new DocumentAnalysisClient(endpoint(), makeCredential(useAad));
    });

    afterEach(async function () {
      if (recorder) {
        await recorder.stop();
      }
    });

    describe("content analysis", () => {
      it("pdf file stream", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginExtractLayout(stream, testPollingOptions);
        const { pages, tables } = await poller.pollUntilDone();

        assert.ok(pages && pages.length > 0, `Expected non-empty pages but got ${pages}`);
        assert.isNotEmpty(pages);
        assert.isNotEmpty(tables);

        const [table] = tables!;
        assert.ok(table.boundingRegions?.[0]);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);
      });

      it("png file stream", async () => {
        const filePath = path.join(ASSET_PATH, "receipt", "contoso-receipt.png");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginExtractLayout(stream, testPollingOptions);
        const { pages } = await poller.pollUntilDone();

        assert.ok(pages && pages.length > 0, `Expect no-empty pages but got ${pages}`);
      });

      it("jpeg file stream", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginExtractLayout(stream, testPollingOptions);
        const { pages, tables } = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        assert.isNotEmpty(tables);
        const [table] = tables;
        assert.ok(table.boundingRegions?.[0].boundingBox);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);
      });

      it("tiff file stream", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.tiff");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginExtractLayout(stream, testPollingOptions);
        const { pages, tables } = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        assert.isNotEmpty(tables);
        const [table] = tables;
        assert.ok(table.boundingRegions?.[0].boundingBox);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);
      });

      it("pdf file stream without passing content type", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginExtractLayout(stream, testPollingOptions);
        const { pages, tables } = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        assert.isNotEmpty(tables);
        const [table] = tables;
        assert.ok(table.boundingRegions?.[0].boundingBox);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);
      });

      it("url", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        const poller = await client.beginExtractLayout(url, testPollingOptions);
        const { pages, tables } = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        assert.isNotEmpty(tables);
        const [table] = tables;
        assert.ok(table.boundingRegions?.[0].boundingBox);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);
      });

      it("with selection marks", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "selection_mark_form.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginExtractLayout(stream, testPollingOptions);

        const { pages } = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        /* There should be a table on the page, but the layout engine does not recognize it, maybe because it is too small and sparse.
          assert.isNotEmpty(tables);
          const [table] = tables;
          assert.ok(table.boundingRegions?.[0].boundingBox);
          assert.equal(table.boundingRegions?.[0].pageNumber, 1);*/

        assert.equal(pages[0].pageNumber, 1);
        assert.isNotEmpty(pages[0].selectionMarks);
      });

      it("specifying locale", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        // Just make sure that this doesn't throw
        const poller = await client.beginExtractLayout(url, {
          locale: "en-US",
          ...testPollingOptions,
        });

        await poller.pollUntilDone();
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        try {
          const poller = await client.beginExtractLayout(url, {
            locale: "thisIsNotAValidLanguage",
            ...testPollingOptions,
          });

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid language.");
        } catch (ex) {
          // Just make sure we didn't get a bad error message
          assert.isFalse((ex as Error).message.includes("<empty>"));
        }
      });

      it("specifying pages", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        // Just make sure that this doesn't throw
        const poller = await client.beginExtractLayout(url, {
          pages: "1",
          ...testPollingOptions,
        });

        await poller.pollUntilDone();
      });

      it("invalid pages throws", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        try {
          const poller = await client.beginExtractLayout(url, {
            // No page 2 in document
            pages: "2",
            ...testPollingOptions,
          });

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid pages.");
        } catch (ex) {
          // Just make sure we didn't get a bad error message
          assert.isFalse((ex as Error).message.includes("<empty>"));
        }
      });
    });

    describe("custom forms", () => {
      let _model: ModelInfo;
      let modelName: string;

      // We only want to create the model once, but because of the recorder's
      // precedence, we have to create it in a test, so one test will end up
      // recording the entire creation and the other tests will still be able
      // to use it.
      async function requireModel(): Promise<ModelInfo> {
        if (!_model) {
          const trainingClient = new DocumentModelAdministrationClient(
            endpoint(),
            makeCredential(useAad)
          );
          modelName = recorder.getUniqueName("customFormModelName");
          const poller = await trainingClient.beginBuildModel(
            modelName,
            env.FORM_RECOGNIZER_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL,
            testPollingOptions
          );
          _model = await poller.pollUntilDone();

          assert.ok(_model.modelId);
        }

        return _model;
      }

      it("with selection marks", async () => {
        const { modelId } = await requireModel();

        const filePath = path.join(ASSET_PATH, "forms", "selection_mark_form.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocuments(modelId, stream, testPollingOptions);
        const {
          pages: [page],
          documents: [result],
        } = await poller.pollUntilDone();

        assert.ok(result);
        assert.equal(result.docType, `${modelName}:${modelName}`);

        const amexMark = result.fields["AMEX_SELECTION_MARK"] as DocumentSelectionMarkField;
        assert.equal(amexMark.kind, "selectionMark");
        assert.equal(amexMark.value, "selected");

        assert.ok(page);

        /* There should be a table in the response, but it isn't recognized (maybe because it's too small or sparse)
          assert.isNotEmpty(tables);
          const [table] = tables!;
          assert.ok(table.boundingRegions?.[0].boundingBox);
          assert.equal(table.boundingRegions?.[0].pageNumber, 1);*/

        assert.equal(page.pageNumber, 1);
        assert.isNotEmpty(page.selectionMarks);
      });
    });

    describe("receipts", () => {
      it("png file stream", async () => {
        const filePath = path.join(ASSET_PATH, "receipt", "contoso-receipt.png");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocuments(
          PrebuiltModels.Receipt,
          stream,
          testPollingOptions
        );
        const {
          documents,
          documents: [receipt],
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        assert.equal(receipt.docType, "prebuilt:receipt");
        assert.equal(receipt.fields.receiptType?.value, "Itemized");

        assert.ok(receipt.fields.tax?.value, "Expecting valid 'Tax' field");
        assert.equal(receipt.fields.tax?.kind, "number");

        assert.ok(receipt.fields.total, "Expecting valid 'Total' field");
        assert.equal(receipt.fields.total?.kind, "number");

        assert.equal(receipt.fields.total?.value, 1203.39);
      });

      it("jpeg file stream", async () => {
        const filePath = path.join(ASSET_PATH, "receipt", "contoso-allinone.jpg");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocuments(
          PrebuiltModels.Receipt,
          stream,
          testPollingOptions
        );
        const {
          documents,
          documents: [receipt],
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        assert.equal(receipt.docType, "prebuilt:receipt");
      });

      it("url", async () => {
        const url = makeTestUrl("/contoso-allinone.jpg");

        const poller = await client.beginAnalyzeDocuments(
          PrebuiltModels.Receipt,
          url,
          testPollingOptions
        );
        const {
          documents,
          documents: [receipt],
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        assert.equal(receipt.docType, "prebuilt:receipt");
      });

      it("multi-page receipt with blank page", async () => {
        const filePath = path.join(ASSET_PATH, "receipt", "multipage_invoice1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocuments(
          PrebuiltModels.Receipt,
          stream,
          testPollingOptions
        );
        const {
          documents,
          documents: [receipt],
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        assert.equal(receipt.docType, "prebuilt:receipt");
      });

      it("specifying locale", async () => {
        const url = makeTestUrl("/contoso-allinone.jpg");

        // Just make sure that this doesn't throw
        const poller = await client.beginAnalyzeDocuments(PrebuiltModels.Receipt, url, {
          locale: "en-IN",
          ...testPollingOptions,
        });

        await poller.pollUntilDone();
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/contoso-allinone.jpg");

        try {
          const poller = await client.beginAnalyzeDocuments(PrebuiltModels.Receipt, url, {
            locale: "thisIsNotAValidLocaleString",
            ...testPollingOptions,
          });

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid locale.");
        } catch (ex) {
          // Just make sure we didn't get a bad error message
          assert.isFalse((ex as Error).message.includes("<empty>"));
        }
      });
    });

    describe("business cards", () => {
      const expectedArrayFieldValues = {
        jobTitles: "Senior Researcher",
        departments: "Cloud & Al Department",
        emails: "avery.smith@contoso.com",
        websites: "https://www.contoso.com/",
        // TODO: service bug causes phone numbers not to be normalized
        // Faxes: "+44 (0) 20 6789 2345",
        // WorkPhones: "+44 (0) 20 9876 5432",
        // MobilePhones: "+44 (0) 7911 123456",
        addresses: "2 Kingdom Street Paddington, London, W2 6BD",
        companyNames: "Contoso",
      } as const;

      it("jpg file stream", async () => {
        const filePath = path.join(ASSET_PATH, "businessCard", "business-card-english.jpg");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocuments(
          PrebuiltModels.BusinessCard,
          stream,
          testPollingOptions
        );
        const {
          documents,
          documents: [businessCard],
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);

        const contactNames = businessCard.fields.contactNames;

        assertDefined(contactNames);

        assert.equal(contactNames.kind, "array");
        assert.equal(contactNames.values.length, 1);

        const nameItem = contactNames.values[0];
        assert.equal(nameItem.properties.firstName?.value, "Avery");
        assert.equal(nameItem.properties.lastName?.value, "Smith");

        for (const [fieldName, expectedValue] of Object.entries(expectedArrayFieldValues) as [
          keyof typeof expectedArrayFieldValues,
          string
        ][]) {
          const field = businessCard.fields[fieldName];
          assert.isNotEmpty(field?.values);
          const value = field?.values[0].value;
          assert.equal(value, expectedValue);
        }
      });

      it("url", async () => {
        const url = makeTestUrl("/businessCard.png");

        const poller = await client.beginAnalyzeDocuments(
          PrebuiltModels.BusinessCard,
          url,
          testPollingOptions
        );
        const {
          documents,
          documents: [businessCard],
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);

        const contactNames = businessCard.fields.contactNames;

        assertDefined(contactNames);

        assert.equal(contactNames.kind, "array");
        assert.equal(contactNames.values.length, 1);

        const nameItem = contactNames.values[0];
        assert.equal(nameItem.properties.firstName?.value, "Avery");
        assert.equal(nameItem.properties.lastName?.value, "Smith");

        for (const [fieldName, expectedValue] of Object.entries(expectedArrayFieldValues) as [
          keyof typeof expectedArrayFieldValues,
          string
        ][]) {
          const field = businessCard.fields[fieldName];
          assert.isNotEmpty(field?.values);
          const value = field?.values[0].value;
          assert.equal(value, expectedValue);
        }
      });

      it("specifying locale", async () => {
        const url = makeTestUrl("/businessCard.jpg");

        // Just make sure that this doesn't throw
        const poller = await client.beginAnalyzeDocuments(PrebuiltModels.BusinessCard, url, {
          locale: "en-IN",
          ...testPollingOptions,
        });

        await poller.pollUntilDone();
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/businessCard.jpg");

        try {
          const poller = await client.beginAnalyzeDocuments(PrebuiltModels.BusinessCard, url, {
            locale: "thisIsNotAValidLocaleString",
            ...testPollingOptions,
          });

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid locale.");
        } catch (ex) {
          // Just make sure we didn't get a bad error message
          assert.isFalse((ex as Error).message.includes("<empty>"));
        }
      });
    });

    describe("invoices", () => {
      const expectedFieldValues = {
        vendorName: "Contoso",
        vendorAddress: "1 Redmond way Suite 6000 Redmond, WA 99243",
        customerAddressRecipient: "Microsoft",
        customerAddress: "1020 Enterprise Way Sunnayvale, CA 87659",
        customerName: "Microsoft",
        invoiceId: "34278587",
        // TODO: model regression
        // InvoiceTotal: 56651.49
      } as const;

      const expectedDateValues = {
        invoiceDate: new Date("June 18, 2017 00:00:00+0000"),
        dueDate: new Date("June 24, 2017 00:00:00+0000"),
      } as const;

      it("pdf file stream", async () => {
        const filePath = path.join(ASSET_PATH, "invoice", "Invoice_1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocuments(
          PrebuiltModels.Invoice,
          stream,
          testPollingOptions
        );
        const {
          documents,
          documents: [invoice],
          pages,
          tables,
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        assert.isNotEmpty(pages);
        assert.isNotEmpty(tables);
        const [table] = tables!;
        assert.ok(table.boundingRegions?.[0].boundingBox);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);

        for (const [fieldName, expectedValue] of Object.entries(expectedFieldValues) as [
          keyof typeof expectedFieldValues,
          string
        ][]) {
          const field = invoice.fields[fieldName];
          assert.equal(field?.value, expectedValue);
        }

        for (const [fieldName, expectedDate] of Object.entries(expectedDateValues) as [
          keyof typeof expectedDateValues,
          Date
        ][]) {
          const { value: date } = invoice.fields[fieldName] as DocumentDateField;
          assert.equal(date?.getDate(), expectedDate.getDate());
          assert.equal(date?.getMonth(), expectedDate.getMonth());
          assert.equal(date?.getFullYear(), expectedDate.getFullYear());
        }
      });

      it("url", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        const poller = await client.beginAnalyzeDocuments(
          PrebuiltModels.Invoice,
          url,
          testPollingOptions
        );
        const {
          documents,
          documents: [invoice],
          pages,
          tables,
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        assert.isNotEmpty(pages);
        assert.isNotEmpty(tables);
        const [table] = tables!;
        assert.ok(table.boundingRegions?.[0].boundingBox);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);

        for (const [fieldName, expectedValue] of Object.entries(expectedFieldValues) as [
          keyof typeof expectedFieldValues,
          string
        ][]) {
          const field = invoice.fields[fieldName];
          assert.equal(field?.value, expectedValue);
        }

        for (const [fieldName, expectedDate] of Object.entries(expectedDateValues) as [
          keyof typeof expectedDateValues,
          Date
        ][]) {
          const { value: date } = invoice.fields[fieldName] as DocumentDateField;
          assert.equal(date?.getDate(), expectedDate.getDate());
          assert.equal(date?.getMonth(), expectedDate.getMonth());
          assert.equal(date?.getFullYear(), expectedDate.getFullYear());
        }
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        try {
          const poller = await client.beginAnalyzeDocuments(PrebuiltModels.Invoice, url, {
            locale: "thisIsNotAValidLocaleString",
            ...testPollingOptions,
          });

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid locale.");
        } catch (ex) {
          // Just make sure we didn't get a bad error message
          assert.isFalse((ex as Error).message.includes("<empty>"));
        }
      });
    });

    describe("identityDocuments", () => {
      const expectedFieldValues = {
        firstName: "LIAM R.",
        lastName: "TALBOT",
        documentNumber: "WDLABCD456DG",
        sex: "M",
        address: "123 STREET ADDRESS YOUR CITY WA 99999-1234",
        countryRegion: "USA",
        region: "Washington",
      } as const;

      const expectedDateValues = {
        dateOfBirth: new Date("January 6, 1958 00:00:00+0000"),
        dateOfExpiration: new Date("August 12, 2020 00:00:00+0000"),
      } as const;

      it("jpg file stream", async () => {
        const filePath = path.join(ASSET_PATH, "identityDocument", "license.jpg");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocuments(
          PrebuiltModels.IdentityDocument,
          stream,
          testPollingOptions
        );
        const {
          documents,
          documents: [idDocumentNaive],
          pages,
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);

        assert.equal(idDocumentNaive.docType, "prebuilt:idDocument:driverLicense");

        const idDocument = idDocumentNaive as Extract<
          IdentityDocument,
          { docType: "prebuilt:idDocument:driverLicense" }
        >;

        assert.isNotEmpty(pages);

        for (const [fieldName, expectedValue] of Object.entries(expectedFieldValues) as [
          keyof typeof expectedFieldValues,
          string
        ][]) {
          const field = idDocument.fields[fieldName];
          assert.equal(field?.value, expectedValue);
        }

        for (const [fieldName, expectedDate] of Object.entries(expectedDateValues) as [
          keyof typeof expectedDateValues,
          Date
        ][]) {
          const { value: date } = idDocument.fields[fieldName] as DocumentDateField;
          assert.equal(date?.getDate(), expectedDate.getDate());
          assert.equal(date?.getMonth(), expectedDate.getMonth());
          assert.equal(date?.getFullYear(), expectedDate.getFullYear());
        }
      });

      it("url", async () => {
        const url = makeTestUrl("/license.jpg");

        const poller = await client.beginAnalyzeDocuments(
          PrebuiltModels.IdentityDocument,
          url,
          testPollingOptions
        );
        const {
          documents,
          documents: [idDocumentNaive],
          pages,
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);

        assert.equal(idDocumentNaive.docType, "prebuilt:idDocument:driverLicense");

        const idDocument = idDocumentNaive as Extract<
          IdentityDocument,
          { docType: "prebuilt:idDocument:driverLicense" }
        >;

        assert.isNotEmpty(pages);

        for (const [fieldName, expectedValue] of Object.entries(expectedFieldValues) as [
          keyof typeof expectedFieldValues,
          string
        ][]) {
          const field = idDocument.fields[fieldName];
          assert.equal(field?.value, expectedValue);
        }

        for (const [fieldName, expectedDate] of Object.entries(expectedDateValues) as [
          keyof typeof expectedDateValues,
          Date
        ][]) {
          const { value: date } = idDocument.fields[fieldName] as DocumentDateField;
          assert.equal(date?.getDate(), expectedDate.getDate());
          assert.equal(date?.getMonth(), expectedDate.getMonth());
          assert.equal(date?.getFullYear(), expectedDate.getFullYear());
        }
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/license.jpg");

        try {
          const poller = await client.beginAnalyzeDocuments(PrebuiltModels.IdentityDocument, url, {
            locale: "thisIsNotAValidLocaleString",
            ...testPollingOptions,
          });

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid locale.");
        } catch (ex) {
          // Just make sure we didn't get a bad error message
          assert.isFalse((ex as Error).message.includes("<empty>"));
        }
      });
    });
  }).timeout(60000);
});
