// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LogsIngestionClient } from "../../src/logsIngestionClient";
import { DefaultAzureCredential } from "@azure/identity";
import { assert } from "chai";
import * as dotenv from "dotenv";
import { AdditionalPolicyConfig } from "@azure/core-client";
dotenv.config();

function createClient(additionalPolicies?: AdditionalPolicyConfig[]) {
  const credential = new DefaultAzureCredential();
  return new LogsIngestionClient(
    process.env.LOGS_INGESTION_ENDPOINT || "logs_ingestion_endpoint",
    credential,
    {
      additionalPolicies
    }
  );
}

function createFailedPolicies(failedInterval: {isFailed: boolean}): AdditionalPolicyConfig[]{
  return [{
    policy: {
    name: "FakeDcrForTest",
    sendRequest: (req, next)=>{
      if(failedInterval.isFailed){
        req.url = req.url.replace(process.env.IMMUTABLE_ID!, "fake-id");
      }
      failedInterval.isFailed = !failedInterval.isFailed;
      return next(req);
    }
  },
  position: "perCall"
  }]
}

describe("LogsIngestionClient live tests", function () {
  let client: LogsIngestionClient;
  beforeEach(()=>{
    client = createClient();
  })
  it("sends basic data", async () => {
    const result = await client.upload(
      process.env.IMMUTABLE_ID || "immutable-id",
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
      process.env.IMMUTABLE_ID || "immutable-id",
      "Custom-MyTableRawData",
      getObjects(100000),
      {
        maxConcurrency: 5
      }
    );
    assert.equal(result.uploadStatus,"Success");
    assert.equal(result.errors.length,0);
  });

  it("Partial Fail Test - when dcr id is incorrect for alternate requests", async() => {
    const logData = getObjects(150000);
    client = createClient(createFailedPolicies({isFailed:false}));
    const result = await client.upload(
      process.env.IMMUTABLE_ID || "immutable-id",
      "Custom-MyTableRawData",
      logData,
      {
        maxConcurrency: 3
      }
    );
    assert.equal(result.uploadStatus,"PartialFailure");
    assert.equal(result.errors[0].responseError.message,`Data collection rule with immutable Id 'fake-id' not found.`);
    const chunkArray = client.splitDataToChunks(logData);
    if(chunkArray.length%2 == 0){
      assert.equal(result.errors.length,(chunkArray.length/2));
    }
    if(chunkArray.length%2 == 1){
      assert.equal(result.errors.length,(chunkArray.length-1)/2);
    }
    
  })

  it.only("Throws error when all logs fail", async ()=>{
    try{
      await client.upload(
        "immutable-id-123",
        "Custom-MyTableRawData",
        getObjects(1000),
        {
          maxConcurrency: 3
        }
      );
    }
    catch(e){
      
      assert.equal(((e as any).message.match("All logs failed for ingestion -")).index,0);
      // assert.equal((e as string).search("All logs failed for ingestion"),0);
      // assert.equal((e as any).message,"Data collection rule with immutable Id 'immutable-id-123' not found.")
    }
 
  })
});

export function getObjects(logsCount: Number): LogData[] {
  let logs: LogData[] = [];

  for (let i = 0; i < logsCount; i++) {
    const logData: LogData = {
      Time: new Date(),
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
