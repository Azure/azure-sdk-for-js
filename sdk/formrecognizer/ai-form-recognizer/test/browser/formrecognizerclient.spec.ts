// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { DefaultHttpClient, WebResource } from "@azure/core-http";
import { FormRecognizerClient, AzureKeyCredential } from "../../src";
import { env, Recorder } from "@azure/test-utils-recorder";
import {
  createRecordedRecognizerClient,
  testEnv,
  testPollingOptions
} from "../util/recordedClients";

describe("FormRecognizerClient browser only", () => {
  let client: FormRecognizerClient;
  let recorder: Recorder;
  const apiKey = new AzureKeyCredential(testEnv.FORM_RECOGNIZER_API_KEY);

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    ({ recorder, client } = createRecordedRecognizerClient(this, apiKey));
  });

  afterEach(async function() {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("recognizes content from a url", async () => {
    const testingContainerUrl: string = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/Invoice_1.pdf?${urlParts[1]}`;

    const poller = await client.beginRecognizeContentFromUrl(url, testPollingOptions);
    const pages = await poller.pollUntilDone();

    assert.ok(pages && pages.length > 0, `Expect non-empty pages but got ${pages}`);
  });

  it("recognizes receipt from a url", async () => {
    const testingContainerUrl: string = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/contoso-allinone.jpg?${urlParts[1]}`;

    const poller = await client.beginRecognizeReceiptsFromUrl(url, testPollingOptions);
    const receipts = await poller.pollUntilDone();

    assert.ok(receipts && receipts.length > 0, `Expect no-empty pages but got ${receipts}`);
    const receipt = receipts![0];
    assert.equal(receipt.formType, "prebuilt:receipt");
  });

  it("recognizes receipt from a Blob", async () => {
    recorder.skip(
      "browser",
      "issue with blob response https://github.com/Azure/azure-sdk-for-js/issues/8663"
    );
    const testingContainerUrl: string = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/contoso-allinone.jpg?${urlParts[1]}`;
    const req = new WebResource(url, "GET");
    req.streamResponseBody = true;
    const httpClient = new DefaultHttpClient();
    const blob = await httpClient.sendRequest(req);
    const data = await blob.blobBody;

    assert.ok(data, "Expect valid Blob data to use as input");
    const poller = await client.beginRecognizeReceipts(data!, testPollingOptions);
    const receipts = await poller.pollUntilDone();

    assert.ok(receipts && receipts.length > 0, `Expect no-empty pages but got ${receipts}`);
    const receipt = receipts![0];
    assert.equal(receipt.formType, "prebuilt:receipt");
  });
}).timeout(60000);
