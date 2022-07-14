// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "@azure/core-rest-pipeline";

/**
 * Name of the {@link gZippingPolicy}
 */
export const gZippingPolicyName = "GzippingPolicyForBrowser";

export const GZippingPolicy: PipelinePolicy = {
  name: gZippingPolicyName,
  sendRequest: async (req, next) => {
    return next(req);
  },
};
