// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../../lib/httpOperationResponse";
import { RequestPolicy, RequestPolicyOptions } from "../../lib/policies/requestPolicy";
import { Constants } from "../../lib/util/constants";
import { WebResource } from "../../lib/webResource";
import { userAgentPolicy } from "../../lib/policies/userAgentPolicy";
import { should } from "chai";

const userAgentHeaderKey = Constants.HeaderConstants.USER_AGENT;

const emptyRequestPolicy: RequestPolicy = {
  sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    should().exist(request);
    return Promise.resolve({ request: request, status: 200, headers: request.headers });
  }
};

const getPlainUserAgentPolicy = (headerValue?: string): RequestPolicy => {
  const factory = userAgentPolicy({ value: headerValue });
  return factory.create(emptyRequestPolicy, new RequestPolicyOptions());
};

const getUserAgent = async (headerValue?: string): Promise<string> => {
  const policy = getPlainUserAgentPolicy(headerValue);
  const resource = new WebResource();
  await policy.sendRequest(resource);
  const userAgent = resource.headers.get(userAgentHeaderKey);
  return userAgent!;
};

describe("MsRestUserAgentPolicy (NodeJS)", () => {
  it("should not modify user agent header if already present", async () => {
    const userAgentPolicy = getPlainUserAgentPolicy();
    const customUserAgent = "my custom user agent";
    const resource = new WebResource();
    resource.headers.set(userAgentHeaderKey, customUserAgent);
    await userAgentPolicy.sendRequest(resource);

    const userAgentHeader: string = resource.headers.get(userAgentHeaderKey)!;

    userAgentHeader.should.be.equal(customUserAgent);
  });

  it("should not set the user agent header if custom user agent is empty", async () => {
    const customUserAgent = "";
    const factory = userAgentPolicy({ value: customUserAgent });
    const nodeUserAgentPolicy = factory.create(emptyRequestPolicy, new RequestPolicyOptions());
    const resource = new WebResource();
    await nodeUserAgentPolicy.sendRequest(resource);

    const userAgentHeader: string = resource.headers.get(userAgentHeaderKey)!;

    (userAgentHeader === undefined).should.be.true;
  });

  it("should use injected user agent string if provided", async () => {
    const customUserAgent = "my custom user agent";
    const factory = userAgentPolicy({ value: customUserAgent });
    const nodeUserAgentPolicy = factory.create(emptyRequestPolicy, new RequestPolicyOptions());
    const resource = new WebResource();
    await nodeUserAgentPolicy.sendRequest(resource);

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
    userAgent.should.match(/ms-rest-js\/[\d\.]+ .+/);
  });

  it("should have operating system information at the third place", async () => {
    const userAgent = await getUserAgent();
    const userAgentParts = userAgent.split(" ");
    const osInfo = userAgentParts[2];
    osInfo.should.match(/OS\/\([\w\d\.\-]+\)/);
  });

  it("should have Node information at the second place", async () => {
    const userAgent = await getUserAgent();
    const userAgentParts = userAgent.split(" ");
    const osInfo = userAgentParts[1];
    osInfo.should.match(/Node\/v[\d.]+/);
  });
});
