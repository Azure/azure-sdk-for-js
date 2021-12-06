// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  createHttpHeaders,
  createPipelineRequest
} from "@azure/core-rest-pipeline";
import {
  HeaderConstants,
  TRANSACTION_HTTP_LINE_ENDING,
  TRANSACTION_HTTP_VERSION_1_1
} from "./utils/constants";
import { getChangeSetBoundary } from "./utils/transactionHelpers";
import { URL } from "./utils/url";

export const transactionRequestAssemblePolicyName = "transactionRequestAssemblePolicy";

const dummyResponse: PipelineResponse = {
  request: createPipelineRequest({ url: "FAKE" }),
  status: 200,
  headers: createHttpHeaders()
};

export function transactionRequestAssemblePolicy(
  bodyParts: string[],
  changesetId: string
): PipelinePolicy {
  return {
    name: transactionRequestAssemblePolicyName,
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      const subRequest = getNextSubrequestBodyPart(request, changesetId);
      bodyParts.push(subRequest);
      // Intercept request from going to wire
      return dummyResponse;
    }
  };
}

export const transactionHeaderFilterPolicyName = "transactionHeaderFilterPolicy";

export function transactionHeaderFilterPolicy(): PipelinePolicy {
  return {
    name: transactionHeaderFilterPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      // The subrequests should not have the x-ms-version header.
      request.headers.delete(HeaderConstants.X_MS_VERSION);
      return next(request);
    }
  };
}

function getSubRequestUrl(url: string): string {
  const sasTokenParts = ["sv", "ss", "srt", "sp", "se", "st", "spr", "sig"];
  const urlParsed = new URL(url);
  sasTokenParts.forEach((part) => urlParsed.searchParams.delete(part));
  return urlParsed.toString();
}

function getNextSubrequestBodyPart(request: PipelineRequest, changesetId: string) {
  const changesetBoundary = getChangeSetBoundary(changesetId);
  const subRequestPrefix = `--${changesetBoundary}${TRANSACTION_HTTP_LINE_ENDING}${HeaderConstants.CONTENT_TYPE}: application/http${TRANSACTION_HTTP_LINE_ENDING}${HeaderConstants.CONTENT_TRANSFER_ENCODING}: binary`;

  const subRequestUrl = getSubRequestUrl(request.url);
  // Start to assemble sub request
  const subRequest = [
    subRequestPrefix, // sub request constant prefix
    "", // empty line after sub request's content ID
    `${request.method.toString()} ${subRequestUrl} ${TRANSACTION_HTTP_VERSION_1_1}` // sub request start line with method,
  ];

  // Add required headers
  for (const [name, value] of request.headers) {
    subRequest.push(`${name}: ${value}`);
  }

  // Append sub-request body
  subRequest.push(`${TRANSACTION_HTTP_LINE_ENDING}`); // sub request's headers need end with an empty line
  if (request.body) {
    subRequest.push(String(request.body));
  }

  // Add subrequest to transaction body
  return subRequest.join(TRANSACTION_HTTP_LINE_ENDING);
}
