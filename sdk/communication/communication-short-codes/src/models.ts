// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";

/**
 * The result of the phone numbers purchase operation.
 */
export interface PurchasePhoneNumbersResult {}

/**
 * The result of the phone number release operation.
 */
export interface ReleasePhoneNumberResult {}

/**
 * Additional options for the get phone number request.
 */
export type GetPurchasedPhoneNumberOptions = OperationOptions;

/**
 * Additional options that can be passed to the list phone numbers request.
 */
export interface ListPurchasedPhoneNumbersOptions extends OperationOptions {}

export {
  ShortCode,
  USProgramBrief,
  NumberType,
  ProgramBriefStatus,
  ShortCodeCost,
  ProgramDetails,
  CompanyInformation,
  MessageDetails,
  TrafficDetails,
  ShortCodesGetShortCodesOptionalParams,
  ShortCodesUpsertUSProgramBriefOptionalParams,
  BillingFrequency,
  ProgramSignUpType,
  ContactInformation,
  CustomerCareInformation,
  Recurrence,
  UseCase,
  ReviewNote,
  MessageProtocol,
  MessageDirectionality,
  MessageContentCategory,
  MessageExampleSequence,
  MessageExample,
  MessageDirection
} from "./generated/src/models/";
