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
        url.searchParams.append("api-version", options.apiVersion);
        req.url = url.toString();
      }

      return next(req);
    },
  };
}
