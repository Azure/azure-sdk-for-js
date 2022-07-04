// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "@azure/core-rest-pipeline";
import { ClientOptions } from "./common";

export const apiVersionPolicyName = "ApiVersionPolicy";

/**
 * Creates a policy that sets the apiVersion as a query parameter on every request
 * @param options - Client options
 * @returns Pipeline policy that sets the apiVersion as a query parameter on every request
 */
export function apiVersionPolicy(options: ClientOptions): PipelinePolicy {
  return {
    name: apiVersionPolicyName,
    sendRequest: (req, next) => {
      if (options.apiVersion) {
        const url = new URL(req.url);
        // Do not append customized api-version if url already has one e.g LRO/paging URL returned by the service
        if (!url.searchParams.has("api-version")) {
          url.searchParams.append("api-version", options.apiVersion);
        }
        req.url = url.toString();
      }

      return next(req);
    },
  };
}
