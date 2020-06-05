// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "browser" section in package.json
 */
import { PipelineResponse } from "../interfaces";
import { PipelinePolicy } from "../pipeline";

const NotSupported = new Error(
  "DisableResponseDecompressionPolicy is not supported in browser environment"
);

export const disableResponseDecompressionPolicyName = "disableResponseDecompressionPolicy";

/**
 * disableResponseDecompressionPolicy is not supported in browser and attempting
 * to use it will results in error being thrown.
 */
export function disableResponseDecompressionPolicy(): PipelinePolicy {
  return {
    name: disableResponseDecompressionPolicyName,
    async sendRequest(): Promise<PipelineResponse> {
      throw NotSupported;
    }
  };
}
