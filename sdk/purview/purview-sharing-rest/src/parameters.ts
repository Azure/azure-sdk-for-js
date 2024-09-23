// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import { ReceivedShare, TenantEmailRegistration, SentShare, SentShareInvitation } from "./models";

export type ReceivedSharesGetReceivedShareParameters = RequestParameters;

export interface ReceivedSharesCreateOrReplaceBodyParam {
  /** The received share to create or replace */
  body: ReceivedShare;
}

export interface ReceivedSharesCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ReceivedSharesCreateOrReplaceParameters = ReceivedSharesCreateOrReplaceMediaTypesParam &
  ReceivedSharesCreateOrReplaceBodyParam &
  RequestParameters;
export type ReceivedSharesDeleteReceivedShareParameters = RequestParameters;

export interface ReceivedSharesGetAllAttachedReceivedSharesQueryParamProperties {
  /** A name that references a data store. */
  referenceName: string;
  /** Filters the results using OData syntax */
  filter?: string;
  /** Sorts the results using OData syntax */
  orderby?: string;
}

export interface ReceivedSharesGetAllAttachedReceivedSharesQueryParam {
  queryParameters: ReceivedSharesGetAllAttachedReceivedSharesQueryParamProperties;
}

export type ReceivedSharesGetAllAttachedReceivedSharesParameters =
  ReceivedSharesGetAllAttachedReceivedSharesQueryParam & RequestParameters;

export interface ReceivedSharesGetAllDetachedReceivedSharesQueryParamProperties {
  /** Filters the results using OData syntax */
  filter?: string;
  /** Sorts the results using OData syntax */
  orderby?: string;
}

export interface ReceivedSharesGetAllDetachedReceivedSharesQueryParam {
  queryParameters?: ReceivedSharesGetAllDetachedReceivedSharesQueryParamProperties;
}

export type ReceivedSharesGetAllDetachedReceivedSharesParameters =
  ReceivedSharesGetAllDetachedReceivedSharesQueryParam & RequestParameters;

export interface ReceivedSharesActivateTenantEmailRegistrationHeaders {
  /** If specified, the client directs that the request is repeatable; that is, that the client can make the request multiple times with the same Repeatability-Request-Id and get back an appropriate response without the server executing the request multiple times. The value of the Repeatability-Request-Id is an opaque string representing a client-generated, globally unique for all time, identifier for the request. It is recommended to use version 4 (random) UUIDs. */
  "repeatability-request-id"?: string;
}

export interface ReceivedSharesActivateTenantEmailRegistrationBodyParam {
  /** The tenant email registration payload */
  body: TenantEmailRegistration;
}

export interface ReceivedSharesActivateTenantEmailRegistrationHeaderParam {
  headers?: RawHttpHeadersInput & ReceivedSharesActivateTenantEmailRegistrationHeaders;
}

export interface ReceivedSharesActivateTenantEmailRegistrationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ReceivedSharesActivateTenantEmailRegistrationParameters =
  ReceivedSharesActivateTenantEmailRegistrationHeaderParam &
    ReceivedSharesActivateTenantEmailRegistrationMediaTypesParam &
    ReceivedSharesActivateTenantEmailRegistrationBodyParam &
    RequestParameters;

export interface ReceivedSharesRegisterTenantEmailRegistrationHeaders {
  /** If specified, the client directs that the request is repeatable; that is, that the client can make the request multiple times with the same Repeatability-Request-Id and get back an appropriate response without the server executing the request multiple times. The value of the Repeatability-Request-Id is an opaque string representing a client-generated, globally unique for all time, identifier for the request. It is recommended to use version 4 (random) UUIDs. */
  "repeatability-request-id"?: string;
}

export interface ReceivedSharesRegisterTenantEmailRegistrationHeaderParam {
  headers?: RawHttpHeadersInput & ReceivedSharesRegisterTenantEmailRegistrationHeaders;
}

export type ReceivedSharesRegisterTenantEmailRegistrationParameters =
  ReceivedSharesRegisterTenantEmailRegistrationHeaderParam & RequestParameters;

export interface SentSharesGetAllSentSharesQueryParamProperties {
  /** A name that references a data store. */
  referenceName: string;
  /** Filters the results using OData syntax */
  filter?: string;
  /** Sorts the results using OData syntax */
  orderby?: string;
}

export interface SentSharesGetAllSentSharesQueryParam {
  queryParameters: SentSharesGetAllSentSharesQueryParamProperties;
}

export type SentSharesGetAllSentSharesParameters = SentSharesGetAllSentSharesQueryParam &
  RequestParameters;
export type SentSharesGetSentShareParameters = RequestParameters;

export interface SentSharesCreateOrReplaceBodyParam {
  /** The sent share to create or replace. */
  body: SentShare;
}

export interface SentSharesCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SentSharesCreateOrReplaceParameters = SentSharesCreateOrReplaceMediaTypesParam &
  SentSharesCreateOrReplaceBodyParam &
  RequestParameters;
export type SentSharesDeleteSentShareParameters = RequestParameters;

export interface SentSharesGetAllSentShareInvitationsQueryParamProperties {
  /** Filters the results using OData syntax */
  filter?: string;
  /** Sorts the results using OData syntax */
  orderby?: string;
}

export interface SentSharesGetAllSentShareInvitationsQueryParam {
  queryParameters?: SentSharesGetAllSentShareInvitationsQueryParamProperties;
}

export type SentSharesGetAllSentShareInvitationsParameters =
  SentSharesGetAllSentShareInvitationsQueryParam & RequestParameters;
export type SentSharesGetSentShareInvitationParameters = RequestParameters;

export interface SentSharesCreateSentShareInvitationBodyParam {
  /** The sent share invitation to create. */
  body: SentShareInvitation;
}

export interface SentSharesCreateSentShareInvitationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SentSharesCreateSentShareInvitationParameters =
  SentSharesCreateSentShareInvitationMediaTypesParam &
    SentSharesCreateSentShareInvitationBodyParam &
    RequestParameters;
export type SentSharesDeleteSentShareInvitationParameters = RequestParameters;

export interface SentSharesNotifyUserSentShareInvitationHeaders {
  /** If specified, the client directs that the request is repeatable; that is, that the client can make the request multiple times with the same Repeatability-Request-Id and get back an appropriate response without the server executing the request multiple times. The value of the Repeatability-Request-Id is an opaque string representing a client-generated, globally unique for all time, identifier for the request. It is recommended to use version 4 (random) UUIDs. */
  "repeatability-request-id"?: string;
}

export interface SentSharesNotifyUserSentShareInvitationHeaderParam {
  headers?: RawHttpHeadersInput & SentSharesNotifyUserSentShareInvitationHeaders;
}

export type SentSharesNotifyUserSentShareInvitationParameters =
  SentSharesNotifyUserSentShareInvitationHeaderParam & RequestParameters;

export interface ShareResourcesGetAllShareResourcesQueryParamProperties {
  /** Filters the results using OData syntax */
  filter?: string;
  /** Sorts the results using OData syntax */
  orderby?: string;
}

export interface ShareResourcesGetAllShareResourcesQueryParam {
  queryParameters?: ShareResourcesGetAllShareResourcesQueryParamProperties;
}

export type ShareResourcesGetAllShareResourcesParameters =
  ShareResourcesGetAllShareResourcesQueryParam & RequestParameters;
