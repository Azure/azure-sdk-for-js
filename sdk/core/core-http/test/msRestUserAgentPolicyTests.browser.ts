// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */

import "chai/register-should";

import { HttpOperationResponse } from "../src/httpOperationResponse";
import { RequestPolicy, RequestPolicyOptions } from "../src/policies/requestPolicy";
import { WebResource } from "../src/webResource";
import { userAgentPolicy } from "../src/policies/userAgentPolicy";

describe("MsRestUserAgentPolicy (browser)", () => {
  describe("for browser", function() {
    const userAgentHeaderKey = "x-ms-useragent";

    const emptyRequestPolicy: RequestPolicy = {
      sendRequest(request: WebResource): Promise<HttpOperationResponse> {
        request.should.exist;
        return Promise.resolve({ request: request, status: 200, headers: request.headers });
      }
    };

    const getUserAgent = async (headerValue?: string): Promise<string> => {
      const factory = userAgentPolicy({ value: headerValue });
      const policy = factory.create(emptyRequestPolicy, new RequestPolicyOptions());
      const resource = new WebResource();
      await policy.sendRequest(resource);
      const userAgent = resource.headers.get(userAgentHeaderKey);
      return userAgent!;
    };

    describe("MsRestUserAgentPolicy (Browser)", () => {
      it("should not modify user agent header if already present", async () => {
        const factory = userAgentPolicy();
        const browserUserAgentPolicy = factory.create(
          emptyRequestPolicy,
          new RequestPolicyOptions()
        );
        const customUserAgent = "my custom user agent";
        const resource = new WebResource();
        resource.headers.set(userAgentHeaderKey, customUserAgent);
        await browserUserAgentPolicy.sendRequest(resource);

        const userAgentHeader: string = resource.headers.get(userAgentHeaderKey)!;

        userAgentHeader.should.be.equal(customUserAgent);
      });

      it("should use injected user agent string if provided", async () => {
        const customUserAgent = "my custom user agent";
        const factory = userAgentPolicy({ value: customUserAgent });
        const browserUserAgentPolicy = factory.create(
          emptyRequestPolicy,
          new RequestPolicyOptions()
        );
        const resource = new WebResource();
        await browserUserAgentPolicy.sendRequest(resource);

        const userAgentHeader: string = resource.headers.get(userAgentHeaderKey)!;

        userAgentHeader.should.be.equal(customUserAgent);
      });

      it("should be space delimited and contain at least two fields", async () => {
        const userAgent = await getUserAgent();
        const userAgentParts = userAgent.split(" ");
        userAgentParts.length.should.be.greaterThan(1);
      });

      it("should contain runtime information", async () => {
        const userAgent = await getUserAgent();
        userAgent.should.match(/core-http\/[\d\w.-]+ .+/);
      });

      it("should have operating system information at the second place", async () => {
        const userAgent = await getUserAgent();
        const userAgentParts = userAgent.split(" ");
        const osInfo = userAgentParts[1];
        osInfo.should.match(/OS\/[\w\d.-]+/);
      });
    });
  });
});
