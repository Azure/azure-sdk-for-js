// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPipelineRequest, PipelineRequest } from "@azure/core-rest-pipeline";
import { ServiceClient } from "@azure/core-client";
import { PerfTest, PerfOptionDictionary, drainStream } from "../src";
import { getCachedHttpsAgent } from "../src/utils";

interface ServiceClientGetOptions {
  "first-run-extra-requests": number;
  url: string;
}

export class ServiceClientGetTest extends PerfTest<ServiceClientGetOptions> {
  client: ServiceClient;
  request: PipelineRequest;
  firstRun = true;

  public options: PerfOptionDictionary<ServiceClientGetOptions> = {
    "first-run-extra-requests": {
      description:
        "Extra requests to send on first run.  " +
        "Simulates SDKs which require extra requests (like authentication) on first API call.",
      defaultValue: 0,
    },
    url: {
      required: true,
      description: "URL to retrieve",
      shortName: "u",
      longName: "url",
    },
  };

  constructor() {
    super();

    const url = this.parsedOptions.url.value;
    const insecure = this.parsedOptions.insecure.value;

    this.client = new ServiceClient(this.configureClientOptions({}));
    this.request = createPipelineRequest({
      allowInsecureConnection: true,
      streamResponseStatusCodes: new Set([200]),
      url: url,
    });

    if (insecure && url.toLowerCase().startsWith("https:")) {
      this.request.agent = getCachedHttpsAgent(true);
    }
  }

  async run(): Promise<void> {
    let response;

    if (this.firstRun) {
      const extraRequests = this.parsedOptions["first-run-extra-requests"].value as number;
      for (let i = 0; i < extraRequests; i++) {
        response = await this.client.sendRequest(this.request);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await drainStream(response.readableStreamBody!);
      }
      this.firstRun = false;
    }

    response = await this.client.sendRequest(this.request);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await drainStream(response.readableStreamBody!);
  }
}
