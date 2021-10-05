// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPipelineRequest, PipelineRequest } from "@azure/core-rest-pipeline";
import { ServiceClient } from "@azure/core-client";
import { PerfStressTest, PerfStressOptionDictionary, drainStream } from "../src";
import { getCachedHttpsAgent } from "../src/utils";

interface ServiceClientGetOptions {
  "first-run-extra-requests": number;
  url: string;
}

export class ServiceClientGetTest extends PerfStressTest<ServiceClientGetOptions> {
  client: ServiceClient;
  request: PipelineRequest;
  firstRun: boolean = true;

  public options: PerfStressOptionDictionary<ServiceClientGetOptions> = {
    "first-run-extra-requests": {
      description:
        "Extra requests to send on first run.  " +
        "Simulates SDKs which require extra requests (like authentication) on first API call.",
      defaultValue: 0
    },
    url: {
      required: true,
      description: "URL to retrieve",
      shortName: "u",
      longName: "url"
    }
  };

  constructor() {
    super();

    const url = this.parsedOptions.url.value as string;
    const insecure = this.parsedOptions.insecure.value as boolean;

    this.client = this.configureClient(new ServiceClient());
    this.request = createPipelineRequest({
      allowInsecureConnection: true,
      streamResponseStatusCodes: new Set([200]),
      url: url
    });

    if (insecure && url.toLowerCase().startsWith("https:")) {
      this.request.agent = getCachedHttpsAgent(true);
    }
  }

  async runAsync(): Promise<void> {
    var response;

    if (this.firstRun) {
      const extraRequests = this.parsedOptions["first-run-extra-requests"].value as number;
      for (var i = 0; i < extraRequests; i++) {
        response = await this.client.sendRequest(this.request);
        await drainStream(response.readableStreamBody!);
      }
      this.firstRun = false;
    }

    response = await this.client.sendRequest(this.request);
    await drainStream(response.readableStreamBody!);
  }
}
