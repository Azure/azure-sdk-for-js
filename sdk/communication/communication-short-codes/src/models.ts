// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { ShortCodesGetShortCodesOptionalParams } from ".";

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

/**
 * Additional options for the List Short Codes request.
 */
export interface ListShortCodesOptions extends ShortCodesGetShortCodesOptionalParams {}

/**
 * Additional options for the List US Program Brief request.
 */
export interface ListUSProgramBriefsOptions extends OperationOptions {}

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
  CallToActionType,
  ContactInformation,
  CustomerCareInformation,
  Recurrence,
  UseCase,
  ReviewNote,
  MessageProtocol,
  MessageDirectionality,
  MessageContentType,
  MessageExampleSequence,
  MessageExample,
  MessageDirection,
  ShortCodesCreateOrReplaceUSProgramBriefAttachmentOptionalParams,
  ShortCodesDeleteUSProgramBriefAttachmentOptionalParams,
  ShortCodesGetUSProgramBriefAttachmentsOptionalParams,
  ShortCodesGetUSProgramBriefAttachmentOptionalParams,
  ProgramBriefAttachment,
  AttachmentType,
  FileType,
  ProgramBriefAttachmentSummary,
} from "./generated/src/models/";
