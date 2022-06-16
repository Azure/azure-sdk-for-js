// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "@azure/core-rest-pipeline";
import * as zlib from "zlib";

/**
 * Name of the {@link gZippingPolicy}
 */
export const gZippingPolicyName = "GzippingPolicy";

export const GZippingPolicy: PipelinePolicy = {
  name: gZippingPolicyName,
  sendRequest: async (req, next) => {
    if (req.body) {
      zlib.gzip(req.body.toString(), (err, buffer) => {
        if (!err) {
          req.body = buffer.toString();
        } else {
          console.log(err);
        }
      });
    }
    return next(req);
  },
};
