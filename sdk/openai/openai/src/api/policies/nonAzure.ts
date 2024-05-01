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
      const parts = obj.pathname.split("/");
      switch (parts[parts.length - 1]) {
        case "completions":
          if (parts[parts.length - 2] === "chat") {
            obj.pathname = `${parts[1]}/chat/completions`;
          } else {
            obj.pathname = `${parts[1]}/completions`;
          }
          break;
        case "embeddings":
          obj.pathname = `${parts[1]}/embeddings`;
          break;
        case "generations":
          if (parts[parts.length - 2] === "images") {
            obj.pathname = `${parts[1]}/images/generations`;
          } else {
            throw new Error("Unexpected path");
          }
          break;
        case "transcriptions":
          obj.pathname = `${parts[1]}/audio/transcriptions`;
          break;
        case "translations":
          obj.pathname = `${parts[1]}/audio/translations`;
          break;
      }
      obj.searchParams.delete("api-version");
      request.url = obj.toString();
      return next(request);
    },
  };
  return policy;
}
