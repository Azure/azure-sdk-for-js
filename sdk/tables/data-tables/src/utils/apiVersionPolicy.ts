// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "@azure/core-rest-pipeline";

/**
 * Name of the apiVersion Policy
 * @internal
 */
export const apiVersionPolicyName = "apiVersionPolicy";

/**
 * Pipeline policy that enables users to override the default api version
 * @internal
 */
export const apiVersionPolicy: (apiVersion: string) => PipelinePolicy = (apiVersion: string) => {
  return {
    name: apiVersionPolicyName,
    sendRequest: async (req, next) => {
      req.headers.set("x-ms-version", apiVersion);
      return next(req);
    },
  };
};
