// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "../pipeline";
import { TlsSettings } from "../interfaces";

/**
 * Name of the TLS Policy
 */
export const tlsPolicyName = "tlsPolicy";

/**
 * Gets a pipeline policy that adds the client certificate to the HttpClient agent for authentication.
 */
export function tlsPolicy(tlsSettings?: TlsSettings): PipelinePolicy {
  return {
    name: tlsPolicyName,
    sendRequest: async (req, next) => {
      // Users may define a request tlsSettings, honor those over the client level one
      if (!req.tlsSettings) {
        req.tlsSettings = tlsSettings;
      }
      return next(req);
    },
  };
}
