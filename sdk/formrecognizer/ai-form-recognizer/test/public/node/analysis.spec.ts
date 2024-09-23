// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { matrix } from "@azure-tools/test-utils";
import { assert } from "chai";
import fs from "fs";
import { Context } from "mocha";
import path from "path";
import {
  AnalyzedDocument,
  DocumentAnalysisClient,
  DocumentModelAdministrationClient,
  DocumentTable,
  DocumentModelDetails,
  FormRecognizerFeature,
  DocumentBarcode,
} from "../../../src";
import { DocumentSelectionMarkField } from "../../../src/models/fields";
import {
  createRecorder,
  getRandomNumber,
  makeCredential,
  testPollingOptions,
} from "../../utils/recordedClients";
import { DocumentModelBuildMode } from "../../../src/options/BuildModelOptions";
import { createValidator } from "../../utils/fieldValidator";

import { PrebuiltModels } from "../../utils/prebuilts";
import { PrebuiltIdDocumentDocument } from "../../../samples-dev/prebuilt/prebuilt-idDocument";
import { ASSET_PATH, makeTestUrl } from "../../utils/etc";

const endpoint = (): string => assertEnvironmentVariable("FORM_RECOGNIZER_ENDPOINT");

function assertDefined(value: unknown, message?: string): asserts value {
  return assert.ok(value, message);
}

matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}] analysis (Node)`, () => {
    let client: DocumentAnalysisClient;
    let recorder: Recorder;

    beforeEach(async function (this: Context) {
      recorder = await createRecorder(this.currentTest);
      await recorder.setMatcher("BodilessMatcher");
      client = new DocumentAnalysisClient(
        endpoint(),
        makeCredential(useAad),
        recorder.configureClientOptions({}),
      );
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

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.Layout,
          stream,
          testPollingOptions,
        );
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

        const poller = await client.beginAnalyzeDocument(
          "prebuilt-layout",
          stream,
          testPollingOptions,
        );
        const { pages, paragraphs } = await poller.pollUntilDone();

        assert.ok(
          paragraphs && paragraphs.length > 0,
          `Expected non-empty paragraphs but got ${paragraphs}.`,
        );

        assert.ok(pages && pages.length > 0, `Expect no-empty pages but got ${pages}`);
      });

      it("jpeg file stream", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.Layout,
          stream,
          testPollingOptions,
        );
        const { pages, tables } = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        assert.isNotEmpty(tables);
        const [table] = tables as DocumentTable[];
        assert.ok(table.boundingRegions?.[0].polygon);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);
      });

      it("tiff file stream", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.tiff");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.Layout,
          stream,
          testPollingOptions,
        );
        const { pages, tables } = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        assert.isNotEmpty(tables);
        const [table] = tables as DocumentTable[];
        assert.ok(table.boundingRegions?.[0].polygon);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);
      });

      it("pdf file stream without passing content type", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.Layout,
          stream,
          testPollingOptions,
        );
        const { pages, tables } = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        assert.isNotEmpty(tables);
        const [table] = tables as DocumentTable[];
        assert.ok(table.boundingRegions?.[0].polygon);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);
      });

      it("url", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        const poller = await client.beginAnalyzeDocumentFromUrl(
          PrebuiltModels.Layout,
          url,
          testPollingOptions,
        );
        const { pages, tables } = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        assert.isNotEmpty(tables);
        const [table] = tables as DocumentTable[];
        assert.ok(table.boundingRegions?.[0].polygon);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);
      });

      it("with selection marks", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "selection_mark_form.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.Layout,
          stream,
          testPollingOptions,
        );

        const { pages } = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        /* There should be a table on the page, but the layout engine does not recognize it, maybe because it is too small and sparse.
        assert.isNotEmpty(tables);
        const [table] = tables;
        assert.ok(table.boundingRegions?.[0].boundingBox);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);*/

        assert.equal(pages?.[0].pageNumber, 1);
        assert.isNotEmpty(pages?.[0].selectionMarks);
      });

      it("specifying locale", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        // Just make sure that this doesn't throw
        const poller = await client.beginAnalyzeDocumentFromUrl(PrebuiltModels.Layout, url, {
          locale: "en-US",
          ...testPollingOptions,
        });

        await poller.pollUntilDone();
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        try {
          const poller = await client.beginAnalyzeDocumentFromUrl(PrebuiltModels.Layout, url, {
            locale: "thisIsNotAValidLanguage",
            ...testPollingOptions,
          });

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid language.");
        } catch (ex: any) {
          // Just make sure we didn't get a bad error message
          assert.isFalse((ex as Error).message.includes("<empty>"));
        }
      });

      it("specifying pages", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        // Just make sure that this doesn't throw
        const poller = await client.beginAnalyzeDocumentFromUrl(PrebuiltModels.Layout, url, {
          pages: "1",
          ...testPollingOptions,
        });

        await poller.pollUntilDone();
      });

      it("invalid pages throws", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        try {
          const poller = await client.beginAnalyzeDocumentFromUrl(PrebuiltModels.Layout, url, {
            // No page 2 in document
            pages: "2",
            ...testPollingOptions,
          });

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid pages.");
        } catch (ex: any) {
          // Just make sure we didn't get a bad error message
          assert.isFalse((ex as Error).message.includes("<empty>"));
        }
      });

      it("barcode", async function () {
        const url = makeTestUrl("/barcode2.tif");

        const poller = await client.beginAnalyzeDocumentFromUrl("prebuilt-read", url, {
          ...testPollingOptions,
          features: [FormRecognizerFeature.Barcodes],
        });

        const { pages } = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        assert.isNotEmpty(pages?.[0].barcodes);

        const [barcode1, barcode2] = pages?.[0].barcodes as DocumentBarcode[];

        assert.equal(barcode1.kind, "Code39");
        assert.equal(barcode1.value, "D589992-X");

        assert.equal(barcode2.kind, "Code39");
        assert.equal(barcode2.value, "SYN121720213429");
      });

      it("annotations", async function () {
        const url = makeTestUrl("/annotations.jpg");

        const poller = await client.beginAnalyzeDocumentFromUrl(
          "prebuilt-layout",
          url,
          testPollingOptions,
        );

        const { pages } = await poller.pollUntilDone();

        assert.isNotEmpty(pages);
      });

      it("formula", async function () {
        const url = makeTestUrl("/formula1.jpg");

        const poller = await client.beginAnalyzeDocumentFromUrl("prebuilt-document", url, {
          ...testPollingOptions,
          features: [FormRecognizerFeature.Formulas],
        });

        const { pages } = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        assert.isNotEmpty(pages?.[0].formulas);
      });
    });

    describe("custom forms", () => {
      const validator = createValidator({
        customerName: "Microsoft",
        invoiceId: "34278587",
        invoiceDate: "2017-06-18T00:00:00.000Z",
        dueDate: "2017-06-24T00:00:00.000Z",
        vendorName: "Contoso",
        vendorAddress: {
          houseNumber: "1",
          road: "Redmond way",
          city: "Redmond",
          state: "WA",
          postalCode: "99243",
          streetAddress: "1 Redmond way Suite\n6000",
          unit: "Suite\n6000",
        },
        customerAddress: {
          houseNumber: "1020",
          road: "Enterprise Way\nSunnayvale, CA 87659",
          streetAddress: "1020 Enterprise Way\nSunnayvale, CA 87659",
        },
        customerAddressRecipient: "Microsoft",
        invoiceTotal: {
          amount: 56651.49,
          currencySymbol: "$",
          currencyCode: "USD",
        },
        items: [
          {
            amount: {
              amount: 56651.49,
              currencySymbol: "$",
              currencyCode: "USD",
            },
            date: "2017-06-24T00:00:00.000Z",
            productCode: "34278587",
          },
        ],
      });
      let _model: DocumentModelDetails;
      let modelName: string;

      // We only want to create the model once, but because of the recorder's
      // precedence, we have to create it in a test, so one test will end up
      // recording the entire creation and the other tests will still be able
      // to use it.
      async function requireModel(): Promise<DocumentModelDetails> {
        if (!_model) {
          const trainingClient = new DocumentModelAdministrationClient(
            endpoint(),
            makeCredential(useAad),
            recorder.configureClientOptions({}),
          );
          modelName = recorder.variable(
            "customFormModelName",
            `customFormModelName${getRandomNumber()}`,
          );
          const poller = await trainingClient.beginBuildDocumentModel(
            modelName,
            assertEnvironmentVariable("FORM_RECOGNIZER_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL"),
            DocumentModelBuildMode.Template,
            testPollingOptions,
          );
          _model = await poller.pollUntilDone();

          assert.ok(_model.modelId);
        }

        return _model;
      }

      // hits invalid argument error
      it("with selection marks", async () => {
        const { modelId } = await requireModel();

        const filePath = path.join(ASSET_PATH, "forms", "selection_mark_form.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(modelId, stream, testPollingOptions);
        const { pages, documents } = await poller.pollUntilDone();

        assert.ok(documents);
        assert.equal(documents?.[0].docType, `${modelName}:${modelName}`);

        const amexMark = documents?.[0].fields["AMEX_SELECTION_MARK"] as DocumentSelectionMarkField;
        assert.equal(amexMark.kind, "selectionMark");
        assert.equal(amexMark.value, "selected");

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
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.Invoice,
          stream,
          testPollingOptions,
        );

        const { documents } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);

        assert.equal(documents?.[0].docType, "invoice");

        validator(documents?.[0] as AnalyzedDocument);
      });
    });

    describe("receipts", () => {
      it("png file stream", async () => {
        const validator = createValidator({
          merchantName: "Contoso",
          merchantPhoneNumber: "+19876543210",
          merchantAddress: {
            houseNumber: "123",
            road: "Main Street",
            city: "Redmond",
            state: "WA",
            postalCode: "98052",
            streetAddress: "123 Main Street",
          },
          total: 2516.28,
          transactionDate: "2019-06-10T00:00:00.000Z",
          transactionTime: "13:59:00",
          subtotal: 2297.97,
          totalTax: 218.31,
          items: [
            {
              totalPrice: 1998,
              description: "Surface Pro 6",
              quantity: 2,
            },
            {
              totalPrice: 299.97,
              description: "Surface Pen",
              quantity: 3,
            },
          ],
        });

        const filePath = path.join(ASSET_PATH, "receipt", "contoso-receipt.png");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.Receipt,
          stream,
          testPollingOptions,
        );
        const { documents } = await poller.pollUntilDone();
        assert.isNotEmpty(documents);

        assert.equal(documents?.[0].docType, "receipt.retailMeal");

        validator(documents?.[0] as AnalyzedDocument);
      });

      it("jpeg file stream", async () => {
        const validator = createValidator({
          merchantName: "Contoso",
          merchantPhoneNumber: "+19876543210",
          merchantAddress: {
            houseNumber: "123",
            road: "Main Street",
            city: "Redmond",
            state: "WA",
            postalCode: "98052",
            streetAddress: "123 Main Street",
          },
          total: 14.5,
          transactionDate: "2019-06-10T00:00:00.000Z",
          transactionTime: "13:59:00",
          subtotal: 11.7,
          totalTax: 1.17,
          tip: 1.63,
          items: [
            {
              totalPrice: 2.2,
              description: "Cappuccino",
              quantity: 1,
            },
            {
              totalPrice: 9.5,
              description: "BACON & EGGS",
              quantity: 1,
            },
          ],
        });
        const filePath = path.join(ASSET_PATH, "receipt", "contoso-allinone.jpg");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.Receipt,
          stream,
          testPollingOptions,
        );
        const { documents } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        assert.equal(documents?.[0].docType, "receipt.retailMeal");

        validator(documents?.[0] as AnalyzedDocument);
      });

      it("url", async () => {
        const validator = createValidator({
          merchantName: "Contoso",
          merchantPhoneNumber: "+19876543210",
          merchantAddress: {
            houseNumber: "123",
            road: "Main Street",
            city: "Redmond",
            state: "WA",
            postalCode: "98052",
            streetAddress: "123 Main Street",
          },
          total: 14.5,
          transactionDate: "2019-06-10T00:00:00.000Z",
          transactionTime: "13:59:00",
          subtotal: 11.7,
          totalTax: 1.17,
          tip: 1.63,
          items: [
            {
              totalPrice: 2.2,
              description: "Cappuccino",
              quantity: 1,
            },
            {
              totalPrice: 9.5,
              description: "BACON & EGGS",
              quantity: 1,
            },
          ],
        });
        const url = makeTestUrl("/contoso-allinone.jpg");

        const poller = await client.beginAnalyzeDocumentFromUrl(
          PrebuiltModels.Receipt,
          url,
          testPollingOptions,
        );
        const { documents } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        assert.equal(documents?.[0].docType, "receipt.retailMeal");
        validator(documents?.[0] as AnalyzedDocument);
      });

      // TODO: Service regression - throws InternalServerError (message - "An unexpected error occurred.")
      it.skip("multi-page receipt with blank page", async () => {
        const validator = createValidator({
          // TODO: model regression
          // locale: "en-US",
          merchantName: "Bilbo Baggins",
          merchantPhoneNumber: "+15555555555",
          merchantAddress: "567 Main St.\nRedmond, WA",
          total: 430,
          subtotal: 300,
          // TODO: model regression
          // tip: 100,
          items: [
            {
              totalPrice: 10.99,
              quantity: 1,
            },
            {
              totalPrice: 14.67,
              quantity: 2,
            },
            {
              totalPrice: 15.66,
              quantity: 4,
            },
            {
              totalPrice: 12,
              quantity: 1,
            },
            {
              totalPrice: 10,
              quantity: 4,
            },
            {
              quantity: 6,
              price: 12,
            },
            {
              totalPrice: 22,
              quantity: 8,
            },
          ],
        });
        const filePath = path.join(ASSET_PATH, "receipt", "multipage_invoice1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.Receipt,
          stream,
          testPollingOptions,
        );
        const { documents } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        assert.equal(documents?.[0].docType, "receipt.retailMeal");
        validator(documents?.[0] as AnalyzedDocument);
      });

      it("specifying locale", async () => {
        const url = makeTestUrl("/contoso-allinone.jpg");

        // Just make sure that this doesn't throw
        const poller = await client.beginAnalyzeDocumentFromUrl(PrebuiltModels.Receipt, url, {
          locale: "en-IN",
          ...testPollingOptions,
        });

        await poller.pollUntilDone();
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/contoso-allinone.jpg");

        try {
          const poller = await client.beginAnalyzeDocumentFromUrl(PrebuiltModels.Receipt, url, {
            locale: "thisIsNotAValidLocaleString",
            ...testPollingOptions,
          });

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid locale.");
        } catch (ex: any) {
          // Just make sure we didn't get a bad error message
          assert.isFalse((ex as Error).message.includes("<empty>"));
        }
      });
    });

    describe("business cards", () => {
      const validator = createValidator({
        contactNames: [
          {
            firstName: "Avery",
            lastName: "Smith",
          },
        ],
        companyNames: ["Contoso"],
        jobTitles: ["Senior Researcher"],
        departments: ["Cloud & Al Department"],
        addresses: [
          {
            houseNumber: "2",
            road: "Kingdom Street",
            city: "London",
            postalCode: "W2 6BD",
            streetAddress: "2 Kingdom Street",
            suburb: "Paddington",
          },
        ],
        workPhones: ["+442098765432"],
        mobilePhones: ["+447911123456"],
        faxes: ["+442067892345"],
        emails: ["avery.smith@contoso.com"],
        websites: ["https://www.contoso.com/"],
      });

      it("jpg file stream", async () => {
        const filePath = path.join(ASSET_PATH, "businessCard", "business-card-english.jpg");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.BusinessCard,
          stream,
          testPollingOptions,
        );
        const { documents } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);

        const contactNames = documents?.[0].fields.contactNames;

        assertDefined(contactNames);

        assert.isNotEmpty(documents);
        assert.equal(documents?.[0].docType, "businessCard");

        validator(documents?.[0] as AnalyzedDocument);
      });

      it("url", async () => {
        const url = makeTestUrl("/businessCard.png");

        const poller = await client.beginAnalyzeDocumentFromUrl(
          PrebuiltModels.BusinessCard,
          url,
          testPollingOptions,
        );
        const { documents } = await poller.pollUntilDone();
        const businessCard = documents?.[0];

        assert.isNotEmpty(documents);
        assert.equal(businessCard?.docType, "businessCard");

        validator(businessCard as AnalyzedDocument);
      });

      it("specifying locale", async () => {
        const url = makeTestUrl("/businessCard.jpg");

        // Just make sure that this doesn't throw
        const poller = await client.beginAnalyzeDocumentFromUrl(PrebuiltModels.BusinessCard, url, {
          locale: "en-IN",
          ...testPollingOptions,
        });

        const { documents } = await poller.pollUntilDone();
        const businessCard = documents?.[0];
        const validatorOverride = createValidator({
          contactNames: [
            {
              firstName: "Avery",
              lastName: "Smith",
            },
          ],
          companyNames: ["Contoso"],
          jobTitles: ["Senior Researcher"],
          departments: ["Cloud & Al Department"],
          addresses: [
            {
              houseNumber: "2",
              road: "Kingdom Street",
              city: "London",
              postalCode: "W2 6BD",
              streetAddress: "2 Kingdom Street",
              suburb: "Paddington",
            },
          ],
          workPhones: ["+442098765432"],
          mobilePhones: ["+447911123456"],
          faxes: ["+442067892345"],
          emails: ["avery.smith@contoso.com"],
          websites: ["https://www.contoso.com/"],
        });
        validatorOverride(businessCard as AnalyzedDocument);
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/businessCard.jpg");

        try {
          const poller = await client.beginAnalyzeDocumentFromUrl(
            PrebuiltModels.BusinessCard,
            url,
            {
              locale: "thisIsNotAValidLocaleString",
              ...testPollingOptions,
            },
          );

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid locale.");
        } catch (ex: any) {
          // Just make sure we didn't get a bad error message
          assert.isFalse((ex as Error).message.includes("<empty>"));
        }
      });
    });

    describe("invoices", () => {
      const validator = createValidator({
        customerName: "Microsoft",
        invoiceId: "34278587",
        invoiceDate: "2017-06-18T00:00:00.000Z",
        dueDate: "2017-06-24T00:00:00.000Z",
        vendorName: "Contoso",
        vendorAddress: {
          houseNumber: "1",
          road: "Redmond way",
          city: "Redmond",
          state: "WA",
          postalCode: "99243",
          streetAddress: "1 Redmond way Suite\n6000",
          unit: "Suite\n6000",
        },
        customerAddress: {
          houseNumber: "1020",
          road: "Enterprise Way\nSunnayvale, CA 87659",
          streetAddress: "1020 Enterprise Way\nSunnayvale, CA 87659",
        },
        customerAddressRecipient: "Microsoft",
        invoiceTotal: {
          amount: 56651.49,
          currencySymbol: "$",
          currencyCode: "USD",
        },
        items: [
          {
            amount: {
              amount: 56651.49,
              currencySymbol: "$",
              currencyCode: "USD",
            },
            date: "2017-06-24T00:00:00.000Z",
            productCode: "34278587",
          },
        ],
      });

      it("pdf file stream", async () => {
        const filePath = path.join(ASSET_PATH, "invoice", "Invoice_1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.Invoice,
          stream,
          testPollingOptions,
        );
        const { documents, pages, tables } = await poller.pollUntilDone();
        const invoice = documents?.[0];

        assert.isNotEmpty(documents);
        assert.isNotEmpty(pages);
        assert.isNotEmpty(tables);
        const [table] = tables!;
        assert.ok(table.boundingRegions?.[0].polygon);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);

        validator(invoice as AnalyzedDocument);
      });

      it("url", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        const poller = await client.beginAnalyzeDocumentFromUrl(
          PrebuiltModels.Invoice,
          url,
          testPollingOptions,
        );
        const { documents, pages, tables } = await poller.pollUntilDone();
        const invoice = documents?.[0];

        assert.isNotEmpty(documents);
        assert.isNotEmpty(pages);
        assert.isNotEmpty(tables);
        const [table] = tables!;
        assert.ok(table.boundingRegions?.[0].polygon);
        assert.equal(table.boundingRegions?.[0].pageNumber, 1);

        validator(invoice as AnalyzedDocument);
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        try {
          const poller = await client.beginAnalyzeDocumentFromUrl(PrebuiltModels.Invoice, url, {
            locale: "thisIsNotAValidLocaleString",
            ...testPollingOptions,
          });

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid locale.");
        } catch (ex: any) {
          // Just make sure we didn't get a bad error message
          assert.isFalse((ex as Error).message.includes("<empty>"));
        }
      });
    });

    describe("identityDocuments", () => {
      const validator = createValidator({
        countryRegion: "USA",
        region: "West Virginia",
        documentNumber: "034568",
        documentDiscriminator: "12645646464554646456464544",
        firstName: "CHRIS",
        lastName: "SMITH",
        address: {
          road: "Main Street",
          city: "Charleston",
          state: "WV",
          postalCode: "456789",
          streetAddress: "Main Street",
        },
        dateOfBirth: "1988-03-23T00:00:00.000Z",
        dateOfExpiration: "2026-03-23T00:00:00.000Z",
        dateOfIssue: "2019-03-23T00:00:00.000Z",
        eyeColor: "BLU",
        height: "5'11\"",
        weight: "185LB",
        sex: "M",
        endorsements: "NONE",
        restrictions: "NONE",
        vehicleClassifications: "A",
      });

      it("png file stream", async () => {
        const filePath = path.join(ASSET_PATH, "identityDocument", "license.png");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.IdentityDocument,
          stream,
          testPollingOptions,
        );

        const { documents } = await poller.pollUntilDone();
        const receipt = documents?.[0];

        assert.isNotEmpty(documents);

        assert.equal(receipt?.docType, "idDocument.driverLicense");

        validator(receipt as AnalyzedDocument);
      });

      it("url", async () => {
        const url = makeTestUrl("/license.jpg");

        const validatorOverride = createValidator({
          countryRegion: "USA",
          region: "Washington",
          documentNumber: "WDLABCD456DG",
          documentDiscriminator: "DDWDLABCD456DG1234567XX1101",
          firstName: "LIAM R.",
          lastName: "TALBOT",
          address: {
            road: "123 STREET ADDRESS",
            city: "YOUR CITY",
            state: "WA",
            postalCode: "99999-1234",
            streetAddress: "123 STREET ADDRESS",
          },
          dateOfBirth: "1958-01-06T00:00:00.000Z",
          dateOfExpiration: "2020-08-12T00:00:00.000Z",
          dateOfIssue: "2015-01-06T00:00:00.000Z",
          eyeColor: "BLU",
          height: "5'-08\"",
          weight: "165 lb",
          sex: "M",
          endorsements: "L",
          restrictions: "B",
        });

        const poller = await client.beginAnalyzeDocumentFromUrl(
          PrebuiltModels.IdentityDocument,
          url,
          testPollingOptions,
        );
        const { documents, pages } = await poller.pollUntilDone();
        const idDocumentNaive = documents?.[0];

        assert.isNotEmpty(documents);

        assert.equal(idDocumentNaive?.docType, "idDocument.driverLicense");

        const idDocument = idDocumentNaive as Extract<
          PrebuiltIdDocumentDocument,
          { docType: "idDocument.driverLicense" }
        >;

        assert.isNotEmpty(pages);

        assert.equal(idDocument.docType, "idDocument.driverLicense");

        validatorOverride(idDocument as AnalyzedDocument);
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/license.png");

        try {
          const poller = await client.beginAnalyzeDocumentFromUrl(
            PrebuiltModels.IdentityDocument,
            url,
            {
              locale: "thisIsNotAValidLocaleString",
              ...testPollingOptions,
            },
          );

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid locale.");
        } catch (ex: any) {
          // Just make sure we didn't get a bad error message
          assert.isFalse((ex as Error).message.includes("<empty>"));
        }
      });
    });

    describe("tax - US - w2", () => {
      const validator = createValidator({
        w2FormVariant: "W-2",
        taxYear: "2018",
        w2Copy: "Copy 2 -. To Be Filed with Employee's State, City, or Local Income Tax Return,",
        employee: {
          socialSecurityNumber: "123-45-6789",
          name: "ANGEL BROWN",
          address: {
            houseNumber: "4567",
            road: "MAIN STREET",
            city: "BUFFALO",
            state: "WA",
            postalCode: "12345",
            streetAddress: "4567 MAIN STREET",
          },
        },
        controlNumber: "000086242",
        employer: {
          idNumber: "98-7654321",
          name: "CONTOSO LTD",
          address: {
            houseNumber: "123",
            road: "MICROSOFT WAY",
            city: "REDMOND",
            state: "WA",
            postalCode: "98765",
            streetAddress: "123 MICROSOFT WAY",
          },
        },
        wagesTipsAndOtherCompensation: 37160.56,
        federalIncomeTaxWithheld: 3894.54,
        socialSecurityWages: 37160.56,
        socialSecurityTaxWithheld: 2303.95,
        medicareWagesAndTips: 37160.56,
        medicareTaxWithheld: 538.83,
        socialSecurityTips: 302.3,
        allocatedTips: 874.2,
        dependentCareBenefits: 9873.2,
        nonQualifiedPlans: 653.21,
        additionalInfo: [
          {
            letterCode: "DD",
            amount: 6939.68,
          },
          {
            letterCode: "F",
            amount: 5432,
          },
          {
            letterCode: "D",
            amount: 876.3,
          },
          {
            letterCode: "C",
            amount: 123.3,
          },
        ],
        other: "DISINS 170.85",
        stateTaxInfos: [
          {
            state: "PA",
            employerStateIdNumber: "87654321",
            stateWagesTipsEtc: 37160.56,
            stateIncomeTax: 1135.65,
          },
          {
            state: "WA",
            employerStateIdNumber: "12345678",
            stateWagesTipsEtc: 9631.2,
            stateIncomeTax: 1032.3,
          },
        ],
        localTaxInfos: [
          {
            localWagesTipsEtc: 37160.56,
            localIncomeTax: 51,
            localityName: "Cmberland Vly/Mddl",
          },
          {
            localWagesTipsEtc: 37160.56,
            localIncomeTax: 594.54,
            localityName: "E.Pennsboro/E.Pnns",
          },
        ],
      });

      it("png file stream", async function (this: Mocha.Context) {
        const filePath = path.join(ASSET_PATH, "w2", "w2-single.png");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.TaxUsW2,
          stream,
          testPollingOptions,
        );

        const { documents } = await poller.pollUntilDone();
        const w2Naive = documents?.[0];

        assert.isNotEmpty(documents);

        assert.equal(w2Naive?.docType, "tax.us.w2");

        validator(w2Naive as AnalyzedDocument);
      });
    });

    describe("healthInsuranceCard - US", function () {
      const validator = createValidator({
        insurer: "PREMERA BLUE CROSS",
        member: {
          name: "ANGEL BROWN",
          employer: "Microsoft",
          idNumberSuffix: "01",
        },
        idNumber: {
          prefix: "ABC",
          number: "123456789",
        },
        groupNumber: "1000000",
        prescriptionInfo: {
          rxBIN: "987654",
          rxGrp: "BCAAXYZ",
        },
        copays: [
          {
            benefit: "Deductible",
          },
          {
            benefit: "Coinsurance Max",
          },
        ],
        plan: {
          number: "456",
          name: "HEALTH SAVINGS PLAN",
        },
      });

      it("png file stream", async function (this: Mocha.Context) {
        const filePath = path.join(ASSET_PATH, "healthInsuranceCard", "insurance.png");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.HealthInsuranceCardUs,
          stream,
          testPollingOptions,
        );

        const { documents } = await poller.pollUntilDone();
        const healthInsuranceCard = documents?.[0];

        assert.isNotEmpty(documents);

        validator(healthInsuranceCard as AnalyzedDocument);
      });
    });
  }).timeout(60000);
});
