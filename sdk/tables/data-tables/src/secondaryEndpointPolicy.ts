// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type { PipelinePolicy } from "@azure/core-rest-pipeline";

/**
 * The programmatic identifier of the tablesSecondaryEndpointPolicy.
 */
export const tablesSecondaryEndpointPolicyName = "tablesSecondaryEndpointPolicy";
export const SecondaryLocationHeaderName = "tables-secondary-endpoint";
const SecondaryLocationAccountSuffix = "-secondary";

/**
 * Policy that would replace the Primary Endpoint with the secondary endpoint
 * when the `tables-secondary-endpoint` is set in the request
 */
export const tablesSecondaryEndpointPolicy: PipelinePolicy = {
  name: tablesSecondaryEndpointPolicyName,
  sendRequest: async (req, next) => {
    // Only replace the URL if the SecondaryLocationHeader is set
    if (req.headers.get(SecondaryLocationHeaderName)) {
      // Since the header is for internal use only, clean it up.
      req.headers.delete(SecondaryLocationHeaderName);
      // Calculate and update the secondary url
      req.url = getSecondaryUrlFromPrimary(req.url);
    }

    return next(req);
  },
};

/**
 * Utility function that injects the SecondaryEndpointHeader into an operation options
 */
export function injectSecondaryEndpointHeader(options: OperationOptions): OperationOptions {
  const headerToInject = { [SecondaryLocationHeaderName]: "true" };
  return {
    ...options,
    requestOptions: {
      ...options.requestOptions,
      customHeaders: {
        ...options.requestOptions?.customHeaders,
        ...headerToInject,
      },
    },
  };
}

/**
 * Utility function that calculates the secondary URL for a table instance given the primary URL.
 */
function getSecondaryUrlFromPrimary(primaryUrl: string): string {
  const parsedUrl = new URL(primaryUrl);
  const hostParts = parsedUrl.hostname.split(".");
  if (hostParts.length > 1) {
    hostParts[0] = `${hostParts[0]}${SecondaryLocationAccountSuffix}`;
  }
  const secondaryHostname = hostParts.join(".");

  // Replace hostname in the URL string (URL properties are readonly in some environments)
  return primaryUrl.replace(parsedUrl.hostname, secondaryHostname);
}
