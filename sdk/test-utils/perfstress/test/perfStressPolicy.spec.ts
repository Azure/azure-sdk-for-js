// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as url from "url";
import { PerfStressTest, PerfStressOptionDictionary, PerfStressPolicy } from "../src";
import {
  WebResource,
  HttpOperationResponse,
  HttpHeaders,
  RequestPolicyOptions
} from "@azure/core-http";

type OptionNames = "url";

const defaultResponse = {
  status: 200,
  request: new WebResource(),
  headers: new HttpHeaders()
};

/**
 * Tests the behavior of the PerfStressPolicy.
 * Similar to the tests available in the core-http package of the default policies provided.
 */
export class PerfStressPolicyTest extends PerfStressTest<OptionNames> {
  public options: PerfStressOptionDictionary<OptionNames> = {
    url: {
      required: true,
      description: "URL that will replace any request's original targeted URL",
      shortName: "u"
    }
  };
  async runAsync(): Promise<void> {
    const targetUrl = url.parse(this.options.url.value! as string);
    const differentUrl = url.parse(this.options.url.value! as string);
    differentUrl.host = `not-${differentUrl.host}`;

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

    const policy = new PerfStressPolicy(
      nextPolicy,
      new RequestPolicyOptions(),
      targetUrl.host!,
      targetUrl.port
    );
    await policy.sendRequest(request);
  }
}
