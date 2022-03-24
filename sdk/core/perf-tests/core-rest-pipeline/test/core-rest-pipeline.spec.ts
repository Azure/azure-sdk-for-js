// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import {
  createDefaultHttpClient,
  HttpClient,
  createPipelineRequest,
  PipelineRequest,
} from "@azure/core-rest-pipeline";
import { PerfOptionDictionary, PerfTest } from "@azure/test-utils-perf";
import { TEST_SERVER_URL } from "./utils/server";

export class CoreRestPipelineTest extends PerfTest {
  options: PerfOptionDictionary<Record<string, unknown>> = {};
  client: HttpClient;
  request: PipelineRequest;
  constructor() {
    super();
    this.client = createDefaultHttpClient();
    this.request = createPipelineRequest({
      url: TEST_SERVER_URL,
      allowInsecureConnection: true
    });
  }

  async run(): Promise<void> {
    const response = await this.client.sendRequest(this.request);
    console.log(response.bodyAsText)
  }
}
