// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import {
  GetReleaseOptions,
  GetReleaseResponse,
  ReleasePhoneNumbersOptions,
  ReleasePhoneNumbersResponse
} from "../../models";
import { attachHttpResponse } from "../../../common/mappers";
import { createSpan } from "../../../common/tracing";
import { PhoneNumberRelease, ReleaseResponse } from "../../generated/src/models";
import { PhoneNumberAdministration } from "../../generated/src/phoneNumberRestClient";
import { ReleasePhoneNumbersPollOperationState, UpdatePollerOptions } from "../../lroModels";
import { PhoneNumberPollOperationBase } from "../phoneNumberPollerBase";
import { isComplete } from "../utils";

/**
 * The poll operation for releasing a phone number or list of phone numbers.
 */
export class ReleasePhoneNumbersPollOperation extends PhoneNumberPollOperationBase<
  ReleasePhoneNumbersPollOperationState,
  PhoneNumberRelease
> {
  /**
   * Initializes an instance of PurchaseReservationPollOperation
   *
   * @param state - The state of the poll operation
   * @param client - A reference to the generated client used to make requests internally.
   * @param requestOptions - Additional options for the underlying requests.
   */
  constructor(
    public state: ReleasePhoneNumbersPollOperationState,
    private client: PhoneNumberAdministration,
    private requestOptions: OperationOptions
  ) {
    super(state, "Canceling a release is not supported.");
  }

  /**
   * Request the release of a list of acquired phone numbers.
   *
   * @param phoneNumbers - The phone numbers to be released.
   * @param options - Additional request options.
   */
  private async releasePhoneNumbers(
    phoneNumbers: string[],
    options: ReleasePhoneNumbersOptions = {}
  ): Promise<ReleasePhoneNumbersResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-releasePhoneNumbers",
      options
    );
    try {
      const { releaseId, _response } = await this.client.releasePhoneNumbers(
        {
          phoneNumbers
        },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<ReleaseResponse>({ releaseId }, _response);
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
   * Gets the release associated with a given id.
   *
   * @param releaseId - The id of the release returned by releasePhoneNumbers.
   * @param options - Additional request options.
   */
  private async getRelease(
    releaseId: string,
    options: GetReleaseOptions = {}
  ): Promise<GetReleaseResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-getRelease",
      options
    );
    try {
      const { _response, ...rest } = await this.client.getReleaseById(
        releaseId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<PhoneNumberRelease>(rest, _response);
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
    options: UpdatePollerOptions<ReleasePhoneNumbersPollOperationState> = {}
  ): Promise<ReleasePhoneNumbersPollOperation> {
    const { state } = this;
    const { phoneNumbers } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    try {
      if (!state.isStarted) {
        const { releaseId } = await this.releasePhoneNumbers(phoneNumbers, this.requestOptions);
        state.releaseId = releaseId;
        state.isStarted = true;
      }

      if (!state.isCompleted && state.releaseId) {
        state.result = await this.getRelease(state.releaseId, this.requestOptions);
        state.isCompleted = isComplete(state.result, "Complete");
      }

      return this;
    } catch (error) {
      state.error = error;
      state.isCompleted = true;

      return this;
    }
  }
}
