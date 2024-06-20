// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { DocumentTranslationClient, isUnexpected, getLongRunningPoller, GetTranslationsStatus200Response, GetTranslationStatus200Response, TranslationStatusOutput } from "../.././../src";
import { createDocumentTranslationClient, startRecorder } from "../utils/recordedClient";
import { createSourceContainer, createTargetContainer } from "./containerHelper";
import { Context } from "mocha";
import { createBatchRequest, createDummyTestDocuments, createSourceInput, createTargetInput, getTranslationOperationID, sleep } from "../utils/testHelper";
import { TestDocument } from "../utils/TestDocument";

export const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("TranslationFilter tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it ("Translation Statuses Filter By Status", async () => {
    createTranslationJobs(1, 1, "Succeeded");
    const cancelledIds = createTranslationJobs(1, 1, "Cancelled");

    // list translations with filter
    let cancelledStatusList: string[] = [ "Cancelled", "Cancelling" ];
    const testStartTime = new Date();
    const queryParams = {
      statuses: cancelledStatusList,
      createdDateTimeUtcStart: testStartTime
    };    

    //get Translation Status
    const response = await client.path("/document/batches").get({
      queryParameters: queryParams 
    });
    if (response.status === "200" && "body" in response) {  
      const responseBody = (response as GetTranslationsStatus200Response).body;
      for (const translationStatus of responseBody.value) {
        assert.isTrue(cancelledStatusList.includes(translationStatus.status));
        assert.isTrue((await cancelledIds).includes(translationStatus.id));
      }
    }
    if (isUnexpected(response)) {
      throw "get translation status job error:" + response.body;
    }
  });

  it ("Translation Statuses Filter By Id", async () => {
    const allIds = createTranslationJobs(2, 1, "Succeeded");
    let targetIds: string[] = [];
    targetIds.push((await allIds)[0]);

    //get Translation Status
    const queryParams = {
        ids: targetIds
      };    
    const response = await client.path("/document/batches").get({
        queryParameters: queryParams 
      });
    if (response.status === "200" && "body" in response) {  
      const responseBody = (response as GetTranslationsStatus200Response).body;
      for (const translationStatus of responseBody.value) {
        assert.isTrue(targetIds.includes(translationStatus.id));
      }
    }
    if (isUnexpected(response)) {
      throw "get translation status job error:" + response.body;
    }
  });

  it ("Translation Statuses Filter By Created After", async () => {
    const testStartTime = new Date();
    const targetIds = createTranslationJobs(1, 1, "Succeeded");

    //get Translation Status
    const queryParams = {
        createdDateTimeUtcStart: testStartTime
      };    
    const response = await client.path("/document/batches").get({
        queryParameters: queryParams 
      });
    if (response.status === "200" && "body" in response) {  
      const responseBody = (response as GetTranslationsStatus200Response).body;
      for (const translationStatus of responseBody.value) {
        assert.isTrue((await targetIds).includes(translationStatus.id));
        assert.isTrue(new Date(translationStatus.createdDateTimeUtc) > testStartTime);
      }
    }
    if (isUnexpected(response)) {
      throw "get translation status job error:" + response.body;
    }
  });

  it ("Translation Statuses Filter By Created Before", async () => {    
    const targetIds = createTranslationJobs(1, 1, "Succeeded");
    for (let i = 0; i < (await targetIds).length; i++) {
        console.log(`targetIds[${i}]:`, (await targetIds)[i]);
    }
    
    const endDateTime = new Date();
    createTranslationJobs(1, 1, "Succeeded");

    // getting only translations from the last hour
    const startDateTime = new Date();
    startDateTime.setHours(startDateTime.getHours() - 1);

    //get Translation Status
    const queryParams = {
        createdDateTimeUtcStart: startDateTime,
        createdDateTimeUtcEnd: endDateTime
      };    
    const response = await client.path("/document/batches").get({
        queryParameters: queryParams 
      });
    
    if (response.status === "200" && "body" in response) {  
      const responseBody = (response as GetTranslationsStatus200Response).body;
      let idExists: boolean = false;
      for (const translationStatus of responseBody.value) {
        if ((await targetIds).includes(translationStatus.id)) {
            idExists = true;
        }
        assert.isTrue(new Date(translationStatus.createdDateTimeUtc) < endDateTime);
      }
      assert.isTrue(idExists);
    }    
    
    if (isUnexpected(response)) {
      throw "get translation status job error:" + response.body;
    }
  });

  it ("Translation Statuses Filter By Created On", async () => {    
    createTranslationJobs(3, 1, "Succeeded");   
    
    // Add filter
    const startDateTime = new Date();
    let orderByList: string[] = ["createdDateTimeUtc asc"];
    const queryParams = {
        createdDateTimeUtcStart: startDateTime,
        orderby: orderByList
    };

    const response = await client.path("/document/batches").get({
        queryParameters: queryParams 
      });
    let timestamp = new Date(-8640000000000000); // Minimum valid Date value in JavaScript
    if (response.status === "200" && "body" in response) {  
      const responseBody = (response as GetTranslationsStatus200Response).body;
      for (const translationStatus of responseBody.value) {
        assert.isTrue(new Date(translationStatus.createdDateTimeUtc) > timestamp);
        timestamp = new Date(translationStatus.createdDateTimeUtc);
      }
    }    
    
    if (isUnexpected(response)) {
      throw "get translation status job error:" + response.body;
    }
  });
  
  async function createTranslationJobs(jobsCount: number, docsPerJob: number, jobTerminalStatus: string) {
    // create source container
    if (jobTerminalStatus.includes("cancelled")) {
        docsPerJob = 20; // in order to avoid job completing before canceling
    }
    const testDocuments: TestDocument[] = createDummyTestDocuments(docsPerJob);    
    const sourceUrl = await createSourceContainer(testDocuments);
    const sourceInput = createSourceInput(sourceUrl);

    // create a translation job
    let translationIds: string[] = [];
    for (let i = 1; i <= jobsCount; i++) {
        let targetUrl = await createTargetContainer();
        let targetInput = createTargetInput(targetUrl, "fr");
        let batchRequest = createBatchRequest(sourceInput, [targetInput]);

        //Start translation
        const batchRequests = {inputs: [batchRequest]};
        const response = await client.path("/document/batches").post({
            body: batchRequests
        }); 
        if (isUnexpected(response)) {
            throw "start translation job error:" + response.body;
        }

        const operationLocationUrl = (await response).headers["operation-location"]
        const operationId = getTranslationOperationID(operationLocationUrl);
        translationIds.push(operationId);

        if (jobTerminalStatus.includes("succeeded")) {
            // Wait until the operation completes
            const poller = getLongRunningPoller(client, response, testPollingOptions);  
            const result = await (await poller).pollUntilDone();
            assert.equal(result.status, "200");
        } else if (jobTerminalStatus.includes("cancelled")) {
            await client.path("/document/batches/{id}", operationId).delete();
        }
    }

    // ensure that cancel status has propagated before returning
    if (jobTerminalStatus.includes("cancelled")) {
        waitForJobCancellation(translationIds);
    }
    return translationIds;
  }

async function waitForJobCancellation(translationIds: string[]): Promise<void> {
    const retryCount = 10; 

    for (const translationId of translationIds) {
        let translationStatus = null;
        let retriesLeft = retryCount;
        do {
            try {
                await sleep(10000);
                retriesLeft--;
                translationStatus = await client.path("/document/batches/{id}",translationId).get() as GetTranslationStatus200Response;
            } catch (error) {
                console.error('Error during translation status retrieval:', error);
            }            
        } while (translationStatus && (translationStatus.body as TranslationStatusOutput).summary.cancelled > 0 && retriesLeft > 0);
    }
  }

});
   