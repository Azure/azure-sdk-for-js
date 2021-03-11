// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { operationOptionsToRequestOptionsBase, RequestOptionsBase } from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import {
  CreateReservationRequest,
  CreateReservationOptions,
  CreatePhoneNumberReservationResponse,
  CreateReservationResponse
} from "../../models";
import { attachHttpResponse } from "../../../common/mappers";
import { createSpan } from "../../../common/tracing";
import { PhoneNumberReservation } from "../../generated/src/models";
import { PhoneNumberAdministration } from "../../generated/src/phoneNumberRestClient";
import { ReservePhoneNumbersPollOperationState, UpdatePollerOptions } from "../../lroModels";
import { PhoneNumberReservationPollOperationBase } from "../phoneNumberPollerBase";
import { isComplete } from "../utils";

/**
 * The poll operation for reserving phone numbers.
 */
export class ReservePhoneNumbersPollOperation extends PhoneNumberReservationPollOperationBase<
  ReservePhoneNumbersPollOperationState,
  PhoneNumberReservation
> {
  /**
   * Initializes an instance of ReservePhoneNumbersPollOperation
   *
   * @param state - The state of the poll operation
   * @param _client - A reference to the generated client used to make requests internally.
   * @param requestOptions - Additional options for the underlying requests.
   */
  constructor(
    public state: ReservePhoneNumbersPollOperationState,
    private _client: PhoneNumberAdministration,
    private requestOptions: RequestOptionsBase
  ) {
    super(state, _client);
  }

  /**
   * Starts a search for phone numbers given some constraints such as name or area code. The phone numbers that are
   * found will then be reserved.
   *
   * @param reservationRequest - Request properties to constraint the search scope.
   * @param options - Additional request options.
   */
  private async createReservation(
    reservationRequest: CreateReservationRequest,
    options: CreateReservationOptions = {}
  ): Promise<CreatePhoneNumberReservationResponse> {
    const { name, description, phonePlanIds, areaCode, quantity } = reservationRequest;
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-createReservation",
      options
    );
    try {
      const { searchId, _response } = await this._client.createSearch(
        {
          displayName: name,
          description,
          phonePlanIds,
          quantity,
          areaCode
        },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<CreateReservationResponse>({ reservationId: searchId }, _response);
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
   * Reaches to the service and queries the status of the operation.
   *
   * @param options - Additional options for the poll operation
   */
  public async update(
    options: UpdatePollerOptions<ReservePhoneNumbersPollOperationState> = {}
  ): Promise<ReservePhoneNumbersPollOperation> {
    const state = this.state;
    const { reservationRequest } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    try {
      if (!state.isStarted) {
        const { reservationId } = await this.createReservation(
          reservationRequest,
          this.requestOptions
        );
        state.reservationId = reservationId;
        state.isStarted = true;
      }

      if (!state.isCompleted && state.reservationId) {
        state.result = await this.getReservation(state.reservationId, this.requestOptions);
        state.isCompleted = isComplete(state.result, "Reserved");
      }

      return this;
    } catch (error) {
      state.error = error;
      state.isCompleted = true;

      return this;
    }
  }

  /**
   * Reaches to the service and cancels the operation, also updating the poll operation.
   */
  public async cancel(): Promise<ReservePhoneNumbersPollOperation> {
    const state = this.state;
    const { reservationId, options = {} } = state;

    if (reservationId) {
      await this.cancelReservation(reservationId, options);
    }

    state.isCancelled = true;

    return this;
  }
}
