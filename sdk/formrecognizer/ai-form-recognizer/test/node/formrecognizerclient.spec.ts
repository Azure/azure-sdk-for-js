// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import fs from "fs-extra";
import path from "path";

import { FormRecognizerClient } from "../../src";
import { createRecordedRecognizerClient } from "../util/recordedClients";
import { env, Recorder } from "@azure/test-utils-recorder";

describe("FormRecognizerClient NodeJS only", () => {
  const ASSET_PATH = path.resolve(path.join(process.cwd(), "test-assets"));
  let client: FormRecognizerClient;
  let recorder: Recorder;

  beforeEach(function() {
    ({ recorder, client } = createRecordedRecognizerClient(this));
  });

  afterEach(function() {
    if (recorder) {
      recorder.stop();
    }
  });

  it("recognizes content from a pdf file stream", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeContent(stream, "application/pdf");
    await poller.pollUntilDone();
    const pages = poller.getResult();

    assert.ok(
      pages && pages.length > 0,
      `Expect no-empty pages but got ${pages}`
    );

    //TODO: verify table rows column cells etc.
  });

  it("recognizes content from a png file stream", async () => {
    const filePath = path.join(ASSET_PATH, "receipt", "contoso-receipt.png");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeContent(stream, "image/png");
    await poller.pollUntilDone();
    const pages = poller.getResult();

    assert.ok(
      pages && pages.length > 0,
      `Expect no-empty pages but got ${pages}`
    );
  });

  it("recognizes content from a jpeg file stream", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeContent(stream, "image/jpeg");
    await poller.pollUntilDone();
    const pages = poller.getResult();

    assert.ok(
      pages && pages.length > 0,
      `Expect no-empty pages but got ${pages}`
    );
  });

  it("recognizes content from a tiff file stream", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.tiff");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeContent(stream, "image/tiff");
    await poller.pollUntilDone();
    const pages = poller.getResult();

    assert.ok(
      pages && pages.length > 0,
      `Expect no-empty pages but got ${pages}`
    );
  });

  it("recognizes content from a pdf file stream without passing content type", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeContent(stream);
    await poller.pollUntilDone();
    const pages = poller.getResult();

    assert.ok(
      pages && pages.length > 0,
      `Expect no-empty pages but got ${pages}`
    );
  });

  it("recognizes content from a url", async () => {
    const testingContainerUrl: string = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/Invoice_1.pdf?${urlParts[1]}`;

    const poller = await client.beginRecognizeContentFromUrl(url);
    await poller.pollUntilDone();
    const pages = poller.getResult();

    assert.ok(
      pages && pages.length > 0,
      `Expect no-empty pages but got ${pages}`
    );
  });

  it("recognizes receipt from a png file stream", async () => {
    const filePath = path.join(ASSET_PATH, "receipt", "contoso-receipt.png");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeReceipts(stream, "image/png");
    await poller.pollUntilDone();
    const receipts = poller.getResult();

    assert.ok(
      receipts && receipts.length > 0,
      `Expect no-empty pages but got ${receipts}`
    );
    const receipt = receipts![0];
    assert.equal(receipt.recognizedForm.formType, "prebuilt:receipt");
    assert.equal(receipt.recognizedForm.fields["ReceiptType"].valueType, "string");
    assert.equal(receipt.recognizedForm.fields["ReceiptType"].value as string, "Itemized");
    assert.ok(receipt.recognizedForm.fields["Tax"], "Expecting valid 'Tax' field");
    assert.equal(receipt.recognizedForm.fields["Tax"].valueType, "number");
    assert.equal(receipt.recognizedForm.fields["Tax"].name, "Tax");
    assert.ok(receipt.recognizedForm.fields["Total"], "Expecting valid 'Total' field");
    assert.equal(receipt.recognizedForm.fields["Total"].valueType, "number");
    assert.equal(receipt.recognizedForm.fields["Total"].value as number, 1203.39);
  });

  it("recognizes receipt from a jpeg file stream", async () => {
    const filePath = path.join(ASSET_PATH, "receipt", "contoso-allinone.jpg");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeReceipts(stream, "image/jpeg");
    await poller.pollUntilDone();
    const receipts = poller.getResult();

    assert.ok(
      receipts && receipts.length > 0,
      `Expect no-empty pages but got ${receipts}`
    );
    const receipt = receipts![0];
    assert.equal(receipt.recognizedForm.formType, "prebuilt:receipt");
  });

  it("recognizes receipt from a url", async () => {
    const testingContainerUrl: string = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/contoso-allinone.jpg?${urlParts[1]}`;

    const poller = await client.beginRecognizeReceiptsFromUrl(url);
    await poller.pollUntilDone();
    const receipts = poller.getResult();

    assert.ok(
      receipts && receipts.length > 0,
      `Expect no-empty pages but got ${receipts}`
    );
    const receipt = receipts![0];
    assert.equal(receipt.recognizedForm.formType, "prebuilt:receipt");
  });

  it("recognizes multi-page receipt with blank page", async () => {
    const filePath = path.join(ASSET_PATH, "receipt", "multipage_invoice1.pdf");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeReceipts(stream, "application/pdf", {
      includeTextContent: true
    });
    await poller.pollUntilDone();
    const receipts = poller.getResult();

    assert.ok(
      receipts && receipts.length > 0,
      `Expect no-empty pages but got ${receipts}`
    );
    const receipt = receipts![0];
    assert.equal(receipt.recognizedForm.formType, "prebuilt:receipt");
  });
}).timeout(60000);
