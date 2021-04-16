// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, PipelineResponse, SendRequest } from "@azure/core-rest-pipeline";
import { isPlaybackMode } from "@azure/test-utils-recorder";

export interface SanitizationOptions {
  headerNames: string[];
  searchParamNames: string[];
  bodySanitizers: Array<(content: string) => string>;
}

export const sanitizationPolicyName: string = "sanitizationPolicy";

export function sanitizationPolicyV2(sanitizationOptions?: SanitizationOptions) {
  return {
    name: sanitizationPolicyName,

    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (sanitizationOptions && isPlaybackMode()) {
        for (const headerName of sanitizationOptions.headerNames) {
          if (request.headers.get(headerName)) {
            request.headers.set(headerName, "SANITIZED");
          }
        }
        for (const _searchParam of sanitizationOptions.searchParamNames) {
          // TODO: sanitize
        }
        // only support string
        if (typeof request.body === "string") {
          let sanitizedBody = request.body;
          for (const bodySanitizers of sanitizationOptions.bodySanitizers) {
            sanitizedBody = bodySanitizers(sanitizedBody);
          }
          request.body = sanitizedBody;
        }
      }

      return next(request);
    }
  };
}
