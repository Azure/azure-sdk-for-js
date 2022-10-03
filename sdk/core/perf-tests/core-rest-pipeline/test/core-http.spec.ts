// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClient, WebResource } from "@azure/core-http";
import { BaseHttpTest } from "./baseHttpTest";

export class CoreHTTPTest extends BaseHttpTest {
  client: ServiceClient;
  webResource!: WebResource;
  constructor() {
    super();
    this.client = new ServiceClient();
  }

  async globalSetup(): Promise<void> {
    await super.globalSetup();
    this.webResource = new WebResource(
      this.url,
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
