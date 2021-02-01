// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RequestPolicy,
  RequestPolicyOptions,
  BaseRequestPolicy,
  WebResourceLike,
  HttpOperationResponse,
  RequestPolicyFactory,
  RequestPolicyOptionsLike
} from "@azure/core-http";

const AcceptHeaderName = "Accept";

export type MetadataLevel = "none" | "minimal";

/**
 * A policy factory for setting the Accept header to ignore odata metadata
 * @internal
 */
export function odataMetadataPolicy(metadataLevel: MetadataLevel): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new OdataMetadataPolicy(nextPolicy, options, { metadataLevel });
    }
  };
}

class OdataMetadataPolicy extends BaseRequestPolicy {
  private metadataLevel: MetadataLevel;

  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptionsLike,
    policyOptions: { metadataLevel: MetadataLevel }
  ) {
    super(nextPolicy, options);
    this.metadataLevel = policyOptions.metadataLevel;
  }

  public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
    webResource.headers.set(
      AcceptHeaderName,
      `application/json;odata.metadata=${this.metadataLevel}`
    );
    return this._nextPolicy.sendRequest(webResource);
  }
}
