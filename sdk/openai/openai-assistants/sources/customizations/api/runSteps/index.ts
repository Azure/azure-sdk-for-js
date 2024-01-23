// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { camelCaseKeys } from "../util.js";
import { ListResponseOf } from "../../models/models.js";
import { ListRunSteps200Response } from "../../rest/responses.js";
import { RunStep, RunStepDetails, ToolCall } from "../../../generated/src/models/models.js";
import { _listRunStepsSend } from "../../../generated/src/api/runSteps/index.js";
import {
  AssistantsContext as Client,
  RetrieveRunStep200Response,
  RunStepDetailsOutput,
  RunStepOutput,
} from "../../../generated/src/rest/index.js";
import { parseToolCallOutput } from "../../models/helpers.js";
import { RunStepsListRunStepsOptions } from "../../../generated/src/models/options.js";
import { createRestError } from "@azure-rest/core-client";

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
