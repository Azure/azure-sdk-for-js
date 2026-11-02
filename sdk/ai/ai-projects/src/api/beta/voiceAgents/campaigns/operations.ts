// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../../index.js";
import {
  apiErrorResponseDeserializer,
  telephonyCampaignSerializer,
  telephonyCampaignDeserializer,
  telephonyCampaignOperationDeserializer,
  _telephonyCampaignPageTelephonyCampaignDeserializer,
  _telephonyCampaignValidationErrorPageDeserializer,
} from "../../../../models/models.js";
import type {
  CreateTelephonyCampaignRequest,
  TelephonyCampaign,
  TelephonyCampaignOperation,
  _TelephonyCampaignPageTelephonyCampaign,
  _TelephonyCampaignValidationErrorPage,
  TelephonyCampaignValidationError,
} from "../../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../../static-helpers/urlTemplate.js";
import type {
  BetaVoiceAgentsCampaignsGetOperationOptionalParams,
  BetaVoiceAgentsCampaignsListValidationErrorsOptionalParams,
  BetaVoiceAgentsCampaignsDeleteOptionalParams,
  BetaVoiceAgentsCampaignsCancelOptionalParams,
  BetaVoiceAgentsCampaignsListOptionalParams,
  BetaVoiceAgentsCampaignsGetOptionalParams,
  BetaVoiceAgentsCampaignsCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getOperationSend(
  context: Client,
  agentName: string,
  campaignName: string,
  operationId: string,
  options: BetaVoiceAgentsCampaignsGetOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_name}/operations/{operation_id}{?api-version}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      operation_id: operationId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCampaignOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCampaignOperationDeserializer(result.body);
}

/** Polls one fixed validation/cancel/delete operation despite changes to Campaign.operation_id, replacement or deletion. Retained throughout Campaign lifetime and at least 24 hours after both completion and deletion. Pending responses include Retry-After; PUT/cancel use guarded final Campaign GETs, delete has none. Pollers never switch operations. */
export async function getOperation(
  context: Client,
  agentName: string,
  campaignName: string,
  operationId: string,
  options: BetaVoiceAgentsCampaignsGetOperationOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaignOperation> {
  const result = await _getOperationSend(context, agentName, campaignName, operationId, options);
  return _getOperationDeserialize(result);
}

export function _listValidationErrorsSend(
  context: Client,
  agentName: string,
  campaignName: string,
  options: BetaVoiceAgentsCampaignsListValidationErrorsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_name}/validation_errors{?after,api-version,before,limit,order}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      limit: options?.limit,
      after: options?.after,
      before: options?.before,
      order: options?.order,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listValidationErrorsDeserialize(
  result: PathUncheckedResponse,
): Promise<_TelephonyCampaignValidationErrorPage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _telephonyCampaignValidationErrorPageDeserializer(result.body);
}

/**
 * Lists detailed invalid-row diagnostics for the current round/pinned Agent; the monitor carries only a bounded summary.
 * During validating, results are partial and an empty page does not mean success. Input-position identities and cursors survive
 * worker retries/cancellation. Replacement resets the collection and invalidates cursors; diagnostics otherwise persist until deletion.
 * Successful validation yields no errors; execution failures appear in CallJobs, non-row preparation failures in Campaign.error.
 * Cursors bind instance, round and row_number boundary. Replaced rounds, reused names or invalid cursors return 400 invalid_cursor;
 * deleting returns 409 campaign_deleting, deleted Campaigns return 404.
 */
export function listValidationErrors(
  context: Client,
  agentName: string,
  campaignName: string,
  options: BetaVoiceAgentsCampaignsListValidationErrorsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TelephonyCampaignValidationError> {
  return buildPagedAsyncIterator(
    context,
    () => _listValidationErrorsSend(context, agentName, campaignName, options),
    _listValidationErrorsDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion ?? "v1",
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
      nextPageRequestOptions: {
        ...operationOptionsToRequestParameters(options),
        headers: { accept: "application/json", ...options.requestOptions?.headers },
      },
    },
  );
}

export function _deleteCampaignSend(
  context: Client,
  agentName: string,
  campaignName: string,
  ifMatch: string,
  options: BetaVoiceAgentsCampaignsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_name}{?api-version}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "if-match": ifMatch,
      ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteCampaignDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/**
 * Asynchronously deletes a terminal Campaign after preparation/admitted calls stop; other active states return 409.
 * Cancellation must finish first. Cleanup removes recipient snapshots, validation diagnostics/accounting, owned CallJobs/attempts
 * from all rounds and pending dispatch work. Acceptance sets deleting and Campaign.operation_id to the deletion monitor,
 * hides owned jobs/results, and blocks name reuse until success. Dataset, connections, Agent configuration and independent CallJobs
 * remain; call records, conversations and recordings retain their own policies.
 *
 * Cleanup targets the accepted Campaign instance, never a later namesake. Failure leaves deleting/error; resume with fresh
 * Operation-Id and current If-Match to create a new monitor, update Campaign.operation_id and preserve the validation round.
 * Identical retained Operation-Id retries replay the original 202 before stale-token checks, including after deletion/name reuse.
 * Conflicting IDs return 409. Without replay, absent names return 204 and stale tokens return 412. Current-token DELETE during
 * cleanup reuses its monitor; a fresh ID aliases the same operation. Success frees the name but retains replay/duplicate-dialing safeguards.
 */
export function deleteCampaign(
  context: Client,
  agentName: string,
  campaignName: string,
  ifMatch: string,
  options: BetaVoiceAgentsCampaignsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteCampaignDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteCampaignSend(context, agentName, campaignName, ifMatch, options),
    apiVersion: context.apiVersion ?? "v1",
    pollHeaders: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "if-match": ifMatch,
      ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
      ...options.requestOptions?.headers,
    },
  }) as PollerLike<OperationState<void>, void>;
}

export function _cancelSend(
  context: Client,
  agentName: string,
  campaignName: string,
  ifMatch: string,
  options: BetaVoiceAgentsCampaignsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_name}:cancel{?api-version}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "if-match": ifMatch,
      ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _cancelDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCampaign> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCampaignDeserializer(result.body);
}

/**
 * Starts cancellation for validating/running Campaigns with exact If-Match. Always returns 202 with the monitor,
 * Operation-Id, Operation-Location and Retry-After, even if already complete. Acceptance blocks new dispatch/retries,
 * sets cancelling and the latest operation_id, and preserves the validation round/Agent pin. Connected calls finish naturally;
 * the Campaign becomes cancelled and this monitor succeeds only after preparation/admitted calls stop.
 * If cancellation wins preparation, its validation monitor becomes cancelled after workers stop; an already succeeded monitor stays succeeded.
 *
 * Omitted Operation-Id is generated. After authorization, a retained ID and original If-Match replay 202 before current-state/token checks,
 * even after deletion/name reuse, without touching a replacement; conflicting reuse returns 409. Without replay, missing Campaign
 * returns 404 and stale If-Match returns 412. Current-token repeats in cancelling/cancelled reuse the monitor; a fresh ID aliases it.
 *
 * Failure leaves cancelling/error with dispatch disabled, changes etag and fails only this monitor. Resume with fresh Operation-Id
 * and current If-Match to create a new monitor while preserving previous failures. New cancellation of completed/failed/deleting
 * returns 409. The SDK polls the accepted monitor, then performs a guarded Campaign GET.
 */
export function cancel(
  context: Client,
  agentName: string,
  campaignName: string,
  ifMatch: string,
  options: BetaVoiceAgentsCampaignsCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign> {
  return getLongRunningPoller(context, _cancelDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _cancelSend(context, agentName, campaignName, ifMatch, options),
    apiVersion: context.apiVersion ?? "v1",
    pollHeaders: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "if-match": ifMatch,
      ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  }) as PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
}

export function _listSend(
  context: Client,
  agentName: string,
  options: BetaVoiceAgentsCampaignsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns{?after,api-version,before,limit,order,status}",
    {
      agent_name: agentName,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      status: options?.status,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_TelephonyCampaignPageTelephonyCampaign> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _telephonyCampaignPageTelephonyCampaignDeserializer(result.body);
}

/** Lists Agent-owned Campaigns without inline arrays. Opaque continuation tokens retain the original created_at/internal-instance boundary across deletion and name reuse. Filters are live views, not a snapshot. */
export function list(
  context: Client,
  agentName: string,
  options: BetaVoiceAgentsCampaignsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TelephonyCampaign> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, agentName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion ?? "v1",
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
      nextPageRequestOptions: {
        ...operationOptionsToRequestParameters(options),
        headers: { accept: "application/json", ...options.requestOptions?.headers },
      },
    },
  );
}

export function _getSend(
  context: Client,
  agentName: string,
  campaignName: string,
  options: BetaVoiceAgentsCampaignsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_name}{?api-version,operation_id}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      operation_id: options?.operationId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TelephonyCampaign> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCampaignDeserializer(result.body);
}

/** Gets the current Campaign with source provenance but no inline recipients, after authorization. Optional operation_id checks the saved instance/round, not the latest operation pointer: same-round cancellation is allowed; replacement/name reuse returns 409 campaign_operation_mismatch. Missing/expired/wrong-scope operations or absent Campaigns return 404. */
export async function get(
  context: Client,
  agentName: string,
  campaignName: string,
  options: BetaVoiceAgentsCampaignsGetOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _getSend(context, agentName, campaignName, options);
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  agentName: string,
  campaignName: string,
  campaign: CreateTelephonyCampaignRequest,
  options: BetaVoiceAgentsCampaignsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_name}{?api-version}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: telephonyCampaignSerializer(campaign),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCampaign> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCampaignDeserializer(result.body);
}

/**
 * Creates a named Campaign (201) or fully replaces a failed Campaign's inputs (200), authorizing calls after validation.
 * Shape/authorization checks precede acceptance. Replacement requires exact If-Match and fresh Operation-Id:
 * missing replacement ID returns 400, stale If-Match returns 412, and nonfailed state returns 409.
 * If-Match on an absent Campaign returns 412; it never recreates a deleted resource.
 * Supply exactly one recipient source; omitted optional fields reset to defaults on replacement.
 *
 * Acceptance returns validating and its separate monitor in operation_id. Replacement starts a new round,
 * resetting errors, finished_at, progress, Dataset resolution and locked_agent_version. Superseded diagnostics/CallJobs
 * disappear from lists, counts and dispatch; old validation-error cursors become invalid. Previous monitors/replay safeguards remain.
 *
 * Preparation pins the owning Agent's latest authorized version and any omitted Dataset version once per round before row validation.
 * Pins survive retries and later Agent updates; resolution failure fails preparation. Dispatch opens only after the full snapshot
 * validates and each input position has a CallJob. Failed rounds never dial and report failed only after preparation stops;
 * immediate calls may begin before the PUT poller returns.
 *
 * Identical Operation-Id, original inputs and original If-Match replay the saved receipt/monitor before current-state/token checks,
 * without restarting the round or changing pins. Conflicting reuse returns 409 operation_id_conflict; superseded keys replay old monitors.
 * Without replay, If-Match requires failed state and a fresh Operation-Id even for unchanged inputs. Without If-Match, equivalent
 * input returns the current resource/saved validation monitor; different input conflicts. Headers keep that monitor after later
 * cancel/delete, without resetting Campaign.operation_id. Replay compares submitted inputs, including Dataset version omission,
 * not resolved versions/defaults. After deletion, retained keys return 409 campaign_deleted; new intent needs a fresh key.
 */
export function create(
  context: Client,
  agentName: string,
  campaignName: string,
  campaign: CreateTelephonyCampaignRequest,
  options: BetaVoiceAgentsCampaignsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign> {
  return getLongRunningPoller(context, _createDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, agentName, campaignName, campaign, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "v1",
    pollHeaders: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  }) as PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
}
