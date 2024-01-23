// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import {
  StreamableMethod,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { camelCaseKeys } from "../util.js";
import { parseToolCallOutput } from "../../models/helpers.js";
import { ListResponseOf, RunStep, RunStepDetails, ToolCall } from "../../models/models.js";
import {
  RunStepsListRunStepsOptions,
  RunStepsRetrieveRunStepOptions,
} from "../../models/options.js";
import {
  AssistantsContext as Client,
  ListRunSteps200Response,
  RetrieveRunStep200Response,
  RunStepDetailsOutput,
  RunStepOutput,
} from "../../rest/index.js";

export function _retrieveRunStepSend(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: RunStepsRetrieveRunStepOptions = { requestOptions: {} }
): StreamableMethod<RetrieveRunStep200Response> {
  return context
    .path("/threads/{threadId}/runs/{runId}/steps/{stepId}", threadId, runId, stepId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveRunStepDeserialize(
  result: RetrieveRunStep200Response
): Promise<RunStep> {
  if (result.status !== "200") {
    throw createRestError(result);
  }
  const { step_details, last_error, created_at, expired_at, completed_at, cancelled_at, failed_at, ...rest } = result.body;

  return {
    ...camelCaseKeys(rest),
    stepDetails: parseRunStepDetails(step_details),
    lastError:
      last_error === null
        ? null
        : {
            code: last_error["code"],
            message: last_error["message"],
          },
    createdAt: new Date(created_at),
    expiredAt: expired_at === null ? null : new Date(expired_at),
    completedAt: completed_at === null ? null : new Date(completed_at),
    cancelledAt: cancelled_at === null ? null : new Date(cancelled_at),
    failedAt: failed_at === null ? null : new Date(failed_at),
  };
}

function parseRunStepDetails(runStepDetailsOutput: RunStepDetailsOutput): RunStepDetails {
  const { type } = runStepDetailsOutput;
  const details = { type, messageCreation: {}, toolCalls: [] as ToolCall[] };
  switch (type) {
    case "message_creation":
      details.messageCreation = runStepDetailsOutput["message_creation"];
      break;
    case "tool_calls":
      details.toolCalls = runStepDetailsOutput["tool_calls"].map(parseToolCallOutput);
      break;
  }

  return details as RunStepDetails;
}

/** Gets a single run step from a thread run. */
export async function retrieveRunStep(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: RunStepsRetrieveRunStepOptions = { requestOptions: {} }
): Promise<RunStep> {
  const result = await _retrieveRunStepSend(context, threadId, runId, stepId, options);
  return _retrieveRunStepDeserialize(result);
}

export function _listRunStepsSend(
  context: Client,
  threadId: string,
  runId: string,
  options: RunStepsListRunStepsOptions = { requestOptions: {} }
): StreamableMethod<ListRunSteps200Response> {
  return context.path("/threads/{threadId}/runs/{runId}/steps", threadId, runId).get({
    ...operationOptionsToRequestParameters(options),
    queryParameters: {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
  });
}

export async function _listRunStepsDeserialize(
  result: ListRunSteps200Response
): Promise<ListResponseOf<RunStep>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map(parseRunStepOutput),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

function parseRunStepOutput(runStepOutput: RunStepOutput): RunStep {
  const { step_details, last_error, created_at, expired_at, completed_at, cancelled_at, failed_at, ...rest } = runStepOutput;

  return {
    ...camelCaseKeys(rest),
    stepDetails: parseRunStepDetails(step_details),
    lastError:
      last_error === null
        ? null
        : { code: last_error["code"], message: last_error["message"] },
    createdAt: new Date(created_at),
    expiredAt: expired_at === null ? null : new Date(expired_at),
    completedAt: completed_at === null ? null : new Date(completed_at),
    cancelledAt: cancelled_at === null ? null : new Date(cancelled_at),
    failedAt: failed_at === null ? null : new Date(failed_at),
  } as RunStep;
}

/** Returns a list of run steps associated an assistant thread run. */
export async function listRunSteps(
  context: Client,
  threadId: string,
  runId: string,
  options: RunStepsListRunStepsOptions = { requestOptions: {} }
): Promise<ListResponseOf<RunStep>> {
  const result = await _listRunStepsSend(context, threadId, runId, options);
  return _listRunStepsDeserialize(result);
}
