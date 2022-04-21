// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClient, WebResource } from "@azure/core-http";
import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { BaseHttpTest } from "./baseHttpTest";
import { TEST_SERVER_URL } from "./utils/serverUrl";

export class CoreHTTPTest extends BaseHttpTest {
  options: PerfOptionDictionary<Record<string, unknown>> = {};
  client: ServiceClient;
  webResource: WebResource;
  constructor() {
    super();
    this.client = new ServiceClient();
    this.webResource = new WebResource(
      TEST_SERVER_URL,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true // keepAlive
    );
  }

  async run(): Promise<void> {
    const response = await this.client.sendRequest(this.webResource);
    response.bodyAsText; // Hello world!
  }
}
