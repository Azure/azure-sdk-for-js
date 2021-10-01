// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPipelineRequest, PipelineRequest } from "@azure/core-rest-pipeline";
import { ServiceClient } from "@azure/core-client";
import { PerfStressTest, PerfStressOptionDictionary, drainStream } from "../src";
import { getCachedHttpsAgent } from "../src/utils";

interface ServiceClientGetOptions {
    url: string;
}

export class ServiceClientGetTest extends PerfStressTest<ServiceClientGetOptions> {
  client: ServiceClient;
  request: PipelineRequest;

  public options: PerfStressOptionDictionary<ServiceClientGetOptions> = {
    url: {
      required: true,
      description: "Required option",
      shortName: "u",
      longName: "url"
    }
  };

  constructor() {
    super();
    this.client = this.configureClient(new ServiceClient());
    this.request = createPipelineRequest({
      allowInsecureConnection: true,
      streamResponseStatusCodes: new Set([200]),
      url: this.parsedOptions.url.value as string
    });
    this.request.agent = getCachedHttpsAgent(this.parsedOptions.insecure.value as boolean);
  }

  async runAsync(): Promise<void> {
    const response = await this.client.sendRequest(this.request);
    await drainStream(response.readableStreamBody!);
  }
}