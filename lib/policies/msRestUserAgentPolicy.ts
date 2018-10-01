// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as os from "os";
import { HttpHeaders } from "../httpHeaders";
import { HttpOperationResponse } from "../httpOperationResponse";
import { Constants } from "../util/constants";
import { isNode } from "../util/utils";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "./requestPolicy";

const HeaderConstants = Constants.HeaderConstants;

export function msRestUserAgentPolicy(userAgentInfo: Array<string>): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new MsRestUserAgentPolicy(nextPolicy, options, userAgentInfo);
    }
  };
}

export class MsRestUserAgentPolicy extends BaseRequestPolicy {

  userAgentInfo: Array<string>;

  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, userAgentInfo: Array<string>) {
    super(nextPolicy, options);
    this.userAgentInfo = userAgentInfo;
  }

  tagRequest(request: WebResource): void {
    if (isNode) {
      const osInfo = `(${os.arch()}-${os.type()}-${os.release()})`;
      if (this.userAgentInfo.indexOf(osInfo) === -1) {
        this.userAgentInfo.unshift(osInfo);
      }

      const runtimeInfo = `Node/${process.version}`;
      if (this.userAgentInfo.indexOf(runtimeInfo) === -1) {
        this.userAgentInfo.unshift(runtimeInfo);
      }

      const nodeSDKSignature = `azure-sdk-for-js`;
      if (this.userAgentInfo.indexOf(nodeSDKSignature) === -1) {
        const azureRuntime = `ms-rest-azure-js`;

        let insertIndex = this.userAgentInfo.indexOf(azureRuntime);
        // insert after azureRuntime, otherwise, insert last.
        insertIndex = insertIndex < 0 ? this.userAgentInfo.length : insertIndex + 1;
        this.userAgentInfo.splice(insertIndex, 0, nodeSDKSignature);
      }
      if (!request.headers) {
        request.headers = new HttpHeaders();
      }
      request.headers.set(HeaderConstants.USER_AGENT, this.userAgentInfo.join(" "));
    }
  }

  addUserAgentHeader(request: WebResource): void {
    if (!request.headers) {
      request.headers = new HttpHeaders();
    }
    if (!request.headers.get(HeaderConstants.USER_AGENT)) {
      this.tagRequest(request);
    }
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    this.addUserAgentHeader(request);
    return this._nextPolicy.sendRequest(request);
  }
}
