// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  ReceivedShareOutput,
  PurviewShareErrorOutput,
  OperationResponseOutput,
  ReceivedShareListOutput,
  TenantEmailRegistrationOutput,
  SentShareListOutput,
  SentShareOutput,
  SentShareInvitationListOutput,
  SentShareInvitationOutput,
  ShareResourceListOutput,
} from "./outputModels";

/** Get a received share */
export interface ReceivedSharesGetReceivedShare200Response extends HttpResponse {
  status: "200";
  body: ReceivedShareOutput;
}

export interface ReceivedSharesGetReceivedShareDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Get a received share */
export interface ReceivedSharesGetReceivedShareDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & ReceivedSharesGetReceivedShareDefaultHeaders;
}

export interface ReceivedSharesCreateOrReplace200Headers {
  /** The URL to track the status of the long running operation. */
  "operation-location"?: string;
}

/** Update changes to a received share */
export interface ReceivedSharesCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: ReceivedShareOutput;
  headers: RawHttpHeaders & ReceivedSharesCreateOrReplace200Headers;
}

export interface ReceivedSharesCreateOrReplace201Headers {
  /** The URL to track the status of the long running operation. */
  "operation-location"?: string;
}

/** Update changes to a received share */
export interface ReceivedSharesCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: ReceivedShareOutput;
  headers: RawHttpHeaders & ReceivedSharesCreateOrReplace201Headers;
}

export interface ReceivedSharesCreateOrReplaceDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Update changes to a received share */
export interface ReceivedSharesCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & ReceivedSharesCreateOrReplaceDefaultHeaders;
}

export interface ReceivedSharesDeleteReceivedShare202Headers {
  /** The URL to track the status of the long running operation. */
  "operation-location"?: string;
}

/** Delete a received share */
export interface ReceivedSharesDeleteReceivedShare202Response extends HttpResponse {
  status: "202";
  body: OperationResponseOutput;
  headers: RawHttpHeaders & ReceivedSharesDeleteReceivedShare202Headers;
}

export interface ReceivedSharesDeleteReceivedShareDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Delete a received share */
export interface ReceivedSharesDeleteReceivedShareDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & ReceivedSharesDeleteReceivedShareDefaultHeaders;
}

/** List attached received shares */
export interface ReceivedSharesGetAllAttachedReceivedShares200Response extends HttpResponse {
  status: "200";
  body: ReceivedShareListOutput;
}

export interface ReceivedSharesGetAllAttachedReceivedSharesDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** List attached received shares */
export interface ReceivedSharesGetAllAttachedReceivedSharesDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & ReceivedSharesGetAllAttachedReceivedSharesDefaultHeaders;
}

/** List detached received shares */
export interface ReceivedSharesGetAllDetachedReceivedShares200Response extends HttpResponse {
  status: "200";
  body: ReceivedShareListOutput;
}

export interface ReceivedSharesGetAllDetachedReceivedSharesDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** List detached received shares */
export interface ReceivedSharesGetAllDetachedReceivedSharesDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & ReceivedSharesGetAllDetachedReceivedSharesDefaultHeaders;
}

/** Activates the email registration for current tenant */
export interface ReceivedSharesActivateTenantEmailRegistration200Response extends HttpResponse {
  status: "200";
  body: TenantEmailRegistrationOutput;
}

export interface ReceivedSharesActivateTenantEmailRegistrationDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Activates the email registration for current tenant */
export interface ReceivedSharesActivateTenantEmailRegistrationDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & ReceivedSharesActivateTenantEmailRegistrationDefaultHeaders;
}

/** Register an email for the current tenant */
export interface ReceivedSharesRegisterTenantEmailRegistration200Response extends HttpResponse {
  status: "200";
  body: TenantEmailRegistrationOutput;
}

export interface ReceivedSharesRegisterTenantEmailRegistrationDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Register an email for the current tenant */
export interface ReceivedSharesRegisterTenantEmailRegistrationDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & ReceivedSharesRegisterTenantEmailRegistrationDefaultHeaders;
}

/** List sent shares */
export interface SentSharesGetAllSentShares200Response extends HttpResponse {
  status: "200";
  body: SentShareListOutput;
}

export interface SentSharesGetAllSentSharesDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** List sent shares */
export interface SentSharesGetAllSentSharesDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & SentSharesGetAllSentSharesDefaultHeaders;
}

/** Get a sent share */
export interface SentSharesGetSentShare200Response extends HttpResponse {
  status: "200";
  body: SentShareOutput;
}

export interface SentSharesGetSentShareDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Get a sent share */
export interface SentSharesGetSentShareDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & SentSharesGetSentShareDefaultHeaders;
}

export interface SentSharesCreateOrReplace200Headers {
  /** The URL to track the status of the long running operation. */
  "operation-location"?: string;
}

/** Create or replace a sent share */
export interface SentSharesCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: SentShareOutput;
  headers: RawHttpHeaders & SentSharesCreateOrReplace200Headers;
}

export interface SentSharesCreateOrReplace201Headers {
  /** The URL to track the status of the long running operation. */
  "operation-location"?: string;
}

/** Create or replace a sent share */
export interface SentSharesCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: SentShareOutput;
  headers: RawHttpHeaders & SentSharesCreateOrReplace201Headers;
}

export interface SentSharesCreateOrReplaceDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Create or replace a sent share */
export interface SentSharesCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & SentSharesCreateOrReplaceDefaultHeaders;
}

export interface SentSharesDeleteSentShare202Headers {
  /** The URL to track the status of the long running operation. */
  "operation-location"?: string;
}

/** Delete a sent share */
export interface SentSharesDeleteSentShare202Response extends HttpResponse {
  status: "202";
  body: OperationResponseOutput;
  headers: RawHttpHeaders & SentSharesDeleteSentShare202Headers;
}

export interface SentSharesDeleteSentShareDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Delete a sent share */
export interface SentSharesDeleteSentShareDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & SentSharesDeleteSentShareDefaultHeaders;
}

/** List sent share recipients */
export interface SentSharesGetAllSentShareInvitations200Response extends HttpResponse {
  status: "200";
  body: SentShareInvitationListOutput;
}

export interface SentSharesGetAllSentShareInvitationsDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** List sent share recipients */
export interface SentSharesGetAllSentShareInvitationsDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & SentSharesGetAllSentShareInvitationsDefaultHeaders;
}

/** Get recipient for a given sent share */
export interface SentSharesGetSentShareInvitation200Response extends HttpResponse {
  status: "200";
  body: SentShareInvitationOutput;
}

export interface SentSharesGetSentShareInvitationDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Get recipient for a given sent share */
export interface SentSharesGetSentShareInvitationDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & SentSharesGetSentShareInvitationDefaultHeaders;
}

/** Create a recipient for a given sent share */
export interface SentSharesCreateSentShareInvitation201Response extends HttpResponse {
  status: "201";
  body: SentShareInvitationOutput;
}

export interface SentSharesCreateSentShareInvitationDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Create a recipient for a given sent share */
export interface SentSharesCreateSentShareInvitationDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & SentSharesCreateSentShareInvitationDefaultHeaders;
}

export interface SentSharesDeleteSentShareInvitation202Headers {
  /** The URL to track the status of the long running operation. */
  "operation-location"?: string;
}

/** Delete a sent share invitation */
export interface SentSharesDeleteSentShareInvitation202Response extends HttpResponse {
  status: "202";
  body: OperationResponseOutput;
  headers: RawHttpHeaders & SentSharesDeleteSentShareInvitation202Headers;
}

export interface SentSharesDeleteSentShareInvitationDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Delete a sent share invitation */
export interface SentSharesDeleteSentShareInvitationDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & SentSharesDeleteSentShareInvitationDefaultHeaders;
}

/** Notifies the user recipient of the sent share invitation, does not apply to service invitations. */
export interface SentSharesNotifyUserSentShareInvitation200Response extends HttpResponse {
  status: "200";
  body: SentShareInvitationOutput;
}

export interface SentSharesNotifyUserSentShareInvitationDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Notifies the user recipient of the sent share invitation, does not apply to service invitations. */
export interface SentSharesNotifyUserSentShareInvitationDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & SentSharesNotifyUserSentShareInvitationDefaultHeaders;
}

/** List share resources */
export interface ShareResourcesGetAllShareResources200Response extends HttpResponse {
  status: "200";
  body: ShareResourceListOutput;
}

export interface ShareResourcesGetAllShareResourcesDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** List share resources */
export interface ShareResourcesGetAllShareResourcesDefaultResponse extends HttpResponse {
  status: string;
  body: PurviewShareErrorOutput;
  headers: RawHttpHeaders & ShareResourcesGetAllShareResourcesDefaultHeaders;
}
