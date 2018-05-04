// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as assert from "assert";
import { WebResource } from "../lib/webResource";
import { MsRestUserAgentPolicy } from "../lib/policies/msRestUserAgentPolicy";
import { Constants } from "../lib/util/constants";
import { RequestPolicy, RequestPolicyOptions } from "../lib/policies/requestPolicy";
import { HttpOperationResponse } from "../lib/httpOperationResponse";
import { isNode } from "../lib/util/utils";

const should = require("should");
const userAgentHeader = Constants.HeaderConstants.USER_AGENT;

const emptyRequestPolicy: RequestPolicy = {
  sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    assert(request);
    throw new Error("Not Implemented");
  }
};

describe("ms-rest user agent filter (nodejs only)", () => {
  it("should construct user agent header when supplied empty array", function (done) {
    if (!isNode) {
      this.skip();
    }

    const userAgentArray: Array<string> = [];
    const userAgentFilter = new MsRestUserAgentPolicy(emptyRequestPolicy, new RequestPolicyOptions(), userAgentArray);
    const resource = new WebResource();
    resource.headers = {};
    userAgentFilter.addUserAgentHeader(resource);
    should.ok(resource);
    resource.headers[userAgentHeader].should.containEql("Node");
    resource.headers[userAgentHeader].should.containEql("Azure-SDK-For-Node");
    done();
  });

  it("should not modify user agent header if already present", function (done) {
    if (!isNode) {
      this.skip();
    }

    const genericRuntime = "ms-rest";
    const azureRuntime = "ms-rest-azure";
    const azureSDK = "Azure-SDK-For-Node";
    const userAgentArray = [`${genericRuntime}/v1.0.0`, `${azureRuntime}/v1.0.0`];
    const userAgentFilter = new MsRestUserAgentPolicy(emptyRequestPolicy, new RequestPolicyOptions(), userAgentArray);
    const customUA = "my custom user agent";
    const resource = new WebResource();
    resource.headers = {};
    resource.headers[userAgentHeader] = customUA;
    userAgentFilter.addUserAgentHeader(resource);
    should.ok(resource);
    const actualUA = resource.headers[userAgentHeader];
    actualUA.should.not.containEql("Node");
    actualUA.should.not.containEql(azureSDK);
    actualUA.should.not.containEql(azureRuntime);
    actualUA.should.containEql(customUA);
    done();
  });

  it("should insert azure-sdk-for-node at right position", function (done) {
    if (!isNode) {
      this.skip();
    }

    const genericRuntime = "ms-rest";
    const azureRuntime = "ms-rest-azure";
    const azureSDK = "Azure-SDK-For-Node";
    const userAgentArray = [`${genericRuntime}/v1.0.0`, `${azureRuntime}/v1.0.0`];
    const userAgentFilter = new MsRestUserAgentPolicy(emptyRequestPolicy, new RequestPolicyOptions(), userAgentArray);
    const resource = new WebResource();
    resource.headers = {};
    userAgentFilter.addUserAgentHeader(resource);
    should.ok(resource);
    const deconstructedUserAgent = resource.headers[userAgentHeader].split(" ");
    should.ok(deconstructedUserAgent);
    const indexOfAzureRuntime = deconstructedUserAgent.findIndex((e: string) => e.startsWith(azureRuntime));
    assert.notEqual(indexOfAzureRuntime, -1, `did not find ${azureRuntime} in user agent`);
    const indexOfAzureSDK = deconstructedUserAgent.indexOf(azureSDK);
    assert.notEqual(indexOfAzureSDK, -1, `did not find ${azureSDK} in user agent`);
    assert.equal(indexOfAzureSDK, 1 + indexOfAzureRuntime, `${azureSDK} is not in the right place in user agent string`);
    done();
  });
});
