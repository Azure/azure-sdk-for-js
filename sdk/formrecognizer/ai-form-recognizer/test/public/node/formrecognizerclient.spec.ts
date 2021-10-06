// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import fs from "fs";
import path from "path";

import {
  FormRecognizerClient,
  FormField,
  FormTrainingClient,
  CustomFormModel,
  KnownFormLocale
} from "../../../src";
import { testPollingOptions, makeCredential, createRecorder } from "../../utils/recordedClients";
import { env, Recorder } from "@azure-tools/test-recorder";
import { matrix } from "@azure/test-utils";

const endpoint = (): string => env.FORM_RECOGNIZER_ENDPOINT;

function makeTestUrl(urlPath: string): string {
  const testingContainerUrl = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
  const parts = testingContainerUrl.split("?");
  return `${parts[0]}${urlPath}?${parts[1]}`;
}

type MaybeTypedFormField<T extends FormField["valueType"]> =
  | Extract<FormField, { valueType: T }>
  | undefined;

matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}] FormRecognizerClient NodeJS only`, () => {
    const ASSET_PATH = path.resolve(path.join(process.cwd(), "assets"));
    let client: FormRecognizerClient;
    let recorder: Recorder;

    beforeEach(function(this: Context) {
      recorder = createRecorder(this);
      client = new FormRecognizerClient(endpoint(), makeCredential(useAad));
    });

    afterEach(async function() {
      if (recorder) {
        await recorder.stop();
      }
    });

    describe("content analysis", () => {
      it("pdf file stream", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeContent(stream, {
          contentType: "application/pdf",
          ...testPollingOptions
        });
        const pages = await poller.pollUntilDone();

        assert.ok(pages && pages.length > 0, `Expect no-empty pages but got ${pages}`);
        assert.isNotEmpty(pages);

        const [page] = pages;
        assert.isNotEmpty(page.tables);
        const [table] = page.tables!;
        assert.ok(table.boundingBox);
        assert.equal(table.pageNumber, 1);
      });

      it("png file stream", async () => {
        const filePath = path.join(ASSET_PATH, "receipt", "contoso-receipt.png");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeContent(stream, {
          contentType: "image/png",
          ...testPollingOptions
        });
        const pages = await poller.pollUntilDone();

        assert.ok(pages && pages.length > 0, `Expect no-empty pages but got ${pages}`);
      });

      it("jpeg file stream", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeContent(stream, {
          contentType: "image/jpeg",
          ...testPollingOptions
        });
        const pages = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        const [page] = pages;
        assert.isNotEmpty(page.tables);
        const [table] = page.tables!;
        assert.ok(table.boundingBox);
        assert.equal(table.pageNumber, 1);
      });

      it("tiff file stream", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.tiff");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeContent(stream, {
          contentType: "image/tiff",
          ...testPollingOptions
        });
        const pages = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        const [page] = pages;
        assert.isNotEmpty(page.tables);
        const [table] = page.tables!;
        assert.ok(table.boundingBox);
        assert.equal(table.pageNumber, 1);
      });

      it("pdf file stream without passing content type", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeContent(stream, testPollingOptions);
        const pages = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        const [page] = pages;
        assert.isNotEmpty(page.tables);
        const [table] = page.tables!;
        assert.ok(table.boundingBox);
        assert.equal(table.pageNumber, 1);
      });

      it("url", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        const poller = await client.beginRecognizeContentFromUrl(url, testPollingOptions);
        const pages = await poller.pollUntilDone();

        assert.isNotEmpty(pages);

        const [page] = pages;
        assert.isNotEmpty(page.tables);
        const [table] = page.tables!;
        assert.ok(table.boundingBox);
        assert.equal(table.pageNumber, 1);
      });

      it("with selection marks", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "selection_mark_form.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeContent(stream, testPollingOptions);
        const [page] = await poller.pollUntilDone();

        assert.ok(page);

        // TODO: layout regression
        // assert.isNotEmpty(page.tables);
        // const [table] = page.tables!;
        // assert.ok(table.boundingBox);
        // assert.equal(table.pageNumber, 1);

        assert.equal(page.pageNumber, 1);
        assert.isNotEmpty(page.selectionMarks);
      });

      it("specifying language", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        // Just make sure that this doesn't throw
        const poller = await client.beginRecognizeContentFromUrl(url, {
          language: "en",
          ...testPollingOptions
        });

        await poller.pollUntilDone();
      });

      it("invalid language throws", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        try {
          const poller = await client.beginRecognizeContentFromUrl(url, {
            language: "thisIsNotAValidLanguage",
            ...testPollingOptions
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
        const poller = await client.beginRecognizeContentFromUrl(url, {
          pages: ["1"],
          ...testPollingOptions
        });

        await poller.pollUntilDone();
      });

      it("invalid pages throws", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        try {
          const poller = await client.beginRecognizeContentFromUrl(url, {
            // No page 2 in document
            pages: ["2"],
            ...testPollingOptions
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
      let _model: CustomFormModel;
      let modelName: string;

      // We only want to create the model once, but because of the recorder's
      // precedence, we have to create it in a test, so one test will end up
      // recording the entire creation and the other tests will still be able
      // to use it.
      async function requireModel(): Promise<CustomFormModel> {
        if (!_model) {
          const formTrainingClient = new FormTrainingClient(endpoint(), makeCredential(useAad));
          modelName = recorder.getUniqueName("customFormModelName");
          const poller = await formTrainingClient.beginTraining(
            env.FORM_RECOGNIZER_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL,
            true,
            {
              modelName,
              ...testPollingOptions
            }
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

        const poller = await client.beginRecognizeCustomForms(modelId, stream, testPollingOptions);
        const [result] = await poller.pollUntilDone();

        assert.ok(result);
        assert.equal(result.formType, `custom:${modelName}`);

        const amexMark = result.fields["AMEX_SELECTION_MARK"];
        assert.equal(amexMark.valueType, "selectionMark");
        assert.equal(amexMark.value, "selected");

        const [page] = result.pages;

        assert.ok(page);

        // TODO: layout regression
        // assert.isNotEmpty(page.tables);
        // const [table] = page.tables!;
        // assert.ok(table.boundingBox);
        // assert.equal(table.pageNumber, 1);

        assert.equal(page.pageNumber, 1);
        assert.isNotEmpty(page.selectionMarks);
      });
    });

    describe("receipts", () => {
      it("png file stream", async () => {
        const filePath = path.join(ASSET_PATH, "receipt", "contoso-receipt.png");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeReceipts(stream, {
          contentType: "image/png",
          ...testPollingOptions
        });
        const receipts = await poller.pollUntilDone();

        assert.ok(receipts && receipts.length > 0, `Expect no-empty pages but got ${receipts}`);
        const receipt = receipts![0];
        assert.equal(receipt.formType, "prebuilt:receipt");
        assert.equal(receipt.fields["ReceiptType"].valueType, "string");
        assert.equal(receipt.fields["ReceiptType"].value as string, "Itemized");

        assert.ok(receipt.fields["Tax"], "Expecting valid 'Tax' field");
        assert.equal(receipt.fields["Tax"].valueType, "number");
        assert.equal(receipt.fields["Tax"].name, "Tax");

        assert.ok(receipt.fields["Total"], "Expecting valid 'Total' field");
        assert.equal(receipt.fields["Total"].valueType, "number");

        assert.equal(receipt.fields["Total"].value as number, 1203.39);
      });

      it("jpeg file stream", async () => {
        const filePath = path.join(ASSET_PATH, "receipt", "contoso-allinone.jpg");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeReceipts(stream, {
          contentType: "image/jpeg",
          ...testPollingOptions
        });
        const receipts = await poller.pollUntilDone();

        assert.ok(receipts && receipts.length > 0, `Expect no-empty pages but got ${receipts}`);
        const receipt = receipts![0];
        assert.equal(receipt.formType, "prebuilt:receipt");
      });

      it("url", async () => {
        const url = makeTestUrl("/contoso-allinone.jpg");

        const poller = await client.beginRecognizeReceiptsFromUrl(url, testPollingOptions);
        const receipts = await poller.pollUntilDone();

        assert.ok(receipts && receipts.length > 0, `Expect no-empty pages but got ${receipts}`);
        const receipt = receipts![0];
        assert.equal(receipt.formType, "prebuilt:receipt");
      });

      it("multi-page receipt with blank page", async () => {
        const filePath = path.join(ASSET_PATH, "receipt", "multipage_invoice1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeReceipts(stream, {
          contentType: "application/pdf",
          includeFieldElements: true,
          ...testPollingOptions
        });
        const receipts = await poller.pollUntilDone();

        assert.ok(receipts && receipts.length > 0, `Expect no-empty pages but got ${receipts}`);
        const receipt = receipts![0];
        assert.equal(receipt.formType, "prebuilt:receipt");
      });

      it("specifying locale", async () => {
        const url = makeTestUrl("/contoso-allinone.jpg");

        // Just make sure that this doesn't throw
        const poller = await client.beginRecognizeReceiptsFromUrl(url, {
          locale: KnownFormLocale.EnIN,
          ...testPollingOptions
        });

        await poller.pollUntilDone();
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/contoso-allinone.jpg");

        try {
          const poller = await client.beginRecognizeReceiptsFromUrl(url, {
            locale: "thisIsNotAValidLocaleString",
            ...testPollingOptions
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
      const expectedArrayFieldValues: Record<string, string> = {
        JobTitles: "Senior Researcher",
        Departments: "Cloud & Al Department",
        Emails: "avery.smith@contoso.com",
        Websites: "https://www.contoso.com/",
        // TODO: service bug causes phone numbers not to be normalized
        // Faxes: "+44 (0) 20 6789 2345",
        // WorkPhones: "+44 (0) 20 9876 5432",
        // MobilePhones: "+44 (0) 7911 123456",
        Addresses: "2 Kingdom Street Paddington, London, W2 6BD",
        CompanyNames: "Contoso"
      };

      it("jpg file stream", async () => {
        const filePath = path.join(ASSET_PATH, "businessCard", "business-card-english.jpg");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeBusinessCards(stream, {
          contentType: "image/jpeg",
          ...testPollingOptions
        });
        const businessCards = await poller.pollUntilDone();

        assert.ok(
          businessCards && businessCards.length > 0,
          `Expect no-empty pages but got ${businessCards}`
        );
        const [businessCard] = businessCards;

        const contactNames = businessCard.fields["ContactNames"] as MaybeTypedFormField<"array">;
        assert.equal(contactNames?.valueType, "array");
        assert.equal(contactNames?.value?.length, 1);

        const nameItem = contactNames?.value?.[0] as MaybeTypedFormField<"object">;
        assert.equal(nameItem?.value?.["FirstName"]?.value, "Avery");
        assert.equal(nameItem?.value?.["LastName"]?.value, "Smith");

        for (const [fieldName, expectedValue] of Object.entries(expectedArrayFieldValues)) {
          const field = businessCard.fields[fieldName] as MaybeTypedFormField<"array">;
          assert.equal(field?.value?.length, 1);
          const value = field?.value?.[0].value;
          assert.equal(value, expectedValue);
        }
      });

      it("url", async () => {
        const url = makeTestUrl("/businessCard.png");

        const poller = await client.beginRecognizeBusinessCardsFromUrl(url, {
          ...testPollingOptions
        });
        const businessCards = await poller.pollUntilDone();

        assert.ok(
          businessCards && businessCards.length > 0,
          `Expect no-empty pages but got ${businessCards}`
        );
        const [businessCard] = businessCards;
        const contactNames = businessCard.fields["ContactNames"] as MaybeTypedFormField<"array">;
        assert.equal(contactNames?.valueType, "array");
        assert.equal(contactNames?.value?.length, 1);

        const nameItem = contactNames?.value?.[0] as MaybeTypedFormField<"object">;
        assert.equal(nameItem?.value?.["FirstName"]?.value, "Avery");
        assert.equal(nameItem?.value?.["LastName"]?.value, "Smith");

        for (const [fieldName, expectedValue] of Object.entries(expectedArrayFieldValues)) {
          const field = businessCard.fields[fieldName] as MaybeTypedFormField<"array">;
          assert.equal(field?.value?.length, 1);
          assert.equal(field?.value?.[0].value, expectedValue);
        }
      });

      it("specifying locale", async () => {
        const url = makeTestUrl("/businessCard.jpg");

        // Just make sure that this doesn't throw
        const poller = await client.beginRecognizeReceiptsFromUrl(url, {
          locale: KnownFormLocale.EnIN,
          ...testPollingOptions
        });

        await poller.pollUntilDone();
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/businessCard.jpg");

        try {
          const poller = await client.beginRecognizeReceiptsFromUrl(url, {
            locale: "thisIsNotAValidLocaleString",
            ...testPollingOptions
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
      const expectedFieldValues: Record<string, unknown> = {
        VendorName: "Contoso",
        VendorAddress: "1 Redmond way Suite 6000 Redmond, WA 99243",
        CustomerAddressRecipient: "Microsoft",
        CustomerAddress: "1020 Enterprise Way Sunnayvale, CA 87659",
        CustomerName: "Microsoft",
        InvoiceId: "34278587"
        // TODO: model regression
        // InvoiceTotal: 56651.49
      };

      const expectedDateValues: Record<string, Date> = {
        InvoiceDate: new Date("June 18, 2017 00:00:00+0000"),
        DueDate: new Date("June 24, 2017 00:00:00+0000")
      };

      it("pdf file stream", async () => {
        const filePath = path.join(ASSET_PATH, "invoice", "Invoice_1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeInvoices(stream, {
          contentType: "application/pdf",
          ...testPollingOptions
        });
        const invoices = await poller.pollUntilDone();

        assert.isNotEmpty(invoices);
        const [invoice] = invoices;

        assert.isNotEmpty(invoice.pages);
        const [page] = invoice.pages;
        assert.isNotEmpty(page.tables);
        const [table] = page.tables!;
        assert.ok(table.boundingBox);
        assert.equal(table.pageNumber, 1);

        for (const [fieldName, expectedValue] of Object.entries(expectedFieldValues)) {
          const field = invoice.fields[fieldName];
          assert.equal(field?.value, expectedValue);
        }

        for (const [fieldName, expectedDate] of Object.entries(expectedDateValues)) {
          const { value: date } = invoice.fields[fieldName] as { value: Date };
          assert.equal(date.getDate(), expectedDate.getDate());
          assert.equal(date.getMonth(), expectedDate.getMonth());
          assert.equal(date.getFullYear(), expectedDate.getFullYear());
        }
      });

      it("url", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        const poller = await client.beginRecognizeInvoicesFromUrl(url, {
          ...testPollingOptions
        });
        const invoices = await poller.pollUntilDone();

        assert.isNotEmpty(invoices);
        const [invoice] = invoices;

        assert.isNotEmpty(invoice.pages);
        const [page] = invoice.pages;
        assert.isNotEmpty(page.tables);
        const [table] = page.tables!;
        assert.ok(table.boundingBox);
        assert.equal(table.pageNumber, 1);

        for (const [fieldName, expectedValue] of Object.entries(expectedFieldValues)) {
          const field = invoice.fields[fieldName];
          assert.equal(field?.value, expectedValue);
        }

        for (const [fieldName, expectedDate] of Object.entries(expectedDateValues)) {
          const { value: date } = invoice.fields[fieldName] as { value: Date };
          assert.equal(date.getDate(), expectedDate.getDate());
          assert.equal(date.getMonth(), expectedDate.getMonth());
          assert.equal(date.getFullYear(), expectedDate.getFullYear());
        }
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        try {
          const poller = await client.beginRecognizeInvoicesFromUrl(url, {
            locale: "thisIsNotAValidLocaleString",
            ...testPollingOptions
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
      const expectedFieldValues: Record<string, unknown> = {
        FirstName: "LIAM R.",
        LastName: "TALBOT",
        DocumentNumber: "WDLABCD456DG",
        Sex: "M",
        Address: "123 STREET ADDRESS YOUR CITY WA 99999-1234",
        CountryRegion: "USA",
        Region: "Washington"
      };

      const expectedDateValues: Record<string, Date> = {
        DateOfBirth: new Date("January 6, 1958 00:00:00+0000"),
        DateOfExpiration: new Date("August 12, 2020 00:00:00+0000")
      };

      it("jpg file stream", async () => {
        const filePath = path.join(ASSET_PATH, "identityDocument", "license.jpg");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeIdentityDocuments(stream, {
          contentType: "image/jpeg",
          ...testPollingOptions
        });
        const documents = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        const [idDocument] = documents;

        assert.equal(idDocument.formType, "prebuilt:idDocument:driverLicense");

        assert.isNotEmpty(idDocument.pages);

        for (const [fieldName, expectedValue] of Object.entries(expectedFieldValues)) {
          const field = idDocument.fields[fieldName];
          assert.equal(field?.value, expectedValue);
        }

        for (const [fieldName, expectedDate] of Object.entries(expectedDateValues)) {
          const { value: date } = idDocument.fields[fieldName] as { value: Date };
          assert.equal(date.getDate(), expectedDate.getDate());
          assert.equal(date.getMonth(), expectedDate.getMonth());
          assert.equal(date.getFullYear(), expectedDate.getFullYear());
        }
      });

      it("url", async () => {
        const url = makeTestUrl("/license.jpg");

        const poller = await client.beginRecognizeIdentityDocumentsFromUrl(url, {
          ...testPollingOptions
        });
        const documents = await poller.pollUntilDone();

        assert.isNotEmpty(documents);
        const [idDocument] = documents;
        assert.equal(idDocument.formType, "prebuilt:idDocument:driverLicense");

        assert.isNotEmpty(idDocument.pages);

        for (const [fieldName, expectedValue] of Object.entries(expectedFieldValues)) {
          const field = idDocument.fields[fieldName];
          assert.equal(field?.value, expectedValue);
        }

        for (const [fieldName, expectedDate] of Object.entries(expectedDateValues)) {
          const { value: date } = idDocument.fields[fieldName] as { value: Date };
          assert.equal(date.getDate(), expectedDate.getDate());
          assert.equal(date.getMonth(), expectedDate.getMonth());
          assert.equal(date.getFullYear(), expectedDate.getFullYear());
        }
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/license.jpg");

        try {
          const poller = await client.beginRecognizeIdentityDocumentsFromUrl(url, {
            locale: "thisIsNotAValidLocaleString",
            ...testPollingOptions
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
