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
    // This is a no-op for now, will be implementing gzipping for browser using pako https://github.com/Azure/azure-sdk-for-js/issues/22593
    return next(req);
  },
};
