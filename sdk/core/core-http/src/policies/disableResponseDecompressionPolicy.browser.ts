// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * NOTE: When moving this file, please update "browser" section in package.json
 */
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";

const errorMessage = "DisableResponseDecompressionPolicy is not supported in browser environment";

/**
 * {@link DisableResponseDecompressionPolicy} is not supported in browser and attempting
 * to use it will results in error being thrown.
 */
export function disableResponseDecompressionPolicy(): RequestPolicyFactory {
  return {
    create: (_nextPolicy: RequestPolicy, _options: RequestPolicyOptions) => {
      throw new Error(errorMessage);
    },
  };
}

export class DisableResponseDecompressionPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
    throw new Error(errorMessage);
  }

  public async sendRequest(_request: WebResource): Promise<HttpOperationResponse> {
    throw new Error(errorMessage);
  }
}
