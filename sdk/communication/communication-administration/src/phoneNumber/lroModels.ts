// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike, OperationOptions } from "@azure/core-http";
import { PollOperation, PollOperationState } from "@azure/core-lro";
import { VoidResponse } from "../common/models";
import { PhoneNumberRelease, PhoneNumberSearch } from "./generated/src/models";
import {
  CancelReservationOptions,
  CreateReservationOptions,
  CreateReservationRequest,
  CreateReservationResponse,
  GetReleaseOptions,
  GetReleaseResponse,
  GetReservationResponse,
  PurchaseSearchOptions,
  ReleasePhoneNumbersOptions,
  ReleasePhoneNumbersResponse
} from "./models";

export interface UpdatePollerOptions<T> {
  abortSignal?: AbortSignalLike;
  fireProgress?: (state: T) => void;
}

/**
 * Represents the optional parameters that can be passed to search pollers.
 */
export interface PhoneNumberPollerOptions extends OperationOptions {
  /**
   * Time between each polling in milliseconds.
   */
  intervalInMs?: number;
  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * Additional request options for requesting the release of a list of phone numbers.
 */
export interface StartReleasePhoneNumbersOptions extends PhoneNumberPollerOptions {}

export interface ReleasePhoneNumbersPollerOptions extends PhoneNumberPollerOptions {
  /**
   * The list of phone numbers to be released.
   */
  phoneNumbers: string[];

  /**
   * Represents the poller client used internally.
   */
  client: _PhoneNumberPollerClient;

  /**
   * Additional request options.
   */
  options?: ReleasePhoneNumbersOptions;
}

export interface StartReservePhoneNumbersOptions extends PhoneNumberPollerOptions {}

export interface ReservePhoneNumbersPollerOptions extends PhoneNumberPollerOptions {
  /**
   * Request to create reservation.
   */
  reservationRequest: CreateReservationRequest;

  /**
   * Represents the poller client used internally.
   */
  client: _PhoneNumberPollerClient;

  /**
   * The id returned from the create reservation request.
   */
  reservationId?: string;

  /**
   * Options for creating a phone number reservation.
   */
  options?: CreateReservationOptions;
}

/**
 * @internal
 * @ignore
 * Represents the poller client used internally
 */
export interface _PhoneNumberPollerClient {
  releasePhoneNumbers: (
    phoneNumbers: string[],
    options?: StartReleasePhoneNumbersOptions
  ) => Promise<ReleasePhoneNumbersResponse>;
  getRelease: (releaseId: string, options?: GetReleaseOptions) => Promise<GetReleaseResponse>;
  createReservation(
    reservationRequest: CreateReservationRequest,
    options: CreateReservationOptions
  ): Promise<CreateReservationResponse>;
  getReservation(reservationId: string, options: OperationOptions): Promise<GetReservationResponse>;
  cancelReservation(
    reservationId: string,
    options: CancelReservationOptions
  ): Promise<VoidResponse>;
  purchaseSearch(reservationId: string, options: PurchaseSearchOptions): Promise<VoidResponse>;
}

export interface ReleasePhoneNumbersPollOperationState
  extends PollOperationState<PhoneNumberRelease> {
  /**
   * The list of phone numbers to be released.
   */
  phoneNumbers: string[];

  /**
   * Represents the poller client used internally.
   */
  client: _PhoneNumberPollerClient;

  /**
   * Additional request options.
   */
  options?: ReleasePhoneNumbersOptions;

  /**
   * The releaseId returned when release operation starts.
   * Used to query the status of the operation.
   */
  releaseId?: string;
}

export interface ReleasePhoneNumbersPollOperation
  extends PollOperation<ReleasePhoneNumbersPollOperationState, PhoneNumberRelease> {}

export interface ReservePhoneNumbersPollOperationState
  extends PollOperationState<PhoneNumberSearch> {
  /**
   * Request to create reservation.
   */
  reservationRequest: CreateReservationRequest;

  /**
   * Represents the poller client used internally.
   */
  client: _PhoneNumberPollerClient;

  /**
   * The id returned from the create reservation request.
   */
  reservationId?: string;

  /**
   * Options for creating a phone number reservation.
   */
  options?: CreateReservationOptions;
}

export interface ReservePhoneNumbersPollOperation
  extends PollOperation<ReservePhoneNumbersPollOperationState, PhoneNumberSearch> {}
