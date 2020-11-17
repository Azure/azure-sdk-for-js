// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { assert } from "chai";
import { Recorder } from "@azure/test-utils-recorder";

import { SparkClient } from "../src";
import { authenticate } from "./utils/testAuthentication";
import { getSparkpoolName } from "./utils/utils.common";
import {
  CreateSparkSessionOptions,
  GetSparkSessionOptions,
  ListSparkSessionsOptions,
  SparkSessionOptions
} from "../src";

describe("Synapse Spark Client - Spark Session", () => {
  let client: SparkClient;
  let recorder: Recorder;
  let sessionId: number;
  let sessionName: string = "testSession";

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("successfully create Spark Session", async function() {
    let sparkSession: SparkSessionOptions = {
      name: sessionName,
      executorCount: 2,
      driverCores: 4,
      driverMemory: "8g",
      executorCores: 4,
      executorMemory: "8g"
    };
    let options: CreateSparkSessionOptions = {
      detailed: true
    };

    let createResult = await client.createSparkSession(sparkSession, options);
    sessionId = createResult.id;
    assert.equal(
      createResult.name,
      sessionName,
      "Unexpected name of spark session by createSparkSession."
    );
    assert.equal(
      createResult.sparkPoolName,
      getSparkpoolName(),
      "Unexpected name of sparkpool by createSparkSession."
    );
  });

  it("successfully get Spark Session", async function() {
    let options: GetSparkSessionOptions = {
      detailed: true
    };
    let getResult = await client.getSparkSession(sessionId, options);
    assert.equal(
      getResult.name,
      sessionName,
      "Unexpected name of spark session by getSparkSession."
    );
    assert.equal(
      getResult.sparkPoolName,
      getSparkpoolName(),
      "Unexpected result of sparkpool by getSparkSession."
    );
  });

  it("successfully list Spark Session", async function() {
    let options: ListSparkSessionsOptions = {
      fromParam: sessionId - 1,
      size: 2,
      detailed: true
    };
    let listResult = await client.listSparkSessions(options);
    assert.equal(
      listResult.from,
      sessionId - 1,
      "Unexpected result of spark session by listSparkSession."
    );
  });
});
