// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse, RequestOptionsBase } from "ms-rest-js";
import { AzureServiceClient } from "./azureServiceClient";
import { createLROPollStrategyFromInitialResponse, createLROPollStrategyFromMemento, LROMemento, LROPollStrategy } from "./lroPollStrategy";
import { LongRunningOperationStates } from "./util/constants";

/**
 * An HTTP operation response that provides special methods for interacting with LROs (long running
 * operations).
 */
export class HttpLongRunningOperationResponse {
  /**
   * Create a new HttpLongRunningOperationResponse.
   * @param _lroPollStrategy The LROPollStrategy that this HttpLongRunningOperationResponse will
   * use to interact with the LRO.
   */
  constructor(private readonly _lroPollStrategy: LROPollStrategy | undefined, private readonly _initialResponse: HttpOperationResponse) {
  }

  /**
   * Get the current status of the LRO.
   * @returns The current status of the LRO.
   */
  public getOperationStatus(): LongRunningOperationStates {
    const lroPollStrategy: LROPollStrategy | undefined = this._lroPollStrategy;
    return !lroPollStrategy ? "Succeeded" : lroPollStrategy.getOperationStatus();
  }

  /**
   * Send a single poll request and return the LRO's state.
   * @returns The LRO's state.
   */
  public poll(): Promise<LongRunningOperationStates> {
    let result: Promise<LongRunningOperationStates>;
    const lroPollStrategy: LROPollStrategy | undefined = this._lroPollStrategy;
    if (!lroPollStrategy) {
      result = Promise.resolve<LongRunningOperationStates>("Succeeded");
    } else {
      result = lroPollStrategy.sendPollRequest().then(() => {
        return lroPollStrategy.getOperationStatus();
      });
    }
    return result;
  }

  /**
   * Send poll requests that check the LRO's status until it is determined that the LRO is finished.
   * @returns Whether or not the LRO succeeded.
   */
  public async pollUntilFinished(): Promise<HttpOperationResponse> {
    let result: Promise<HttpOperationResponse>;
    const lroPollStrategy: LROPollStrategy | undefined = this._lroPollStrategy;
    if (!lroPollStrategy) {
      result = Promise.resolve(this._initialResponse);
    } else {
      result = lroPollStrategy.pollUntilFinished().then((succeeded: boolean) => {
        if (succeeded) {
          return lroPollStrategy.getOperationResponse();
        } else {
          throw lroPollStrategy.getRestError();
        }
      });
    }
    return result;
  }

  /**
   * Get an LROMemento object that can be used to poll this LRO in a different context (such as on a
   * different process or a different machine). If the LRO couldn't produce an LRO polling strategy,
   * then this will return undefined.
   */
  public getMemento(): LROMemento | undefined {
    const lroPollStrategy: LROPollStrategy | undefined = this._lroPollStrategy;
    return !lroPollStrategy ? undefined : lroPollStrategy.getMemento();
  }
}

export function createHttpLongRunningOperationResponseFromInitialResponse(azureServiceClient: AzureServiceClient, initialResponse: HttpOperationResponse, options?: RequestOptionsBase): HttpLongRunningOperationResponse {
  const lroPollStrategy: LROPollStrategy | undefined = createLROPollStrategyFromInitialResponse(initialResponse, azureServiceClient, options);
  return new HttpLongRunningOperationResponse(lroPollStrategy, initialResponse);
}

export function createHttpLongRunningOperationResponseFromMemento(azureServiceClient: AzureServiceClient, lroMemento: LROMemento): HttpLongRunningOperationResponse {
  const lroPollStrategy: LROPollStrategy | undefined = createLROPollStrategyFromMemento(azureServiceClient, lroMemento);
  return new HttpLongRunningOperationResponse(lroPollStrategy, lroMemento.initialResponse);
}