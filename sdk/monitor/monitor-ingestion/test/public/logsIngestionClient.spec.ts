// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LogsIngestionClient } from "../../src/logsIngestionClient";
import { Context } from "mocha";
import { assert } from "chai";
import * as dotenv from "dotenv";
import { AdditionalPolicyConfig } from "@azure/core-client";
import { createClientAndStartRecorder, getDcrId, getLogsIngestionEndpoint, loggerForTest, RecorderAndLogsClient } from "./shared/testShared";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
dotenv.config();


function createFailedPolicies(failedInterval: {isFailed: boolean}): AdditionalPolicyConfig[]{
  return [{
    policy: {
    name: "FakeDcrForTest",
    sendRequest: (req, next)=>{
      if(failedInterval.isFailed){
        req.url = req.url.replace(getDcrId(), "fake-id");
      }
      failedInterval.isFailed = !failedInterval.isFailed;
      return next(req);
    }
  },
  position: "perCall"
  }]
}

describe("LogsIngestionClient live tests", function () {
  let recorder: Recorder;
  let recordedClient: RecorderAndLogsClient;
  let client: LogsIngestionClient;
  beforeEach(async function (this: Context) {
    loggerForTest.verbose(`Recorder: starting...`);
    recorder = new Recorder(this.currentTest);
    recordedClient = await createClientAndStartRecorder(recorder);
    client = recordedClient.client;
  });
  afterEach(async function () {
    if (recorder) {
      loggerForTest.verbose("Recorder: stopping");
      await recorder.stop();
    }
  });

  it("sends basic data", async () => {
    const result = await client.upload(
      getDcrId(),
      "Custom-MyTableRawData",
      [
        {
          "Time": "2021-12-08T23:51:14.1104269Z",
          "Computer": "Computer1",
          "AdditionalContext": "kaghiya-1"
        },
        {
          "Time": "2021-12-08T23:51:14.1104269Z",
          "Computer": "Computer2",
          "AdditionalContext": {
            "InstanceName": "kaghiya-2",
            "TimeZone": "Central Time",
            "Level": 3,
            "CounterName": "test",
            "CounterValue": 23.5
          }
        }
      ]
    );
    assert.equal(result.uploadStatus,"Success");
    assert.equal(result.errors.length,0);
  });

  it("Success Test - divides huge data into chunks", async () => {
    const result = await client.upload(
      getDcrId(),
      "Custom-MyTableRawData",
      getObjects(1000),
      {
        maxConcurrency: 5
      }
    );
    assert.equal(result.uploadStatus,"Success");
    assert.equal(result.errors.length,0);
  });

  it("Partial Fail Test - when dcr id is incorrect for alternate requests", async() => {
    const logData = getObjects(150000);
    const additionalPolicies = createFailedPolicies({isFailed:false});
    const client = new LogsIngestionClient(
      getLogsIngestionEndpoint(),
      createTestCredential(),
      recorder.configureClientOptions( {  
           additionalPolicies })
    );
    recordedClient.client = client;
    const result = await client.upload(
      getDcrId(),
      "Custom-MyTableRawData",
      logData,
      {
        maxConcurrency: 3
      }
    );
    assert.equal(result.uploadStatus,"PartialFailure");
    result.errors.forEach(err => {
      assert.equal(err.responseError.message,`Data collection rule with immutable Id 'fake-id' not found.`);
    });
    const chunkArray = client.splitDataToChunks(logData);
    if(chunkArray.length%2 == 0){
      assert.equal(result.errors.length,(chunkArray.length/2));
    }
    if(chunkArray.length%2 == 1){
      assert.equal(result.errors.length,(chunkArray.length-1)/2);
    }    
  })

  it("Throws error when all logs fail", async ()=>{
    const logData = getObjects(100000);
    try{
      await client.upload(
        "immutable-id-123",
        "Custom-MyTableRawData",
        logData,
        {
          maxConcurrency: 3
        }
      );
    }
    catch(e: any){
      const errorMessage = (e).message;
      assert.equal(errorMessage,"All logs failed for ingestion");
      const chunkArray = client.splitDataToChunks(logData);
      assert.equal(chunkArray.length,e.errors.length);
      assert.equal(e.errors[0].responseError.details.error.message, "Data collection rule with immutable Id 'immutable-id-123' not found.");
    }
  })
});

export function getObjects(logsCount: Number): LogData[] {
  let logs: LogData[] = [];

  for (let i = 0; i < logsCount; i++) {
    const logData: LogData = {
      Time: new Date(1655957386799),
      AdditionalContext: `additional logs context ${i}`,
    };
    logs.push(logData);
  }
  return logs;
}
/**
 * The data fields should match the column names exactly even with the
 * captilization in order for the data to show up in the logs
 */
export interface LogData {
  Time: Date;
  Computer?: string;
  AdditionalContext: string;
}
