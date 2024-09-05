// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";
import { isNode } from "@azure/core-util";
import { HeaderConstants, URLConstants } from "../utils/constants";
import { setURLParameter } from "../utils/utils.common";

/**
 * The programmatic identifier of the StorageBrowserPolicy.
 */
export const storageBrowserPolicyName = "storageBrowserPolicy";

/**
 * storageBrowserPolicy is a policy used to prevent browsers from caching requests
 * and to remove cookies and explicit content-length headers.
 */
export function storageBrowserPolicy(): PipelinePolicy {
  return {
    name: storageBrowserPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (isNode) {
        return next(request);
      }

      if (request.method === "GET" || request.method === "HEAD") {
        request.url = setURLParameter(
          request.url,
          URLConstants.Parameters.FORCE_BROWSER_NO_CACHE,
          new Date().getTime().toString(),
        );
      }

      request.headers.delete(HeaderConstants.COOKIE);

      // According to XHR standards, content-length should be fully controlled by browsers
      request.headers.delete(HeaderConstants.CONTENT_LENGTH);
      return next(request);
    },
  };
}
