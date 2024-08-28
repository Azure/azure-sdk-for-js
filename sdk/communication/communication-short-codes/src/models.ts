// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure/core-client";
import {
  ShortCodesGetShortCodesOptionalParams,
  ShortCodesGetUSProgramBriefsOptionalParams,
  ShortCodesGetCostsOptionalParams,
} from ".";

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
 * Additional options for the List Short Code Costs request.
 */
export interface ListShortCodeCostsOptions extends ShortCodesGetCostsOptionalParams {}

/**
 * Additional options for the List US Program Brief request.
 */
export interface ListUSProgramBriefsOptions extends ShortCodesGetUSProgramBriefsOptionalParams {}

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
  ShortCodesGetCostsOptionalParams,
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
  ShortCodesGetUSProgramBriefsOptionalParams,
  ProgramBriefAttachment,
  AttachmentType,
  FileType,
  ProgramBriefAttachmentSummary,
} from "./generated/src/models/";
