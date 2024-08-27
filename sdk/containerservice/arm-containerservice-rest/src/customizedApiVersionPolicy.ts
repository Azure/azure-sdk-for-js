// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientOptions } from "@azure-rest/core-client";
import { PipelinePolicy } from "@azure/core-rest-pipeline";

export const apiVersionPolicyName = "CustomizedApiVersionPolicy";

/**
 * Creates a policy that sets the apiVersion as a query parameter on every request
 * @param options - Client options
 * @returns Pipeline policy that sets the apiVersion as a query parameter on every request
 */
export function customizedApiVersionPolicy(options: ClientOptions): PipelinePolicy {
  return {
    name: apiVersionPolicyName,
    sendRequest: (req, next) => {
      if (options.apiVersion) {
        const url = new URL(req.url);
        // if there is no api-version we'll append client one
        // otherwise we'll keep api-version returned by service
        if (!url.searchParams.has("api-version")) {
          url.searchParams.append("api-version", options.apiVersion);
        }
        req.url = url.toString();
      }

      return next(req);
    },
  };
}
