// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { PipelinePolicy } from "@azure/core-rest-pipeline";

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
  const parsedPrimaryUrl = new URL(primaryUrl);
  const host = parsedPrimaryUrl.hostname.split(".");
  if (host.length > 1) {
    host[0] = `${host[0]}${SecondaryLocationAccountSuffix}`;
  }
  parsedPrimaryUrl.hostname = host.join(".");

  return parsedPrimaryUrl.toString();
}
