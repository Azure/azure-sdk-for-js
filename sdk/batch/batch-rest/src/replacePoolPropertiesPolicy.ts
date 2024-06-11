// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "@azure/core-rest-pipeline";
// import { AzureLogger } from "@azure/logger";

/**
 * KLUGE: Create a new `PipelinePolicy` to add a empty list for the
 * `certificateReferences` property in the request body, as it's required
 * in our API and the cerficate related features are removed from our TypeSpec
 * and the generated code. In the future, this policy should be removed after
 * the Batch service side removes the requirement of this property.
 *
 */
export function createReplacePoolPropertiesPolicy(): PipelinePolicy {
  return {
    name: "ReplacePoolPropertiesPolicy",
    async sendRequest(request, next) {
      if (
        request.url.match(/\/pools\/[^/]+\/updateproperties/) &&
        request.method === "POST" &&
        request.body
      ) {
        try {
          const body = JSON.parse(request.body as string);
          body.certificateReferences = [];
          request.body = JSON.stringify(body);
          // console.log("matched", request.body);
        } catch (e) {
          // Ignore the error
        }
      }
      return next(request);
    },
  };
}
