// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  HttpOperationResponse,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource,
  RestError,
} from "../../src";

export interface NextInjectErrorHolder {
  nextInjectError?: RestError;
}

export type Injector = () => RestError | undefined;

/**
 * InjectorPolicy will inject a customized error before next HTTP request.
 */
export class InjectorPolicy extends BaseRequestPolicy {
  /**
   * Creates an instance of InjectorPolicy.
   *
   * @param nextPolicy -
   * @param options -
   */
  public constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, injector: Injector) {
    super(nextPolicy, options);
    this.injector = injector;
  }

  /**
   * Sends request.
   *
   * @param request -
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    const error = this.injector();
    if (error) {
      throw error;
    }
    return this._nextPolicy.sendRequest(request);
  }

  private injector: Injector;
}
