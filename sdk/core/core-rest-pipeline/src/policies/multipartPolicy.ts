// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "../pipeline.js";

import {
  multipartPolicyName as tspMultipartPolicyName,
  multipartPolicy as tspMultipartPolicy,
} from "@typespec/ts-http-runtime/internal/policies";
import type {
  PipelineRequest as TspPipelineRequest,
  SendRequest as TspSendRequest,
} from "@typespec/ts-http-runtime";
import { getRawContent, getRawStreamFactory, hasRawContent } from "../util/file.js";
import { isNodeLike } from "@azure/core-util";
import type { BodyPart } from "../interfaces.js";

/**
 * Name of multipart policy
 */
export const multipartPolicyName = tspMultipartPolicyName;

/**
 * Pipeline policy for multipart requests
 */
export function multipartPolicy(): PipelinePolicy {
  const tspPolicy = tspMultipartPolicy();

  return {
    name: multipartPolicyName,
    sendRequest: async (request, next) => {
      if (request.multipartBody) {
        for (const part of request.multipartBody.parts) {
          if (hasRawContent(part.body)) {
            // Both stream types are supported by concat; the public type splits the factory union.
            part.body = ((isNodeLike ? getRawStreamFactory(part.body) : undefined) ??
              getRawContent(part.body)) as BodyPart["body"];
          }
        }
      }

      return tspPolicy.sendRequest(request as TspPipelineRequest, next as TspSendRequest);
    },
  };
}
