// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import {
  createDefaultHttpClient,
  HttpClient,
  createPipelineRequest,
  PipelineRequest,
} from "@azure/core-rest-pipeline";
import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { BaseHttpTest } from "./baseHttpTest";
import { TEST_SERVER_URL } from "./utils/serverUrl";

export class CoreRestPipelineTest extends BaseHttpTest {
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
    response.bodyAsText; // Hello World!
  }
}
