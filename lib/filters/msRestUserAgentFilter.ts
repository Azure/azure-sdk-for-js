// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as os from "os";
import { HttpOperationResponse } from "../httpOperationResponse";
import { Constants } from "../util/constants";
import { isNode } from "../util/utils";
import { WebResource } from "../webResource";
import { BaseRequestPolicy } from "./requestPolicy";

const HeaderConstants = Constants.HeaderConstants;

// export function msRestUserAgentFilter(userAgentInfo: Array<string>): RequestPolicyCreator {
//   return (nextPolicy: RequestPolicy) => {
//     return new MsRestUserAgentFilter(userAgentInfo, nextPolicy);
//   };
// }

export class MsRestUserAgentFilter extends BaseRequestPolicy {

  userAgentInfo: Array<string>;

  constructor(userAgentInfo: Array<string>) {
    super();
    this.userAgentInfo = userAgentInfo;
  }

  tagRequest(request: WebResource): Promise<WebResource> {
    if (isNode) {
      const osInfo = `(${os.arch()}-${os.type()}-${os.release()})`;
      if (this.userAgentInfo.indexOf(osInfo) === -1) {
        this.userAgentInfo.unshift(osInfo);
      }

      const runtimeInfo = `Node/${process.version}`;
      if (this.userAgentInfo.indexOf(runtimeInfo) === -1) {
        this.userAgentInfo.unshift(runtimeInfo);
      }

      const nodeSDKSignature = `Azure-SDK-For-Node`;
      if (this.userAgentInfo.indexOf(nodeSDKSignature) === -1) {
        const azureRuntime = `ms-rest-azure`;

        let insertIndex = this.userAgentInfo.indexOf(azureRuntime);
        // insert after azureRuntime, otherwise, insert last.
        insertIndex = insertIndex < 0 ? this.userAgentInfo.length : insertIndex + 1;
        this.userAgentInfo.splice(insertIndex, 0, nodeSDKSignature);
      }
      if (!request.headers) request.headers = {};
      request.headers[HeaderConstants.USER_AGENT] = this.userAgentInfo.join(" ");
    }
    return Promise.resolve(request);
  }

  before(request: WebResource): Promise<WebResource> {
    const self = this;
    if (!request.headers) request.headers = {};
    if (!request.headers[HeaderConstants.USER_AGENT]) {
      return self.tagRequest(request);
    } else {
      return Promise.resolve(request);
    }
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    const nextRequest: WebResource = await this.before(request);
    return await this._nextPolicy!.sendRequest(nextRequest);
  }
}
