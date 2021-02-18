// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-https";
import { PipelineResponse, PipelineRequest, SendRequest, PipelinePolicy } from "@azure/core-https";

/**
 * The programmatic identifier of the storageBrowserPolicy.
 */
export const storageBrowserPolicyName = "storageBrowserPolicy";

import { HeaderConstants, URLConstants } from "../utils/constants";
import { setURLParameter } from "../utils/utils.common";

export function storageBrowserPolicy(): PipelinePolicy {
  return {
    name: storageBrowserPolicyName,
    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (isNode) {
        return next(request);
      }

      if (request.method.toUpperCase() === "GET" || request.method.toUpperCase() === "HEAD") {
        request.url = setURLParameter(
          request.url,
          URLConstants.Parameters.FORCE_BROWSER_NO_CACHE,
          new Date().getTime().toString()
        );
      }

      request.headers.delete(HeaderConstants.COOKIE);

      // According to XHR standards, content-length should be fully controlled by browsers
      request.headers.delete(HeaderConstants.CONTENT_LENGTH);

      return next(request);
    }
  };
}
