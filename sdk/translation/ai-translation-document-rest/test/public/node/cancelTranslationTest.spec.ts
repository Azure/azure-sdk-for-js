// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { DocumentTranslationClient, GetTranslationStatus200Response, isUnexpected } from "../.././../src";
import { createDocumentTranslationClient, startRecorder } from "../utils/recordedClient";
import { ONE_TEST_DOCUMENTS, createSourceContainer, createTargetContainer } from "./containerHelper";
import { Context } from "mocha";
import { createBatchRequest, createSourceInput, createTargetInput, getTranslationOperationID } from "../utils/testHelper";

describe("CancelTranslation tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it.only("cancel translation", async () => {
    const sourceUrl = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS);
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = await createTargetContainer(recorder);
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);
    
    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const poller = await client.path("/document/batches").post({
      body: batchRequests
    }); 
    const id = getTranslationOperationID(poller.headers["operation-location"]);

    //Cancel translation
    await client.path("/document/batches/{id}", id).delete();

    //get translation status and verify
    const response = await client.path("/document/batches/{id}", id).get();
    if (response.status === "200" && "body" in response) {  
      const idOutput = (response as GetTranslationStatus200Response).body.id;
      assert.isTrue(idOutput == id);
      const statusOutput = (response as GetTranslationStatus200Response).body.status; 
      assert.isTrue((statusOutput == "Cancelled") || (statusOutput == "Cancelling") || (statusOutput == "NotStarted"));     
    } 
    if (isUnexpected(response)) {
      throw response.body;
    }
  });
  
});
