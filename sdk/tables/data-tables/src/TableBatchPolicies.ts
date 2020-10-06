// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  WebResourceLike,
  HttpOperationResponse,
  RequestPolicyFactory,
  WebResource,
  HttpHeaders
} from "@azure/core-http";
import { HeaderConstants } from "./utils/constants";
import { InnerBatchRequest } from "./utils/internalModels";

class BatchHeaderFilterPolicy extends BaseRequestPolicy {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }
  public async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    request.headers.remove(HeaderConstants.X_MS_VERSION); // The subrequests should not have the x-ms-version header.
    return this._nextPolicy.sendRequest(request);
  }
}

export class BatchHeaderFilterPolicyFactory implements RequestPolicyFactory {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): BaseRequestPolicy {
    return new BatchHeaderFilterPolicy(nextPolicy, options);
  }
}

class BatchRequestAssemblePolicy extends BaseRequestPolicy {
  private batchRequest: InnerBatchRequest;
  private readonly dummyResponse: HttpOperationResponse = {
    request: new WebResource(),
    status: 200,
    headers: new HttpHeaders()
  };

  constructor(
    batchRequest: InnerBatchRequest,
    nextPolicy: RequestPolicy,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    options: RequestPolicyOptions
  ) {
    super(nextPolicy, options);

    this.batchRequest = batchRequest;
  }

  public async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    this.batchRequest.appendSubRequestToBody(request);

    return this.dummyResponse; // Intercept request from going to wire
  }
}

export class BatchRequestAssemblePolicyFactory implements RequestPolicyFactory {
  private batchRequest: InnerBatchRequest;

  constructor(batchRequest: InnerBatchRequest) {
    this.batchRequest = batchRequest;
  }

  public create(
    nextPolicy: RequestPolicy,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    options: RequestPolicyOptions
  ): BaseRequestPolicy {
    return new BatchRequestAssemblePolicy(this.batchRequest, nextPolicy, options);
  }
}
