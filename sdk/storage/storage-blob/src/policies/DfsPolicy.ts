// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import {
  BaseRequestPolicy,
  HttpOperationResponse,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource
} from "@azure/core-http";

import { Context, ContextAborter } from "../ContextAborter";
import {
  BLOB_SERVICE_PUBLIC_CLOUD_HOST,
  DFS_SERVICE_PUBLIC_CLOUD_HOST,
  REQUIRE_DFS_ENDPOINT_FLAG
} from "../utils/constants";
import { getURLHost, setURLHost } from "../utils/utils.common";

export const DfsContext: Context = {};
DfsContext[REQUIRE_DFS_ENDPOINT_FLAG] = true;

// Add more replacement patterns here
const ENDPOINT_REPLACEMENTS = [[BLOB_SERVICE_PUBLIC_CLOUD_HOST, DFS_SERVICE_PUBLIC_CLOUD_HOST]];

/**
 * DfsPolicy will replace blob endpoint into dfs endpoint for ADLS generation 2 inter-operation with blob.
 *
 * @class DfsPolicy
 * @extends {BaseRequestPolicy}
 */
export class DfsPolicy extends BaseRequestPolicy {
  /**
   * Creates an instance of DfsPolicy.
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @memberof DfsPolicy
   */
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  /**
   * Sends out request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   * @memberof DfsPolicy
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    if (
      request.abortSignal instanceof ContextAborter &&
      // DfsContext be default has REQUIRE_DFS_ENDPOINT_FLAG property
      request.abortSignal.context[REQUIRE_DFS_ENDPOINT_FLAG]
    ) {
      const host = getURLHost(request.url);
      if (typeof host === "string") {
        for (const replacement of ENDPOINT_REPLACEMENTS) {
          if (host.endsWith(replacement[0])) {
            const dfsHost = host.replace(replacement[0], replacement[1]);
            request.url = setURLHost(request.url, dfsHost);
            break;
          }
        }
      }
    }

    return this._nextPolicy.sendRequest(request);
  }
}
