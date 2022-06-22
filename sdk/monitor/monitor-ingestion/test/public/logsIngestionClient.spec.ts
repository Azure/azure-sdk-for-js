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
  console.log("failed policy is called");
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
  it("does it work", async () => {
    const result = await client.upload(
      process.env.IMMUTABLE_ID || "immutable-id",
      "Custom-MyTableRawData",
      getObjects(2)
    );
    assert.equal(result.uploadStatus,"Success");
    assert.equal(result.errors.length,0);
  });

  it("divides huge data into chunks", async () => {
    const result = await client.upload(
      process.env.IMMUTABLE_ID || "immutable-id",
      "Custom-MyTableRawData",
      getObjects(100000),
      {
        maxConcurrency: 3
      }
    );
    assert.equal(result.uploadStatus,"Success");
    assert.equal(result.errors.length,0);
  });

  it.only("fails on - partialFailure test", async() => {
    client = createClient(createFailedPolicies({isFailed:false}));
    const result = await client.upload(
      process.env.IMMUTABLE_ID || "immutable-id",
      "Custom-MyTableRawData",
      getObjects(150000),
      {
        maxConcurrency: 2
      }
    );
    assert.equal(result.uploadStatus,"PartialFailure");
    console.log("result=");
    console.log(result);
    //assert.equal(result.errors.length,0);
  })
});

export function getObjects(logsCount: Number): LogData[] {
  let logs: LogData[] = [];

  for (let i = 0; i < logsCount; i++) {
    const logData: LogData = {
      time: new Date("2022-01-01T00:00:00+07:00"),
      extendedColumn: `test-${i}`,
      additionalContext: "additional logs context",
    };
    logs.push(logData);
  }
  return logs;
}

export function getObjectsWrong(logsCount: Number): Record<string,any>[] {
  let logs: Record<string,any>[] = [];

  for (let i = 0; i < logsCount; i++) {
    const logData = {
      extendedColumn: `test-${i}`,
      additionalContext: "additional logs context",
      randomness: ""
    };
    logs.push(logData);
  }
  return logs;
}
export interface LogData {
  time: Date;
  extendedColumn: string;
  additionalContext: string;
}
