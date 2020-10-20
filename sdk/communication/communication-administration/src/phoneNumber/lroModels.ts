// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike, OperationOptions } from "@azure/core-http";
import { PollOperation, PollOperationState } from "@azure/core-lro";
import { VoidResponse } from "../common/models";
import { PhoneNumberRelease, PhoneNumberReservation } from "./generated/src/models";
import {
  CancelReservationOptions,
  CreateReservationOptions,
  CreateReservationRequest,
  CreateReservationResponse,
  GetReleaseOptions,
  GetReleaseResponse,
  GetReservationResponse,
  PurchaseReservationOptions,
  ReleasePhoneNumbersOptions,
  ReleasePhoneNumbersResponse
} from "./models";

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
export interface BeginReleasePhoneNumbersOptions extends PhoneNumberPollerOptions {}

/**
 * Additional request options for requesting the reservation of phone numbers.
 */
export interface BeginReservePhoneNumbersOptions extends PhoneNumberPollerOptions {}

/**
 * Additional request options for requesting the purchase of a phone number reservation.
 */
export interface BeginPurchaseReservationOptions extends PhoneNumberPollerOptions {}

/**
 * @ignore
 * The optional parameters of the poller's update method, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
export interface UpdatePollerOptions<T> {
  abortSignal?: AbortSignalLike;
  fireProgress?: (state: T) => void;
}

/**
 * @ignore
 * Represents options for creating an instance of ReleasePhoneNumbersPoller
 */
export interface ReleasePhoneNumbersPollerOptions extends PhoneNumberPollerOptions {
  /**
   * The list of phone numbers to be released.
   */
  phoneNumbers: string[];

  /**
   * Represents the poller client used internally.
   */
  client: PhoneNumberPollerClient;

  /**
   * Additional request options.
   */
  options?: ReleasePhoneNumbersOptions;
}

/**
 * @ignore
 * Represents options for creating an instance of ReservePhoneNumbersPoller
 */
export interface ReservePhoneNumbersPollerOptions extends PhoneNumberPollerOptions {
  /**
   * Request to create reservation.
   */
  reservationRequest: CreateReservationRequest;

  /**
   * Represents the poller client used internally.
   */
  client: PhoneNumberPollerClient;

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
 * @ignore
 * Represents options for creating an instance of PurchaseReservationPoller
 */
export interface PurchaseReservationPollerOptions extends PhoneNumberPollerOptions {
  /**
   * The id returned from the create reservation request.
   */
  reservationId: string;

  /**
   * Represents the poller client used internally.
   */
  client: PhoneNumberPollerClient;

  /**
   * Options for creating a phone number reservation.
   */
  options?: CreateReservationOptions;
}

/**
 * @ignore
 * Represents the poller client used internally
 */
export interface PhoneNumberPollerClient {
  releasePhoneNumbers: (
    phoneNumbers: string[],
    options?: BeginReleasePhoneNumbersOptions
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
  purchaseReservation(
    reservationId: string,
    options: PurchaseReservationOptions
  ): Promise<VoidResponse>;
}

/**
 * @ignore
 * Represents the operation state of the release phone numbers poller
 */
export interface ReleasePhoneNumbersPollOperationState
  extends PollOperationState<PhoneNumberRelease> {
  /**
   * The list of phone numbers to be released.
   */
  phoneNumbers: string[];

  /**
   * Represents the poller client used internally.
   */
  client: PhoneNumberPollerClient;

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

/**
 * @ignore
 * Represents the operation state of the reserve phone numbers poller
 */
export interface ReservePhoneNumbersPollOperationState
  extends PollOperationState<PhoneNumberReservation> {
  /**
   * Request to create reservation.
   */
  reservationRequest: CreateReservationRequest;

  /**
   * Represents the poller client used internally.
   */
  client: PhoneNumberPollerClient;

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
 * @ignore
 * Represents the operation state of the purchase reservation poller
 */
export interface PurchaseReservationPollOperationState extends PollOperationState<void> {
  /**
   * The id returned from the create reservation request.
   */
  reservationId: string;

  /**
   * Represents the poller client used internally.
   */
  client: PhoneNumberPollerClient;

  /**
   * Options for creating a phone number reservation.
   */
  options?: CreateReservationOptions;
}

/**
 * @ignore
 * Represents the poll operation of the reserve phone numbers poller
 */
export interface ReleasePhoneNumbersPollOperation
  extends PollOperation<ReleasePhoneNumbersPollOperationState, PhoneNumberRelease> {}

/**
 * @ignore
 * Represents the poll operation of the reserve phone numbers poller
 */
export interface ReservePhoneNumbersPollOperation
  extends PollOperation<ReservePhoneNumbersPollOperationState, PhoneNumberReservation> {}

/**
 * @ignore
 * Represents the poll operation of the purchase reservation poller
 */
export interface PurchaseReservationPollOperation
  extends PollOperation<PurchaseReservationPollOperationState, void> {}
