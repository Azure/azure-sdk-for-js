// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TLSSettings } from "../interfaces";
import { PipelinePolicy } from "../pipeline";

/**
 * Name of the TLS Policy
 */
export const tlsPolicyName = "tlsPolicy";

/**
 * Gets a pipeline policy that adds the client certificate to the HttpClient agent for authentication.
 */
export function tlsPolicy(tlsSettings?: TLSSettings): PipelinePolicy {
  return {
    name: tlsPolicyName,
    sendRequest: async (req, next) => {
      req.tlsSettings = tlsSettings;
      return next(req);
    },
  };
}
