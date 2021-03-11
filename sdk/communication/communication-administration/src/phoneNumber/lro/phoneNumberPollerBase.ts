// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { Poller, PollOperation } from "@azure/core-lro";
import { SpanStatusCode } from "@azure/core-tracing";
import { VoidResponse } from "../../common/models";
import { attachHttpResponse } from "../../common/mappers";
import { createSpan } from "../../common/tracing";
import { PhoneNumberAdministration } from "../generated/src/phoneNumberRestClient";
import { CancelReservationOptions, GetReservationOptions, GetReservationResponse } from "../models";
import { PhoneNumberReservation } from "../generated/src/models";

/**
 * Common properties and methods of the phone number pollers.
 */
export abstract class PhoneNumberPollerBase<TState, TResult> extends Poller<TState, TResult> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public pollInterval: number = 2000;

  /**
   * The method used by the poller to wait before attempting to update its operation
   */
  async delay(): Promise<void> {
    return delay(this.pollInterval);
  }
}

/**
 * Common properties and methods of the phone number poller operations.
 */
export class PhoneNumberPollOperationBase<TState, TResult>
  implements PollOperation<TState, TResult> {
  /**
   * Initializes a new instance of the phone number poll operation
   *
   * @param state - The state of the poll operation
   * @param cancelMessage - A message to dispaly when a poll operation is cancelled.
   */
  constructor(public state: TState, private cancelMessage: string = "Canceling not supported.") {}

  /**
   * Reaches to the service and updates the Poller operation.
   */
  public async update(): Promise<PollOperation<TState, TResult>> {
    throw new Error("Operation not supported");
  }

  /**
   * Reaches to the service and cancels the Poller operation and the underlying request.
   */
  public async cancel(): Promise<PollOperation<TState, TResult>> {
    throw new Error(this.cancelMessage);
  }

  /**
   * Serializes the Poller operation.
   */
  public toString(): string {
    return JSON.stringify({
      state: this.state
    });
  }
}

/**
 * Common properties and methods of the phone number reservation poller operations.
 */
export class PhoneNumberReservationPollOperationBase<TState, TResult>
  implements PollOperation<TState, TResult> {
  /**
   * Initializes a new instance of the phone number reservation poll operation
   *
   * @param state - The state of the poll operation
   * @param client - A reference to the generated client used to make requests internally.
   * @param cancelMessage - A message to dispaly when a poll operation is cancelled.
   */
  constructor(
    public state: TState,
    private client: PhoneNumberAdministration,
    private cancelMessage: string = "Canceling not supported."
  ) {}

  /**
   * Gets the reservation associated with a given id.
   *
   * @param reservationId - The id of the reservation to fetch.
   * @param options - Additional request options.
   */
  public async getReservation(
    reservationId: string,
    options: GetReservationOptions = {}
  ): Promise<GetReservationResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-getReservation",
      options
    );
    try {
      const { _response, ...rest } = await this.client.getSearchById(
        reservationId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<PhoneNumberReservation>(rest, _response);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Cancels the reservation associated with a given id.
   *
   * @param reservationId - The id of the reservation to cancel.
   * @param options - Additional request options.
   */
  public async cancelReservation(
    reservationId: string,
    options: CancelReservationOptions = {}
  ): Promise<VoidResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-cancelReservation",
      options
    );
    try {
      const { _response } = await this.client.cancelSearch(
        reservationId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse({}, _response);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Reaches to the service and updates the Poller operation.
   */
  public async update(): Promise<PollOperation<TState, TResult>> {
    throw new Error("Operation not supported");
  }

  /**
   * Reaches to the service and cancels the Poller operation and the underlying request.
   */
  public async cancel(): Promise<PollOperation<TState, TResult>> {
    throw new Error(this.cancelMessage);
  }

  /**
   * Serializes the Poller operation.
   */
  public toString(): string {
    return JSON.stringify({
      state: this.state
    });
  }
}
