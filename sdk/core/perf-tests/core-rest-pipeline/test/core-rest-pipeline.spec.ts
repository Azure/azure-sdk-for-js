// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import {
  createDefaultHttpClient,
  HttpClient,
  createPipelineRequest,
  PipelineRequest,
} from "@azure/core-rest-pipeline";
import { BaseHttpTest } from "./baseHttpTest";

export class CoreRestPipelineTest extends BaseHttpTest {
  client: HttpClient;
  request: PipelineRequest;
  constructor() {
    super();
    this.client = createDefaultHttpClient();
    this.request = createPipelineRequest({
      url: this.url,
      allowInsecureConnection: true
    });
  }

  async run(): Promise<void> {
    const response = await this.client.sendRequest(this.request);
    response.bodyAsText; // Hello World!
  }
}
