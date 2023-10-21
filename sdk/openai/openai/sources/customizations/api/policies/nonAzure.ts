// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
            obj.pathname = `v1/chat/completions`;
          } else {
            obj.pathname = `/v1/completions`;
          }
          break;
        case "embeddings":
          obj.pathname = `/v1/embeddings`;
          break;
        case "generations:submit":
          obj.pathname = `/v1/images/generations`;
          break;
        case "transcriptions":
          obj.pathname = `/v1/audio/transcriptions`;
          break;
        case "translations":
          obj.pathname = `/v1/audio/translations`;
          break;
      }
      obj.searchParams.delete("api-version");
      request.url = obj.toString();
      return next(request);
    },
  };
  return policy;
}
