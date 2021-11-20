// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as url from "url";
import { PerfTest, PerfOptionDictionary, PerfPolicy } from "../src";
import {
  WebResource,
  HttpOperationResponse,
  HttpHeaders,
  RequestPolicyOptions
} from "@azure/core-http";

interface PerfPolicyOptions {
  url: string;
}

const defaultResponse = {
  status: 200,
  request: new WebResource(),
  headers: new HttpHeaders()
};

/**
 * Tests the behavior of the PerfPolicy.
 * Similar to the tests available in the core-http package of the default policies provided.
 */
export class PerfPolicyTest extends PerfTest<PerfPolicyOptions> {
  public options: PerfOptionDictionary<PerfPolicyOptions> = {
    url: {
      required: true,
      description: "URL that will replace any request's original targeted URL",
      shortName: "u"
    }
  };
  async run(): Promise<void> {
    const urlOption = this.parsedOptions.url.value;

    if (!urlOption) {
      throw new Error(`URL not specified`);
    }

    const targetUrl = url.parse(urlOption);
    const differentUrl = url.parse(urlOption);
    differentUrl.host = `not-${differentUrl.host}`;

    if (!targetUrl.host) {
      throw new Error("Input URL does not specify a host");
    }

    const request = new WebResource(url.format(differentUrl));

    const nextPolicy = {
      async sendRequest(requestToSend: WebResource): Promise<HttpOperationResponse> {
        const parsedRequestUrl = url.parse(request.url);
        const host = requestToSend.headers.get("host");

        if (host !== differentUrl.host) {
          throw new Error(
            `The header "host" should contain: ${host} instead of ${differentUrl.host}`
          );
        }

        if (parsedRequestUrl.host !== targetUrl.host) {
          throw new Error(`The header "host" should contain: ${host} instead of ${targetUrl.host}`);
        }

        return defaultResponse;
      }
    };

    const policy = new PerfPolicy(
      nextPolicy,
      new RequestPolicyOptions(),
      targetUrl.host,
      targetUrl.port
    );
    await policy.sendRequest(request);
  }
}
