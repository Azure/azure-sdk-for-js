// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "@azure/core-rest-pipeline";

const cosmosPatchPolicyName = "cosmosPatchPolicy";

export function cosmosPatchPolicy(): PipelinePolicy {
  return {
    name: cosmosPatchPolicyName,
    sendRequest: (request, next) => {
      if (request.method === "PATCH") {
        request.method = "POST";
        request.headers.set("X-HTTP-Method", "MERGE");
      }

      return next(request);
    },
  };
}
