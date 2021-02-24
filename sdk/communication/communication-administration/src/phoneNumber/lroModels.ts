// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike, OperationOptions } from "@azure/core-http";
import { PollOperationState } from "@azure/core-lro";
import { PhoneNumberAdministration } from "./generated/src/phoneNumberRestClient";
import {
  LocationOptionsDetails,
  PhoneNumberRelease,
  PhoneNumberReservation
} from "./generated/src/models";
import {
  CreateReservationOptions,
  CreateReservationRequest,
  ReleasePhoneNumbersOptions
} from "./models";

/**
 * Represents the optional parameters that can be passed to phone number pollers.
 */
export interface PhoneNumberPollerOptionsBase {
  /**
   * Time between each polling in milliseconds.
   */
  pollInterval?: number;

  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * @internal
 * Represents the optional parameters that can be passed to phone number pollers with a required client.
 */
export interface PhoneNumberPollerOptionsWithClient extends PhoneNumberPollerOptionsBase {
  /**
   * The client used for polling.
   */
  client: PhoneNumberAdministration;
}

/**
 * Additional request options for requesting the release of a list of phone numbers.
 */
export interface BeginReleasePhoneNumbersOptions
  extends PhoneNumberPollerOptionsBase,
    OperationOptions {}

/**
 * Additional request options for requesting the reservation of phone numbers.
 */
export interface BeginReservePhoneNumbersOptions
  extends PhoneNumberPollerOptionsBase,
    OperationOptions {
  quantity?: number;

  locationOptions?: LocationOptionsDetails[];
}

/**
 * Additional request options for requesting the purchase of a phone number reservation.
 */
export interface BeginPurchaseReservationOptions
  extends PhoneNumberPollerOptionsBase,
    OperationOptions {}

/**
 * @internal
 * The optional parameters of the poller's update method, which are an abortSignal from \@azure/abort-controller and a function that triggers the poller's onProgress function.
 */
export interface UpdatePollerOptions<T> {
  abortSignal?: AbortSignalLike;
  fireProgress?: (state: T) => void;
}

/**
 * @internal
 * Represents options for creating an instance of ReleasePhoneNumbersPoller
 */
export interface ReleasePhoneNumbersPollerOptions extends PhoneNumberPollerOptionsWithClient {
  /**
   * The list of phone numbers to be released.
   */
  phoneNumbers: string[];

  /**
   * Additional request options.
   */
  requestOptions?: ReleasePhoneNumbersOptions;
}

/**
 * @internal
 * Represents options for creating an instance of ReservePhoneNumbersPoller
 */
export interface ReservePhoneNumbersPollerOptions extends PhoneNumberPollerOptionsWithClient {
  /**
   * Request to create reservation.
   */
  reservationRequest: CreateReservationRequest;

  /**
   * The id returned from the create reservation request.
   */
  reservationId?: string;

  /**
   * Options for creating a phone number reservation.
   */
  requestOptions?: CreateReservationOptions;
}

/**
 * @internal
 * Represents options for creating an instance of PurchaseReservationPoller
 */
export interface PurchaseReservationPollerOptions extends PhoneNumberPollerOptionsWithClient {
  /**
   * The id returned from the create reservation request.
   */
  reservationId: string;

  /**
   * Options for creating a phone number reservation.
   */
  requestOptions?: OperationOptions;
}

/**
 * @internal
 * Represents the operation state of the release phone numbers poller
 */
export interface ReleasePhoneNumbersPollOperationState
  extends PollOperationState<PhoneNumberRelease> {
  /**
   * The list of phone numbers to be released.
   */
  phoneNumbers: string[];

  /**
   * The releaseId returned when release operation starts.
   * Used to query the status of the operation.
   */
  releaseId?: string;

  /**
   * Additional request options.
   */
  requestOptions?: ReleasePhoneNumbersOptions;
}

/**
 * @internal
 * Represents the operation state of the reserve phone numbers poller
 */
export interface ReservePhoneNumbersPollOperationState
  extends PollOperationState<PhoneNumberReservation> {
  /**
   * Request to create reservation.
   */
  reservationRequest: CreateReservationRequest;

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
 * Represents the operation state of the purchase reservation poller
 */
export interface PurchaseReservationPollOperationState extends PollOperationState<void> {
  /**
   * The id returned from the create reservation request.
   */
  reservationId: string;

  /**
   * Options for creating a phone number reservation.
   */
  options?: CreateReservationOptions;
}
