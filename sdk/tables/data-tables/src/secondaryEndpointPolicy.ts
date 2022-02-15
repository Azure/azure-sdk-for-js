// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "@azure/core-rest-pipeline";

/**
 * The programmatic identifier of the tablesNamedKeyCredentialPolicy.
 */
export const tablesSecondaryEndpointPolicyName = "tablesSecondaryEndpointPolicy";
export const SecondaryLocationHeaderName = "tables-secondary-endpoint";
const SecondaryLocationAccountSuffix = "-secondary";

export const tablesSecondaryEndpointPolicy: PipelinePolicy = {
  name: tablesSecondaryEndpointPolicyName,
  sendRequest: async (req, next) => {
    if (req.headers.get(SecondaryLocationHeaderName)) {
      req.headers.delete(SecondaryLocationHeaderName);
      req.url = getSecondaryUrlFromPrimary(req.url);
    }

    return next(req);
  },
};

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
