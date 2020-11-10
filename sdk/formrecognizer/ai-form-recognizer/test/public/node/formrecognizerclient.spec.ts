// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import fs from "fs";
import path from "path";

import { FormRecognizerClient, FormField } from "../../../src";
import { testPollingOptions, makeCredential, createRecorder } from "../../utils/recordedClients";
import { env, Recorder } from "@azure/test-utils-recorder";
import { matrix } from "../../utils/matrix";

const endpoint = (): string => env.FORM_RECOGNIZER_ENDPOINT;

function makeTestUrl(path: string): string {
  const testingContainerUrl = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
  const parts = testingContainerUrl.split("?");
  return `${parts[0]}${path}?${parts[1]}`;
}

type MaybeTypedFormField<T extends FormField["valueType"]> =
  | Extract<FormField, { valueType?: T }>
  | undefined;

matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}] FormRecognizerClient NodeJS only`, () => {
    const ASSET_PATH = path.resolve(path.join(process.cwd(), "test-assets"));
    let client: FormRecognizerClient;
    let recorder: Recorder;

    beforeEach(function() {
      // eslint-disable-next-line no-invalid-this
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

        // TODO: verify table rows column cells etc.
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

        assert.ok(pages && pages.length > 0, `Expect no-empty pages but got ${pages}`);
      });

      it("tiff file stream", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.tiff");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeContent(stream, {
          contentType: "image/tiff",
          ...testPollingOptions
        });
        const pages = await poller.pollUntilDone();

        assert.ok(pages && pages.length > 0, `Expect no-empty pages but got ${pages}`);
      });

      it("pdf file stream without passing content type", async () => {
        const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
        const stream = fs.createReadStream(filePath);

        const poller = await client.beginRecognizeContent(stream, testPollingOptions);
        const pages = await poller.pollUntilDone();

        assert.ok(pages && pages.length > 0, `Expect no-empty pages but got ${pages}`);
      });

      it("url", async () => {
        const url = makeTestUrl("/Invoice_1.pdf");

        const poller = await client.beginRecognizeContentFromUrl(url, testPollingOptions);
        const pages = await poller.pollUntilDone();

        assert.ok(pages && pages.length > 0, `Expect no-empty pages but got ${pages}`);
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
          locale: "en-IN",
          ...testPollingOptions
        });

        await poller.pollUntilDone();
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/contoso-allinone.jpg");

        try {
          // Just make sure that this doesn't throw
          const poller = await client.beginRecognizeReceiptsFromUrl(url, {
            locale: "thisIsNotAValidLocaleString",
            ...testPollingOptions
          });

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid locale.");
        } catch {
          // Intentionally left empty
        }
      });
    });

    describe("business cards", () => {
      const expectedArrayFieldValues: Record<string, string> = {
        JobTitles: "Senior Researcher",
        Departments: "Cloud & Al Department",
        Emails: "avery.smith@contoso.com",
        Websites: "https://www.contoso.com/",
        // TODO: known service issue where phone numbers are not populated
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
          assert.equal(field?.value?.[0].value, expectedValue);
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
          locale: "en-IN",
          ...testPollingOptions
        });

        await poller.pollUntilDone();
      });

      it("invalid locale throws", async () => {
        const url = makeTestUrl("/businessCard.jpg");

        try {
          // Just make sure that this doesn't throw
          const poller = await client.beginRecognizeReceiptsFromUrl(url, {
            locale: "thisIsNotAValidLocaleString",
            ...testPollingOptions
          });

          await poller.pollUntilDone();
          assert.fail("Expected an exception due to invalid locale.");
        } catch {
          // Intentionally left empty
        }
      });
    });
  }).timeout(60000);
});
