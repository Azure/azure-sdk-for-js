// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext as Client } from "../index.js";
import {
  RunStep,
  runStepDeserializer,
  _AgentsPagedResultRunStep,
  _agentsPagedResultRunStepDeserializer,
} from "../../models/models.js";
import { RunStepsListRunStepsOptionalParams, RunStepsGetRunStepOptionalParams } from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listRunStepsSend(
  context: Client,
  threadId: string,
  runId: string,
  options: RunStepsListRunStepsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}/steps{?include%5B%5D,api%2Dversion,limit,order,after,before}",
    {
      threadId: threadId,
      runId: runId,
      "include%5B%5D": !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
      "api%2Dversion": context.apiVersion,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listRunStepsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultRunStep> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _agentsPagedResultRunStepDeserializer(result.body);
}

/** Gets a list of run steps from a thread run. */
export function listRunSteps(
  context: Client,
  threadId: string,
  runId: string,
  options: RunStepsListRunStepsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RunStep> {
  return buildPagedAsyncIterator(
    context,
    () => _listRunStepsSend(context, threadId, runId, options),
    _listRunStepsDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _getRunStepSend(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: RunStepsGetRunStepOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}/steps/{stepId}{?api%2Dversion,include%5B%5D}",
    {
      threadId: threadId,
      runId: runId,
      stepId: stepId,
      "api%2Dversion": context.apiVersion,
      "include%5B%5D": !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getRunStepDeserialize(result: PathUncheckedResponse): Promise<RunStep> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return runStepDeserializer(result.body);
}

/** Retrieves a single run step from a thread run. */
export async function getRunStep(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: RunStepsGetRunStepOptionalParams = { requestOptions: {} },
): Promise<RunStep> {
  const result = await _getRunStepSend(context, threadId, runId, stepId, options);
  return _getRunStepDeserialize(result);
}
