// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RequestPolicy,
  RequestPolicyOptions,
  BaseRequestPolicy,
  WebResource,
  HttpOperationResponse,
  RequestPolicyFactory
} from "@azure/core-http";

const AcceptHeaderName = "Accept";
const AcceptHeaderValue = "application/json;odata.metadata=none";

/**
 * A policy factory for setting the Accept header to ignore odata metadata
 * @internal
 * @ignore
 */
export function odataMetadataPolicy(): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new OdataMetadataPolicy(nextPolicy, options);
    }
  };
}

class OdataMetadataPolicy extends BaseRequestPolicy {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    nextPolicy: RequestPolicy,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    options: RequestPolicyOptions
  ) {
    super(nextPolicy, options);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public async sendRequest(webResource: WebResource): Promise<HttpOperationResponse> {
    webResource.headers.set(AcceptHeaderName, AcceptHeaderValue);
    return this._nextPolicy.sendRequest(webResource);
  }
}
