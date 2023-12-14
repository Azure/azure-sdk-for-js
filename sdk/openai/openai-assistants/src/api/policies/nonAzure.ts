// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { PipelinePolicy } from "@azure/core-rest-pipeline";

export function nonAzurePolicy(): PipelinePolicy {
  const policy: PipelinePolicy = {
    name: "openAiEndpoint",
    sendRequest: (request, next) => {
      const obj = new URL(request.url);
      request.headers.set("OpenAI-Beta", "assistants=v1");
      const parts = obj.pathname.split("/");
      switch (parts[parts.length - 1]) {
        case "threads":
          obj.pathname = `/v1/threads`;
          break;
        case "assistants":
          obj.pathname = `/v1/assistants`;
          break;
      }
      obj.searchParams.delete("api-version");
      request.url = obj.toString();
      return next(request);
    },
  };
  return policy;
}
