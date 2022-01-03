// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { URL, URLSearchParams } from "./utils/url";
import { SASCredential } from "@azure/core-auth";

/**
 * The programmatic identifier of the tablesSASTokenPolicy.
 */
export const tablesSASTokenPolicyName = "tablesSASTokenPolicy";

/**
 * tablesSASTokenPolicy is a policy used to sign HTTP request with a shared key.
 */
export function tablesSASTokenPolicy(credential: SASCredential): PipelinePolicy {
  return {
    name: tablesSASTokenPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      signURLWithSAS(request, credential);
      return next(request);
    },
  };
}

export function signURLWithSAS(request: PipelineRequest, credential: SASCredential): void {
  const sasParams = new URLSearchParams(credential.signature);
  const url = new URL(request.url);

  for (const [name, value] of sasParams) {
    url.searchParams.append(name, value);
  }
  request.url = url.toString();
}
