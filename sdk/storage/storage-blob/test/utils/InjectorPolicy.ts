// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy, PipelineRequest, PipelineResponse, SendRequest } from "@azure/core-https";
import { RestError } from "../../src";

export interface NextInjectErrorHolder {
  nextInjectError?: RestError;
}

export type Injector = () => RestError | undefined;

/**
 * InjectorPolicy will inject a customized error before next HTTP request.
 */
export class InjectorPolicy implements PipelinePolicy {
  public name = "InjectorPolicy";
  /**
   * Creates an instance of InjectorPolicy.
   *
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @memberof InjectorPolicy
   */
  public constructor(injector: Injector) {
    this.injector = injector;
  }

  /**
   * Sends request.
   */
  public async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
    const error = this.injector();
    if (error) {
      throw error;
    }
    return next(request);
  }

  private injector: Injector;
}
