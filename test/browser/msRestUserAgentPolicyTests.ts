// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../../lib/httpOperationResponse";
import { RequestPolicy, RequestPolicyOptions } from "../../lib/policies/requestPolicy";
import { WebResource } from "../../lib/webResource";
import { userAgentPolicy } from "../../lib/policies/userAgentPolicy";

const userAgentHeaderKey = "x-ms-command-name";

const emptyRequestPolicy: RequestPolicy = {
  sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    request.should.be.ok;
    return Promise.resolve({ request: request, status: 200, headers: request.headers });
  }
};

const getUserAgent = async (headerValue?: string): Promise<string> => {
  const factory = userAgentPolicy({ value: headerValue});
  const policy = factory.create(emptyRequestPolicy, new RequestPolicyOptions());
  const resource = new WebResource();
  await policy.sendRequest(resource);
  const userAgent = resource.headers.get(userAgentHeaderKey);
  return userAgent!;
};

describe("MsRestUserAgentPolicy (Browser)", () => {
  it("should not modify user agent header if already present", async () => {
    const factory = userAgentPolicy();
    const browserUserAgentPolicy = factory.create(emptyRequestPolicy, new RequestPolicyOptions());
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
    const browserUserAgentPolicy = factory.create(emptyRequestPolicy, new RequestPolicyOptions());
    const resource = new WebResource();
    await browserUserAgentPolicy.sendRequest(resource);

    const userAgentHeader: string = resource.headers.get(userAgentHeaderKey)!;

    userAgentHeader.should.be.equal(customUserAgent);
  });

  it("should be space delimited and contain three fields", async () => {
    const userAgent = await getUserAgent();
    const userAgentParts = userAgent.split(" ");
    userAgentParts.length.should.be.equal(3);
  });

  it("should contain runtime information", async () => {
    const userAgent = await getUserAgent();
    userAgent.should.match(/azure-sdk-for-js ms-rest-js\/[\d\.]+ .+/);
  });

  it("should have operating system information at the third place", async () => {
    const userAgent = await getUserAgent();
    const userAgentParts = userAgent.split(" ");
    const osInfo = userAgentParts[2];
    osInfo.should.match(/OS\/[\w\d\.\-]+/);
  });
});
