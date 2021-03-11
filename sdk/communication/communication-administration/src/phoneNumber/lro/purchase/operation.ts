// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import { attachHttpResponse } from "../../../common/mappers";
import { VoidResponse } from "../../../common/models";
import { createSpan } from "../../../common/tracing";
import { PhoneNumberAdministration } from "../../generated/src/phoneNumberRestClient";
import { PurchaseReservationPollOperationState, UpdatePollerOptions } from "../../lroModels";
import { PurchaseReservationOptions } from "../../models";
import { PhoneNumberReservationPollOperationBase } from "../phoneNumberPollerBase";
import { isComplete } from "../utils";

/**
 * The poll operation for purchasing a phone number reservation.
 */
export class PurchaseReservationPollOperation extends PhoneNumberReservationPollOperationBase<
  PurchaseReservationPollOperationState,
  void
> {
  /**
   * Initializes an instance of PurchaseReservationPollOperation
   *
   * @param state - The state of the poll operation
   * @param _client - A reference to the generated client used to make requests internally.
   * @param requestOptions - Additional options for the underlying requests.
   */
  constructor(
    public state: PurchaseReservationPollOperationState,
    private _client: PhoneNumberAdministration,
    private requestOptions: OperationOptions
  ) {
    super(state, _client);
  }

  /**
   * Purchases the phone number(s) in the reservation associated with a given id.
   *
   * @param reservationId - The id of the reservation being purchased.
   * @param options - Additional request options.
   */
  private async purchaseReservation(
    reservationId: string,
    options: PurchaseReservationOptions = {}
  ): Promise<VoidResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-purchaseReservation",
      options
    );
    try {
      const { _response } = await this._client.purchaseSearch(
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
   * Reaches to the service and queries the status of the operation.
   *
   * @param options - Additional options for the poll operation
   */
  public async update(
    options: UpdatePollerOptions<PurchaseReservationPollOperationState> = {}
  ): Promise<PurchaseReservationPollOperation> {
    const state = this.state;
    const { reservationId } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    try {
      if (!state.isStarted) {
        await this.purchaseReservation(reservationId, this.requestOptions);
        state.isStarted = true;
      }

      if (!state.isCompleted) {
        const result = await this.getReservation(reservationId, this.requestOptions);
        state.isCompleted = isComplete(result, "Success");
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
  public async cancel(): Promise<PurchaseReservationPollOperation> {
    const state = this.state;
    const { reservationId, options = {} } = state;

    if (reservationId) {
      await this.cancelReservation(reservationId, options);
    }

    state.isCancelled = true;

    return this;
  }
}
