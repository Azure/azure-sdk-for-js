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
      const buffer = await gzip(req.body);
      req.body = buffer;
    }
    return next(req);
  },
};

function gzip(body: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    zlib.gzip(body, (err, buffer) => {
      if (!err) {
        resolve(buffer);
      } else {
        reject(new Error(`Error doing gzipping - ${err}`));
      }
    });
  });
}
