// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assertEnvironmentVariable, Recorder } from "@azure-tools/test-recorder";
import { matrix } from "@azure/test-utils";
import { assert } from "chai";
import fs from "fs";
import { Context } from "mocha";
import path from "path";
import {
  AnalyzedDocument,
  DocumentAnalysisClient,
  DocumentModelAdministrationClient,
  IdentityDocument,
  ModelInfo,
  PrebuiltModels,
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

const endpoint = (): string => assertEnvironmentVariable("FORM_RECOGNIZER_ENDPOINT");

function makeTestUrl(urlPath: string): string {
  const testingContainerUrl = assertEnvironmentVariable(
    "FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL"
  );
  const parts = testingContainerUrl.split("?");
  return `${parts[0]}${urlPath}?${parts[1]}`;
}

function assertDefined(value: unknown, message?: string): asserts value {
  return assert.ok(value, message);
}

matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}] analysis (Node)`, () => {
    const ASSET_PATH = path.resolve(path.join(process.cwd(), "assets"));
    let client: DocumentAnalysisClient;
    let recorder: Recorder;

    beforeEach(async function (this: Context) {
      recorder = await createRecorder(this.currentTest);
      await recorder.setMatcher("BodilessMatcher");
      client = new DocumentAnalysisClient(
        endpoint(),
        makeCredential(useAad),
        recorder.configureClientOptions({})
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
      const validator = createValidator({
        customerName: "Microsoft",
        invoiceId: "34278587",
        invoiceDate: "2017-06-18T00:00:00.000Z",
        dueDate: "2017-06-24T00:00:00.000Z",
        vendorName: "Contoso",
        vendorAddress: "1 Redmond way Suite 6000 Redmond, WA 99243",
        customerAddress: "1020 Enterprise Way Sunnayvale, CA 87659",
        customerAddressRecipient: "Microsoft",
        invoiceTotal: {
          amount: 56651.49,
          currencySymbol: "$",
        },
        items: [
          {
            amount: {
              amount: 56651.49,
              currencySymbol: "$",
            },
            date: "2017-06-18T00:00:00.000Z",
            productCode: "34278587",
            tax: {},
          },
        ],
      });
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
            makeCredential(useAad),
            recorder.configureClientOptions({})
          );
          modelName = recorder.variable(
            "customFormModelName",
            `customFormModelName${getRandomNumber()}`
          );
          const poller = await trainingClient.beginBuildModel(
            modelName,
            assertEnvironmentVariable("FORM_RECOGNIZER_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL"),
            DocumentModelBuildMode.Template,
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

        const poller = await client.beginAnalyzeDocument(modelId, stream, testPollingOptions);
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

      it("png file stream", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.Invoice,
          stream,
          testPollingOptions
        );

        const {
          documents,
          documents: [receipt],
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);

        assert.equal(receipt.docType, "invoice");

        validator(receipt as AnalyzedDocument);
      });
    });

    describe("receipts", () => {
      it("png file stream", async () => {
        const validator = createValidator({
          locale: "en-US",
          merchantName: "Contoso",
          merchantPhoneNumber: "+11234567890",
          merchantAddress: "123 Main Street Redmond, WA 98052",
          total: 1203.39,
          transactionDate: "2019-06-10T00:00:00.000Z",
          transactionTime: "13:59:00",
          subtotal: 1098.99,
          items: [
            {
              totalPrice: 999,
              description: "Surface Pro 6",
              quantity: 1,
            },
            {
              totalPrice: 99.99,
              description: "SurfacePen",
              quantity: 1,
            },
          ],
        });
        const filePath = path.join(ASSET_PATH, "receipt", "contoso-receipt.png");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.Receipt,
          stream,
          testPollingOptions
        );
        const {
          documents,
          documents: [receiptNaive],
        } = await poller.pollUntilDone();
        assert.isNotEmpty(documents);

        assert.equal(receiptNaive.docType, "receipt.retailMeal");

        validator(receiptNaive as AnalyzedDocument);
      });

      it("jpeg file stream", async () => {
        const validator = createValidator({
          locale: "en-US",
          merchantName: "Contoso",
          merchantPhoneNumber: "+19876543210",
          merchantAddress: "123 Main Street Redmond, WA 98052",
          total: 14.5,
          transactionDate: "2019-06-10T00:00:00.000Z",
          transactionTime: "13:59:00",
          subtotal: 11.7,
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
          testPollingOptions
        );
        const {
          documents,
          documents: [receipt],
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        assert.equal(receipt.docType, "receipt.retailMeal");

        validator(receipt as AnalyzedDocument);
      });

      it("url", async () => {
        const validator = createValidator({
          locale: "en-US",
          merchantName: "Contoso",
          merchantPhoneNumber: "+19876543210",
          merchantAddress: "123 Main Street Redmond, WA 98052",
          total: 14.5,
          transactionDate: "2019-06-10T00:00:00.000Z",
          transactionTime: "13:59:00",
          subtotal: 11.7,
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

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.Receipt,
          url,
          testPollingOptions
        );
        const {
          documents,
          documents: [receipt],
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        assert.equal(receipt.docType, "receipt.retailMeal");
        validator(receipt as AnalyzedDocument);
      });

      it("multi-page receipt with blank page", async () => {
        const validator = createValidator({
          locale: "en-US",
          merchantName: "Bilbo Baggins",
          merchantPhoneNumber: "+15555555555",
          merchantAddress: "123 Hobbit Lane Redmond, WA",
          total: 430,
          subtotal: 300,
          tip: 100,
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
              quantity: 4,
              price: 15.66,
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
              totalPrice: 12,
              quantity: 6,
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
          testPollingOptions
        );
        const {
          documents,
          documents: [receipt],
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        assert.equal(receipt.docType, "receipt.retailMeal");
        validator(receipt as AnalyzedDocument);
      });

      it("specifying locale", async () => {
        const url = makeTestUrl("/contoso-allinone.jpg");

        // Just make sure that this doesn't throw
        const poller = await client.beginAnalyzeDocument(PrebuiltModels.Receipt, url, {
          locale: "en-IN",
          ...testPollingOptions,
        });

        await poller.pollUntilDone();
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/contoso-allinone.jpg");

        try {
          const poller = await client.beginAnalyzeDocument(PrebuiltModels.Receipt, url, {
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
        addresses: ["2 Kingdom Street Paddington, London, W2 6BD"],
        workPhones: [undefined],
        mobilePhones: [undefined],
        faxes: [undefined],
        emails: ["avery.smith@contoso.com"],
        websites: ["https://www.contoso.com/"],
      });
      it("jpg file stream", async () => {
        const filePath = path.join(ASSET_PATH, "businessCard", "business-card-english.jpg");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
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

        assert.isNotEmpty(documents);
        assert.equal(businessCard.docType, "businessCard");

        validator(businessCard as AnalyzedDocument);
      });

      it("url", async () => {
        const url = makeTestUrl("/businessCard.png");

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.BusinessCard,
          url,
          testPollingOptions
        );
        const {
          documents,
          documents: [businessCard],
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        assert.equal(businessCard.docType, "businessCard");

        validator(businessCard as AnalyzedDocument);
      });

      it("specifying locale", async () => {
        const url = makeTestUrl("/businessCard.jpg");

        // Just make sure that this doesn't throw
        const poller = await client.beginAnalyzeDocument(PrebuiltModels.BusinessCard, url, {
          locale: "en-IN",
          ...testPollingOptions,
        });

        const {
          documents: _,
          documents: [businessCard],
        } = await poller.pollUntilDone();

        validator(businessCard as AnalyzedDocument);
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/businessCard.jpg");

        try {
          const poller = await client.beginAnalyzeDocument(PrebuiltModels.BusinessCard, url, {
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
      const validator = createValidator({
        customerName: "Microsoft",
        invoiceId: "34278587",
        invoiceDate: "2017-06-18T00:00:00.000Z",
        dueDate: "2017-06-24T00:00:00.000Z",
        vendorName: "Contoso",
        vendorAddress: "1 Redmond way Suite 6000 Redmond, WA 99243",
        customerAddress: "1020 Enterprise Way Sunnayvale, CA 87659",
        customerAddressRecipient: "Microsoft",
        invoiceTotal: {
          amount: 56651.49,
          currencySymbol: "$",
        },
        items: [
          {
            amount: {
              amount: 56651.49,
              currencySymbol: "$",
            },
            date: "2017-06-18T00:00:00.000Z",
            productCode: "34278587",
            tax: {},
          },
        ],
      });

      it("pdf file stream", async () => {
        const filePath = path.join(ASSET_PATH, "invoice", "Invoice_1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
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

        validator(invoice as AnalyzedDocument);
      });

      it("url", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        const poller = await client.beginAnalyzeDocument(
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

        validator(invoice as AnalyzedDocument);
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        try {
          const poller = await client.beginAnalyzeDocument(PrebuiltModels.Invoice, url, {
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
      const validator = createValidator({
        countryRegion: "USA",
        region: "Washington",
        documentNumber: "WDLABCD456DG",
        firstName: "LIAM R.",
        lastName: "TALBOT",
        address: "123 STREET ADDRESS YOUR CITY WA 99999-1234",
        dateOfBirth: "1958-01-06T00:00:00.000Z",
        dateOfExpiration: "2020-08-12T00:00:00.000Z",
        sex: "M",
        endorsements: "L",
        restrictions: "B",
      });

      it("jpg file stream", async () => {
        const filePath = path.join(ASSET_PATH, "identityDocument", "license.jpg");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.IdentityDocument,
          stream,
          testPollingOptions
        );

        const {
          documents,
          documents: [receipt],
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);

        assert.equal(receipt.docType, "idDocument.driverLicense");

        validator(receipt as AnalyzedDocument);
      });

      it("url", async () => {
        const url = makeTestUrl("/license.jpg");

        const poller = await client.beginAnalyzeDocument(
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

        assert.equal(idDocumentNaive.docType, "idDocument.driverLicense");

        const idDocument = idDocumentNaive as Extract<
          IdentityDocument,
          { docType: "idDocument.driverLicense" }
        >;

        assert.isNotEmpty(pages);

        assert.equal(idDocument.docType, "idDocument.driverLicense");

        validator(idDocument as AnalyzedDocument);
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/license.jpg");

        try {
          const poller = await client.beginAnalyzeDocument(PrebuiltModels.IdentityDocument, url, {
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

    describe("tax - US - w2", () => {
      const validator = createValidator({
        w2FormVariant: "W-2",
        taxYear: "2018",
        w2Copy: "Copy 2 -- To Be Filed with Employee's State, City, or Local Income Tax Return,",
        employee: {
          name: "BONNIE F HERNANDEZ",
          address: "96541 MOLLY HOLLOW STREET APT.124 KATHRYNMOUTH, NE",
          zipCode: "98631-5293",
          socialSecurityNumber: "986-62-1002",
        },
        controlNumber: "000086242",
        employer: {
          idNumber: "48-1069918",
          name: "BLUE BEACON USA, LP",
          address: "PO BOX 856 SALINA, KS",
          zipCode: "67402-0856",
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
            employerStateIdNumber: "18574095",
          },
          {
            state: "WA",
            employerStateIdNumber: "18743231",
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
            localityName: "|E.Pennsboro/E.Pnns",
          },
        ],
      });
      it("png file stream", async () => {
        const filePath = path.join(ASSET_PATH, "w2", "gold_simple_w2.png");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginAnalyzeDocument(
          PrebuiltModels.TaxUsW2,
          stream,
          testPollingOptions
        );

        const {
          documents,
          documents: [w2Naive],
        } = await poller.pollUntilDone();

        assert.isNotEmpty(documents);

        assert.equal(w2Naive.docType, "tax.us.w2");

        validator(w2Naive as AnalyzedDocument);
      });
    });
  }).timeout(60000);
});
