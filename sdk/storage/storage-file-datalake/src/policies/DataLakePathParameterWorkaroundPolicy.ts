// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";

/**
 * The programmatic identifier of the dataLakePathParameterWorkaroundPolicy.
 */
export const dataLakePathParameterWorkaroundPolicyName = "dataLakePathParameterWorkaroundPolicy";

/**
 * dataLakePathParameterWorkaroundPolicy works around a generator issue with path parameters being
 * left in the URL.
 */
export function dataLakePathParameterWorkaroundPolicy(): PipelinePolicy {
  return {
    name: dataLakePathParameterWorkaroundPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (request.headers.has("Content-Length") && request.headers.get("Content-Length") === "0" && request.body === undefined) {
        request.body = "";
      }
      if (request.url.includes("/%7Bfilesystem%7D/%7Bpath%7D")) {
        request.url = request.url.replace("/%7Bfilesystem%7D/%7Bpath%7D", "");
        // special case: sometimes we concatenate the path from the operation spec (/{filesystem}/{path})
        // but when we remove it, we don't want to remove the trailing slash from the URL
        // since it is important when referencing the root directory.
        const parsedUrl = new URL(request.url);
        if (parsedUrl.pathname.lastIndexOf("/") === 0) {
          parsedUrl.pathname = parsedUrl.pathname + "/";
          request.url = parsedUrl.toString();
        }
      } else if (request.url.includes("/%7Bfilesystem%7D")) {
        request.url = request.url.replace("/%7Bfilesystem%7D", "");
      }
      return next(request);
    },
  };
}
