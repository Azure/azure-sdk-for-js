// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { DefaultHttpClient, WebResource } from "@azure/core-http";
import { FormRecognizerClient } from "../../src";
import { env, Recorder} from "@azure/test-utils-recorder";
import { createRecordedRecognizerClient } from '../util/recordedClients';

describe("FormRecognizerClient browser only", () => {
  let client: FormRecognizerClient;
  let recorder: Recorder;

  beforeEach(function () {
    ({recorder, client } = createRecordedRecognizerClient(this));
  });

  afterEach(function() {
    if (recorder) {
      recorder.stop();
    }
  });

  it("recognizes content from a url", async () => {
    const testingContainerUrl: string = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/Invoice_1.pdf?${urlParts[1]}`;

    const poller = await client.beginRecognizeContentFromUrl(url);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(
      response!.pages && response!.pages.length > 0,
      `Expect no-empty pages but got ${response!.pages}`
    );
  });

  it("recognizes receipt from a url", async () => {
    const testingContainerUrl: string = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/contoso-allinone.jpg?${urlParts[1]}`;

    const poller = await client.beginRecognizeReceiptsFromUrl(url);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(
      response!.receipts && response!.receipts.length > 0,
      `Expect no-empty pages but got ${response!.receipts}`
    );
    const usReceipt = response!.receipts![0];
    assert.equal(usReceipt.recognizedForm.formType, "prebuilt:receipt");
  });

  it("recognizes receipt from a Blob", async () => {
    recorder.skip("browser", "issue with blob response https://github.com/Azure/azure-sdk-for-js/issues/8663");
    const testingContainerUrl: string = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/contoso-allinone.jpg?${urlParts[1]}`;
    const req = new WebResource(url, "GET");
    req.streamResponseBody = true;
    const httpClient = new DefaultHttpClient();
    const blob = await httpClient.sendRequest(req);
    const data = await blob.blobBody

    assert.ok(data, "Expect valid Blob data to use as input");
    const poller = await client.beginRecognizeReceipts(data!);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(
      response!.receipts && response!.receipts.length > 0,
      `Expect no-empty pages but got ${response!.receipts}`
    );
    const usReceipt = response!.receipts![0];
    assert.equal(usReceipt.recognizedForm.formType, "prebuilt:receipt");
  });
}).timeout(60000);
