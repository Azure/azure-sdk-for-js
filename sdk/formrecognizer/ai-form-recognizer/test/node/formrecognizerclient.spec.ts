// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import fs from "fs-extra";
import path from "path";

// import { getTrainingContainerSasUrl } from "../util/trainingContainer";
import { FormRecognizerClient, AzureKeyCredential } from '../../src';
import * as recorder from "@azure/test-utils-recorder";

describe("FormRecognizerClient NodeJS only", () => {
  const ASSET_PATH = path.resolve(path.join(process.cwd(), "test-assets"));
  let client: FormRecognizerClient;

  before(function () {
    // TODO: create recordings
    if (recorder.isPlaybackMode()) {
      this.skip();
    }
    client = new FormRecognizerClient(recorder.env.ENDPOINT, new AzureKeyCredential(recorder.env.FORM_RECOGNIZER_API_KEY));
  })

  it("recognizes content from a pdf file stream", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeContent(stream, "application/pdf");
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.pages && response!.pages.length > 0, `Expect no-empty pages but got ${response!.pages}`);

    //TODO: verify table rows column cells etc.
  })

  it("recognizes content from a png file stream", async () => {
    const filePath = path.join(ASSET_PATH, "receipt", "contoso-receipt.png");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeContent(stream, "image/png");
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.pages && response!.pages.length > 0, `Expect no-empty pages but got ${response!.pages}`);
  })

  it("recognizes content from a jpeg file stream", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeContent(stream, "image/jpeg");
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.pages && response!.pages.length > 0, `Expect no-empty pages but got ${response!.pages}`);
  })

  it("recognizes content from a tiff file stream", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.tiff");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeContent(stream, "image/tiff");
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.pages && response!.pages.length > 0, `Expect no-empty pages but got ${response!.pages}`);
  })

  it("recognizes content from a pdf file stream without passing content type", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeContent(stream);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.pages && response!.pages.length > 0, `Expect no-empty pages but got ${response!.pages}`);
  })

  it("recognizes content from a url", async () => {
    // const containerSasUrl = getTrainingContainerSasUrl();
    // assert.ok(containerSasUrl, "Expect valid container sas url");
    // const url = "<get a blob url to upload a form to the container>";
    const url = "https://storageyumeng.blob.core.windows.net/fr-test-data/Invoice_7.pdf";
    const poller = await client.beginRecognizeContentFromUrl(url);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.pages && response!.pages.length > 0, `Expect no-empty pages but got ${response!.pages}`);
  })

  it("recognizes receipt from a png file stream", async () => {
    const filePath = path.join(ASSET_PATH, "receipt", "contoso-receipt.png");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeReceipts(stream, "image/png");
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.receipts && response!.receipts.length > 0, `Expect no-empty pages but got ${response!.receipts}`);
    const usReceipt = response!.receipts![0];
    assert.equal(usReceipt.recognizedForm.formType, "prebuilt:receipt");
    assert.equal(usReceipt.locale, "US"); // default to "US" for now
    assert.equal(usReceipt.receiptType, "itemized");
    assert.equal(usReceipt.locale, "US");
    assert.equal(usReceipt.tax.name, "Tax");
    assert.equal(typeof usReceipt.total.value!, "number");
    assert.equal(usReceipt.total.value!, 1203.39);
  })

  it("recognizes receipt from a jpeg file stream", async () => {
    const filePath = path.join(ASSET_PATH, "receipt", "contoso-allinone.jpg");
    const stream = fs.createReadStream(filePath);

    const poller = await client.beginRecognizeReceipts(stream, "image/jpeg");
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.receipts && response!.receipts.length > 0, `Expect no-empty pages but got ${response!.receipts}`);
    const usReceipt = response!.receipts![0];
    assert.equal(usReceipt.recognizedForm.formType, "prebuilt:receipt");
  })

  it("recognizes receipt from a url", async () => {
    // const containerSasUrl = getTrainingContainerSasUrl();
    // assert.ok(containerSasUrl, "Expect valid container sas url");
    // const url = "<get a blob url to upload a form to the container>";
    const url = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-allinone.jpg";
    const poller = await client.beginRecognizeReceiptsFromUrl(url);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.receipts && response!.receipts.length > 0, `Expect no-empty pages but got ${response!.receipts}`);
    const usReceipt = response!.receipts![0];
    assert.equal(usReceipt.recognizedForm.formType, "prebuilt:receipt");
  })

}).timeout(60000);
