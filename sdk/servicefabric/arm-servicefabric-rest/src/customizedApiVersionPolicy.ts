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
        // add or replace the existing api-version with client one
        url.searchParams.set("api-version", options.apiVersion);
        req.url = url.toString();
      }

      return next(req);
    },
  };
}
