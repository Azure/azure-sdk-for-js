// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import {
  createHttpHeaders,
  createPipelineFromOptions,
  HttpClient,
} from "@azure/core-rest-pipeline";
import { PerfTest } from "@azure/test-utils-perf";

const shimHttpClient: HttpClient = {
  sendRequest: (request) =>
    Promise.resolve({
      headers: createHttpHeaders(),
      request,
      status: 200,
    }),
};

const pipeline = createPipelineFromOptions({});

export class PipelineThroughputTest extends PerfTest {
  options = {};

  async run() {
    await pipeline.sendRequest(shimHttpClient, {
      headers: createHttpHeaders(),
      method: "GET",
      requestId: "testId",
      timeout: 0,
      url: "https://fake.url/",
      withCredentials: false,
    });
  }
}
