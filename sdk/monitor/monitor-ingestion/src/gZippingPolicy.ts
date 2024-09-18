// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PipelinePolicy } from "@azure/core-rest-pipeline";
import * as zlib from "zlib";
import { promisify } from "util";
const gzip = promisify(zlib.gzip);

/**
 * Name of the {@link gZippingPolicy}
 */
export const gZippingPolicyName = "GzippingPolicy";

export const GZippingPolicy: PipelinePolicy = {
  name: gZippingPolicyName,
  sendRequest: async (req, next) => {
    if (req.body) {
      const buffer = await gzipping(req.body);
      req.body = buffer;
    }
    return next(req);
  },
};

function gzipping(body: any): Promise<Buffer> {
  return gzip(body);
}
