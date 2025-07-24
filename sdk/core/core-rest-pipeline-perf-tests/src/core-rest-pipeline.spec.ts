// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createDefaultHttpClient, createPipelineRequest } from "@azure/core-rest-pipeline";
import { BaseHttpTest } from "./baseHttpTest.js";

export class CoreRestPipelineTest extends BaseHttpTest {
  client: HttpClient;
  request!: PipelineRequest;
  constructor() {
    super();
    this.client = createDefaultHttpClient();
  }

  async globalSetup(): Promise<void> {
    await super.globalSetup();
    this.request = createPipelineRequest({
      url: this.url,
      allowInsecureConnection: new URL(this.url).protocol !== "https:",
    });
  }

  async run(): Promise<void> {
    const response = await this.client.sendRequest(this.request);

    console.log(response.bodyAsText); // Hello World!
  }
}
