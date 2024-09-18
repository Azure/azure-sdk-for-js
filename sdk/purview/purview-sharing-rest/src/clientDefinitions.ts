// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ReceivedSharesGetReceivedShareParameters,
  ReceivedSharesCreateOrReplaceParameters,
  ReceivedSharesDeleteReceivedShareParameters,
  ReceivedSharesGetAllAttachedReceivedSharesParameters,
  ReceivedSharesGetAllDetachedReceivedSharesParameters,
  ReceivedSharesActivateTenantEmailRegistrationParameters,
  ReceivedSharesRegisterTenantEmailRegistrationParameters,
  SentSharesGetAllSentSharesParameters,
  SentSharesGetSentShareParameters,
  SentSharesCreateOrReplaceParameters,
  SentSharesDeleteSentShareParameters,
  SentSharesGetAllSentShareInvitationsParameters,
  SentSharesGetSentShareInvitationParameters,
  SentSharesCreateSentShareInvitationParameters,
  SentSharesDeleteSentShareInvitationParameters,
  SentSharesNotifyUserSentShareInvitationParameters,
  ShareResourcesGetAllShareResourcesParameters,
} from "./parameters";
import {
  ReceivedSharesGetReceivedShare200Response,
  ReceivedSharesGetReceivedShareDefaultResponse,
  ReceivedSharesCreateOrReplace200Response,
  ReceivedSharesCreateOrReplace201Response,
  ReceivedSharesCreateOrReplaceDefaultResponse,
  ReceivedSharesDeleteReceivedShare202Response,
  ReceivedSharesDeleteReceivedShareDefaultResponse,
  ReceivedSharesGetAllAttachedReceivedShares200Response,
  ReceivedSharesGetAllAttachedReceivedSharesDefaultResponse,
  ReceivedSharesGetAllDetachedReceivedShares200Response,
  ReceivedSharesGetAllDetachedReceivedSharesDefaultResponse,
  ReceivedSharesActivateTenantEmailRegistration200Response,
  ReceivedSharesActivateTenantEmailRegistrationDefaultResponse,
  ReceivedSharesRegisterTenantEmailRegistration200Response,
  ReceivedSharesRegisterTenantEmailRegistrationDefaultResponse,
  SentSharesGetAllSentShares200Response,
  SentSharesGetAllSentSharesDefaultResponse,
  SentSharesGetSentShare200Response,
  SentSharesGetSentShareDefaultResponse,
  SentSharesCreateOrReplace200Response,
  SentSharesCreateOrReplace201Response,
  SentSharesCreateOrReplaceDefaultResponse,
  SentSharesDeleteSentShare202Response,
  SentSharesDeleteSentShareDefaultResponse,
  SentSharesGetAllSentShareInvitations200Response,
  SentSharesGetAllSentShareInvitationsDefaultResponse,
  SentSharesGetSentShareInvitation200Response,
  SentSharesGetSentShareInvitationDefaultResponse,
  SentSharesCreateSentShareInvitation201Response,
  SentSharesCreateSentShareInvitationDefaultResponse,
  SentSharesDeleteSentShareInvitation202Response,
  SentSharesDeleteSentShareInvitationDefaultResponse,
  SentSharesNotifyUserSentShareInvitation200Response,
  SentSharesNotifyUserSentShareInvitationDefaultResponse,
  ShareResourcesGetAllShareResources200Response,
  ShareResourcesGetAllShareResourcesDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ReceivedSharesGetReceivedShare {
  /** Get a received share */
  get(
    options?: ReceivedSharesGetReceivedShareParameters,
  ): StreamableMethod<
    ReceivedSharesGetReceivedShare200Response | ReceivedSharesGetReceivedShareDefaultResponse
  >;
  /** Update changes to a received share */
  put(
    options: ReceivedSharesCreateOrReplaceParameters,
  ): StreamableMethod<
    | ReceivedSharesCreateOrReplace200Response
    | ReceivedSharesCreateOrReplace201Response
    | ReceivedSharesCreateOrReplaceDefaultResponse
  >;
  /** Delete a received share */
  delete(
    options?: ReceivedSharesDeleteReceivedShareParameters,
  ): StreamableMethod<
    ReceivedSharesDeleteReceivedShare202Response | ReceivedSharesDeleteReceivedShareDefaultResponse
  >;
}

export interface ReceivedSharesGetAllAttachedReceivedShares {
  /** List attached received shares */
  get(
    options: ReceivedSharesGetAllAttachedReceivedSharesParameters,
  ): StreamableMethod<
    | ReceivedSharesGetAllAttachedReceivedShares200Response
    | ReceivedSharesGetAllAttachedReceivedSharesDefaultResponse
  >;
}

export interface ReceivedSharesGetAllDetachedReceivedShares {
  /** List detached received shares */
  get(
    options?: ReceivedSharesGetAllDetachedReceivedSharesParameters,
  ): StreamableMethod<
    | ReceivedSharesGetAllDetachedReceivedShares200Response
    | ReceivedSharesGetAllDetachedReceivedSharesDefaultResponse
  >;
}

export interface ReceivedSharesActivateTenantEmailRegistration {
  /** Activates the email registration for current tenant */
  post(
    options: ReceivedSharesActivateTenantEmailRegistrationParameters,
  ): StreamableMethod<
    | ReceivedSharesActivateTenantEmailRegistration200Response
    | ReceivedSharesActivateTenantEmailRegistrationDefaultResponse
  >;
}

export interface ReceivedSharesRegisterTenantEmailRegistration {
  /** Register an email for the current tenant */
  post(
    options?: ReceivedSharesRegisterTenantEmailRegistrationParameters,
  ): StreamableMethod<
    | ReceivedSharesRegisterTenantEmailRegistration200Response
    | ReceivedSharesRegisterTenantEmailRegistrationDefaultResponse
  >;
}

export interface SentSharesGetAllSentShares {
  /** List sent shares */
  get(
    options: SentSharesGetAllSentSharesParameters,
  ): StreamableMethod<
    SentSharesGetAllSentShares200Response | SentSharesGetAllSentSharesDefaultResponse
  >;
}

export interface SentSharesGetSentShare {
  /** Get a sent share */
  get(
    options?: SentSharesGetSentShareParameters,
  ): StreamableMethod<SentSharesGetSentShare200Response | SentSharesGetSentShareDefaultResponse>;
  /** Create or replace a sent share */
  put(
    options: SentSharesCreateOrReplaceParameters,
  ): StreamableMethod<
    | SentSharesCreateOrReplace200Response
    | SentSharesCreateOrReplace201Response
    | SentSharesCreateOrReplaceDefaultResponse
  >;
  /** Delete a sent share */
  delete(
    options?: SentSharesDeleteSentShareParameters,
  ): StreamableMethod<
    SentSharesDeleteSentShare202Response | SentSharesDeleteSentShareDefaultResponse
  >;
}

export interface SentSharesGetAllSentShareInvitations {
  /** List sent share recipients */
  get(
    options?: SentSharesGetAllSentShareInvitationsParameters,
  ): StreamableMethod<
    | SentSharesGetAllSentShareInvitations200Response
    | SentSharesGetAllSentShareInvitationsDefaultResponse
  >;
}

export interface SentSharesGetSentShareInvitation {
  /** Get recipient for a given sent share */
  get(
    options?: SentSharesGetSentShareInvitationParameters,
  ): StreamableMethod<
    SentSharesGetSentShareInvitation200Response | SentSharesGetSentShareInvitationDefaultResponse
  >;
  /** Create a recipient for a given sent share */
  put(
    options: SentSharesCreateSentShareInvitationParameters,
  ): StreamableMethod<
    | SentSharesCreateSentShareInvitation201Response
    | SentSharesCreateSentShareInvitationDefaultResponse
  >;
  /** Delete a sent share invitation */
  delete(
    options?: SentSharesDeleteSentShareInvitationParameters,
  ): StreamableMethod<
    | SentSharesDeleteSentShareInvitation202Response
    | SentSharesDeleteSentShareInvitationDefaultResponse
  >;
}

export interface SentSharesNotifyUserSentShareInvitation {
  /** Notifies the user recipient of the sent share invitation, does not apply to service invitations. */
  post(
    options?: SentSharesNotifyUserSentShareInvitationParameters,
  ): StreamableMethod<
    | SentSharesNotifyUserSentShareInvitation200Response
    | SentSharesNotifyUserSentShareInvitationDefaultResponse
  >;
}

export interface ShareResourcesGetAllShareResources {
  /** List share resources */
  get(
    options?: ShareResourcesGetAllShareResourcesParameters,
  ): StreamableMethod<
    | ShareResourcesGetAllShareResources200Response
    | ShareResourcesGetAllShareResourcesDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/receivedShares/\{receivedShareId\}' has methods for the following verbs: get, put, delete */
  (
    path: "/receivedShares/{receivedShareId}",
    receivedShareId: string,
  ): ReceivedSharesGetReceivedShare;
  /** Resource for '/receivedShares/attached' has methods for the following verbs: get */
  (path: "/receivedShares/attached"): ReceivedSharesGetAllAttachedReceivedShares;
  /** Resource for '/receivedShares/detached' has methods for the following verbs: get */
  (path: "/receivedShares/detached"): ReceivedSharesGetAllDetachedReceivedShares;
  /** Resource for '/emails:activate' has methods for the following verbs: post */
  (path: "/emails:activate"): ReceivedSharesActivateTenantEmailRegistration;
  /** Resource for '/emails:register' has methods for the following verbs: post */
  (path: "/emails:register"): ReceivedSharesRegisterTenantEmailRegistration;
  /** Resource for '/sentShares' has methods for the following verbs: get */
  (path: "/sentShares"): SentSharesGetAllSentShares;
  /** Resource for '/sentShares/\{sentShareId\}' has methods for the following verbs: get, put, delete */
  (path: "/sentShares/{sentShareId}", sentShareId: string): SentSharesGetSentShare;
  /** Resource for '/sentShares/\{sentShareId\}/sentShareInvitations' has methods for the following verbs: get */
  (
    path: "/sentShares/{sentShareId}/sentShareInvitations",
    sentShareId: string,
  ): SentSharesGetAllSentShareInvitations;
  /** Resource for '/sentShares/\{sentShareId\}/sentShareInvitations/\{sentShareInvitationId\}' has methods for the following verbs: get, put, delete */
  (
    path: "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}",
    sentShareId: string,
    sentShareInvitationId: string,
  ): SentSharesGetSentShareInvitation;
  /** Resource for '/sentShares/\{sentShareId\}/sentShareInvitations/\{sentShareInvitationId\}:notify' has methods for the following verbs: post */
  (
    path: "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}:notify",
    sentShareId: string,
    sentShareInvitationId: string,
  ): SentSharesNotifyUserSentShareInvitation;
  /** Resource for '/shareResources' has methods for the following verbs: get */
  (path: "/shareResources"): ShareResourcesGetAllShareResources;
}

export type PurviewSharingClient = Client & {
  path: Routes;
};
