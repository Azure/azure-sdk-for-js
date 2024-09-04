// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PipelinePolicy } from "@azure/core-rest-pipeline";
import pako from "pako";
/**
 * Name of the {@link gZippingPolicy}
 */
export const gZippingPolicyName = "GzippingPolicy";

export const GZippingPolicy: PipelinePolicy = {
  name: gZippingPolicyName,
  sendRequest: async (req, next) => {
    if (req.body) {
      const buffer = pako.gzip(String(req.body));
      req.body = buffer;
    }
    return next(req);
  },
};
