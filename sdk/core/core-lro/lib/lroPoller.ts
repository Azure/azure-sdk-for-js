// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse, RequestOptionsBase, RestResponse, flattenResponse } from "@azure/ms-rest-js";
import { AzureServiceClient } from "./azureServiceClient";
import { createLROPollStrategyFromInitialResponse, createLROPollStrategyFromPollState, LROPollState, LROPollStrategy } from "./lroPollStrategy";
import { LongRunningOperationStates } from "./util/constants";

/**
 * An HTTP operation response that provides special methods for interacting with LROs (long running
 * operations).
 */
export class LROPoller {
  /**
   * Create a new HttpLongRunningOperationResponse.
   * @param _lroPollStrategy The LROPollStrategy that this HttpLongRunningOperationResponse will
   * use to interact with the LRO.
   */
  constructor(private readonly _lroPollStrategy: LROPollStrategy | undefined, private readonly _initialResponse: HttpOperationResponse) {
  }

  /**
   * Get the first response that the service sent back when the LRO was initiated.
   */
  public getInitialResponse(): HttpOperationResponse {
    return this._initialResponse;
  }

  /**
   * Get the most recent response that the service sent back during this LRO.
   */
  public getMostRecentResponse(): HttpOperationResponse {
    const lroPollStrategy: LROPollStrategy | undefined = this._lroPollStrategy;
    return !lroPollStrategy ? this._initialResponse : lroPollStrategy.getMostRecentResponse();
  }

  /**
   * Get whether or not the LRO is finished.
   */
  public isFinished(): boolean {
    const lroPollStrategy: LROPollStrategy | undefined = this._lroPollStrategy;
    return !lroPollStrategy ? true : lroPollStrategy.isFinished();
  }

  /**
   * Get whether or not the LRO is finished and its final state is acceptable. If the LRO has not
   * finished yet, then undefined will be returned. An "acceptable" final state is determined by the
   * LRO strategy that the Azure service uses to perform long running operations.
   */
  public isFinalStatusAcceptable(): boolean | undefined {
    let result: boolean | undefined;
    const lroPollStrategy: LROPollStrategy | undefined = this._lroPollStrategy;
    if (!lroPollStrategy) {
      result = true;
    } else if (lroPollStrategy.isFinished()) {
      result = lroPollStrategy.isFinalStatusAcceptable();
    }
    return result;
  }

  /**
   * Get the current status of the LRO.
   */
  public getOperationStatus(): LongRunningOperationStates {
    const lroPollStrategy: LROPollStrategy | undefined = this._lroPollStrategy;
    return !lroPollStrategy ? "Succeeded" : lroPollStrategy.getOperationStatus();
  }

  /**
   * If the LRO is finished and in an acceptable state, then return the HttpOperationResponse. If
   * the LRO is finished and not in an acceptable state, then throw the error that the LRO produced.
   * If the LRO is not finished, then return undefined.
   */
  public getOperationResponse(): Promise<HttpOperationResponse | undefined> {
    let result: Promise<HttpOperationResponse | undefined>;
    const lroPollStrategy: LROPollStrategy | undefined = this._lroPollStrategy;
    if (!lroPollStrategy) {
      result = Promise.resolve(this._initialResponse);
    } else if (!lroPollStrategy.isFinished()) {
      result = Promise.resolve(undefined);
    } else if (lroPollStrategy.isFinalStatusAcceptable()) {
      result = lroPollStrategy.getOperationResponse();
    } else {
      throw lroPollStrategy.getRestError();
    }
    return result;
  }

  /**
   * Send a single poll request and return the LRO's state.
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
   */
  public async pollUntilFinished(): Promise<RestResponse> {
    let result: Promise<RestResponse>;
    const lroPollStrategy: LROPollStrategy | undefined = this._lroPollStrategy;

    if (!lroPollStrategy) {
      result = Promise.resolve(flattenAzureResponse(this._initialResponse));
    } else {
      result = lroPollStrategy.pollUntilFinished().then((succeeded: boolean) => {
        if (succeeded) {
          return lroPollStrategy.getOperationResponse().then(flattenAzureResponse);
        } else {
          throw lroPollStrategy.getRestError();
        }
      });
    }
    return result;
  }

  /**
   * Get an LROPollState object that can be used to poll this LRO in a different context (such as on
   * a different process or a different machine). If the LRO couldn't produce an LRO polling
   * strategy, then this will return undefined.
   */
  public getPollState(): LROPollState | undefined {
    const lroPollStrategy: LROPollStrategy | undefined = this._lroPollStrategy;
    return !lroPollStrategy ? undefined : lroPollStrategy.getPollState();
  }
}

export function createLROPollerFromInitialResponse(azureServiceClient: AzureServiceClient, initialResponse: HttpOperationResponse, options?: RequestOptionsBase): LROPoller {
  const lroPollStrategy: LROPollStrategy | undefined = createLROPollStrategyFromInitialResponse(initialResponse, azureServiceClient, options);
  return new LROPoller(lroPollStrategy, initialResponse);
}

export function createLROPollerFromPollState(azureServiceClient: AzureServiceClient, lroMemento: LROPollState): LROPoller {
  const lroPollStrategy: LROPollStrategy | undefined = createLROPollStrategyFromPollState(azureServiceClient, lroMemento);
  return new LROPoller(lroPollStrategy, lroMemento.initialResponse);
}

function flattenAzureResponse(response: HttpOperationResponse): RestResponse {
  const { operationResponseGetter, operationSpec } = response.request;
  return flattenResponse(response, operationResponseGetter && operationSpec && operationResponseGetter(operationSpec, response));
}
