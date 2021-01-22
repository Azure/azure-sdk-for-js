// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/api";
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
   * @param {ReleasePhoneNumbersPollOperationState} state The state of the poll operation
   * @param {PhoneNumberAdministration} client A reference to the generated client used to make requests internally.
   * @param {OperationOptions} requestOptions Additional options for the underlying requests.
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
   * @param {string[]} phoneNumbers The phone numbers to be released.
   * @param {ReleasePhoneNumbersOptions} options Additional request options.
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
        code: CanonicalCode.UNKNOWN,
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
   * @param {string} releaseId The id of the release returned by releasePhoneNumbers.
   * @param {GetReleaseOptions} options Additional request options.
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
        code: CanonicalCode.UNKNOWN,
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
   * @param {UpdatePollerOptions<ReleasePhoneNumbersPollOperationState>} [options={}] Additional options for the poll operation
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
    } catch (error) {
      state.error = error;
      state.isCompleted = true;
    } finally {
      return this;
    }
  }
}
