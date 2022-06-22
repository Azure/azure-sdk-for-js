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
      console.log("going to await gzip function");
      const buffer = await gzip(JSON.stringify(req.body));
      req.body = buffer.toString();
      console.log("inside sendrequest of gzip policy ->");
      console.log(req.body);
    }
    return next(req);
  },
};

function gzip(body: string): Promise<Buffer> {
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
