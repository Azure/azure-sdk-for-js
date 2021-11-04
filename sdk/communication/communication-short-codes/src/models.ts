// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";

/**
 * Additional options for the delete US Program Brief request.
 */
export interface DeleteUSProgramBriefOptions extends OperationOptions {}

/**
 * Additional options for the Get US Program Brief request.
 */
export interface GetUSProgramBriefOptions extends OperationOptions {}

/**
 * Additional options for the Submit US Program Brief request.
 */
export interface SubmitUSProgramBriefOptions extends OperationOptions {}

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
